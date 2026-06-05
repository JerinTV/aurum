# Aurum Coastal Table

Production-ready restaurant website with a React frontend and a small Node reservations API.

## Development

Run the API and Vite dev server in separate terminals:

```powershell
npm start
npm run dev
```

Open `http://localhost:5173`.

## Production

```powershell
npm run build
npm start
```

Open `http://localhost:4173`. Set `PORT` to use a different port.

Reservation requests are validated by the API and stored in `data/reservations.json`. For a multi-instance deployment, replace the JSON storage in `server.mjs` with a managed database.
