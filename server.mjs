import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const dist = join(root, "dist");
const dataDir = join(root, "data");
const reservationsFile = join(dataDir, "reservations.json");
const port = Number(process.env.PORT || 4173);
const menus = new Set(["The Journey", "The Coast", "The Garden"]);
const times = new Set(["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"]);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml" };

const send = (res, status, body, type = "application/json; charset=utf-8") => {
  res.writeHead(status, { "Content-Type": type, "X-Content-Type-Options": "nosniff" });
  res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
};

async function parseBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 20_000) throw new Error("Request too large");
  }
  return JSON.parse(body);
}

function validate(input) {
  if (["name", "email", "phone", "date", "guests", "time", "menu"].some((key) => !String(input[key] || "").trim())) return "Please complete all required fields.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) return "Please enter a valid email address.";
  if (!/^[+\d][\d\s()-]{7,20}$/.test(input.phone)) return "Please enter a valid phone number.";
  if (!menus.has(input.menu) || !times.has(input.time)) return "Please choose a valid menu and time.";
  if (Number(input.guests) < 1 || Number(input.guests) > 6) return "Online reservations are available for one to six guests.";
  if (new Date(`${input.date}T23:59:59`) < new Date()) return "Please choose a future date.";
  return "";
}

async function createReservation(req, res) {
  try {
    const input = await parseBody(req);
    const error = validate(input);
    if (error) return send(res, 400, { error });
    const reference = `AU-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    const reservation = { reference, ...input, guests: Number(input.guests), notes: String(input.notes || "").slice(0, 1000), status: "pending", createdAt: new Date().toISOString() };
    await mkdir(dataDir, { recursive: true });
    let reservations = [];
    try { reservations = JSON.parse(await readFile(reservationsFile, "utf8")); } catch {}
    reservations.push(reservation);
    await writeFile(reservationsFile, JSON.stringify(reservations, null, 2));
    send(res, 201, { reference, status: "pending" });
  } catch {
    send(res, 400, { error: "We could not process that request. Please try again." });
  }
}

async function serveFile(req, res) {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  const safePath = normalize(pathname === "/" ? "index.html" : pathname.slice(1)).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(dist, safePath);
  try { return send(res, 200, await readFile(filePath), types[extname(filePath)] || "application/octet-stream"); }
  catch {
    try { return send(res, 200, await readFile(join(dist, "index.html")), types[".html"]); }
    catch { return send(res, 503, "Run npm run build before starting the production server.", "text/plain; charset=utf-8"); }
  }
}

createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/api/health") return send(res, 200, { status: "ok" });
  if (req.method === "POST" && req.url === "/api/reservations") return createReservation(req, res);
  if (req.method === "GET") return serveFile(req, res);
  send(res, 405, { error: "Method not allowed" });
}).listen(port, "0.0.0.0", () => console.log(`Aurum production server: http://localhost:${port}`));
