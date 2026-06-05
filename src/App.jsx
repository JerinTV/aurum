import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, CalendarDays, Check, ChevronDown, ChevronRight,
  Clock3, LoaderCircle, MapPin, Menu as MenuIcon, Pause, Phone, Play, Sparkles, X
} from "lucide-react";

const courses = {
  "The Journey": {
    meta: "7 courses / INR 6,800",
    dishes: [
      { no: "01", name: "First Rain", detail: "Cucumber ribbons / cultured buttermilk / green chilli / herb pearls", story: "A cool, luminous opening inspired by the first monsoon shower: crisp, floral and quietly electric.", note: "Cool / bright / delicate", image: "/images/courses/i1.png" },
      { no: "02", name: "Backwater", detail: "Hand-picked mud crab / young mango / curry leaf / shellfish reduction", story: "Sweet crab and green mango meet a deep, silken broth with the perfume of fresh curry leaf.", note: "Sweet / saline / aromatic", image: "/images/courses/i2.png" },
      { no: "03", name: "Monsoon Fire", detail: "Charred line-caught fish / coconut emulsion / smoked chilli / garden herbs", story: "Fire and coast in equal measure. The fish arrives deeply charred, softened by coconut and lifted with herbs.", note: "Smoky / rich / coastal", image: "/images/courses/i3.png" },
      { no: "04", name: "Forest Floor", detail: "Glazed duck / wild pepper / fermented plum / woodland mushroom", story: "A dark, generous course layered with wild pepper warmth, earthy mushrooms and the vivid acidity of plum.", note: "Deep / earthy / spiced", image: "/images/courses/i4.png" },
      { no: "05", name: "Last Light", detail: "Kerala cacao / caramelised banana / palm jaggery / coconut cream", story: "The final glow of the evening, balancing dark cacao with warm banana, jaggery and delicate chocolate work.", note: "Dark / caramel / warm", image: "/images/courses/i5.png" },
    ],
  },
  "The Coast": {
    meta: "5 courses / INR 5,200",
    dishes: [
      { no: "06", name: "Oyster & Toddy", detail: "Pristine oyster / toddy granita / fermented coconut / green chilli", story: "A single bracing mouthful served over ice, carrying the freshness and mineral edge of the open sea.", note: "Icy / mineral / vibrant", image: "/images/courses/i6.png" },
      { no: "07", name: "Lagoon", detail: "Mud crab / young mango / curry leaf / shellfish bisque", story: "A generous coastal plate where sweet crab meets tart mango and an intensely polished shellfish bisque.", note: "Silken / sweet / fragrant", image: "/images/courses/i7.png" },
      { no: "08", name: "Day Boat", detail: "Line-caught fish / coconut veloute / wild lime / herb oil", story: "The day's finest catch, gently cooked and presented with a luminous coconut sauce and charred wild lime.", note: "Pure / citrus / delicate", image: "/images/courses/i8.png" },
    ],
  },
  "The Garden": {
    meta: "5 courses / INR 4,600",
    dishes: [
      { no: "09", name: "Tender Coconut", detail: "Tender coconut / clarified tomato water / basil seed / sea purslane", story: "A transparent garden course of tender coconut, floral tomato water and tiny bursts of basil seed.", note: "Clean / floral / refreshing", image: "/images/courses/i9.png" },
      { no: "10", name: "Wild Pepper", detail: "Forest mushroom / smoked whey / tapioca crisp / wild pepper", story: "A sculptural woodland composition, rich with roasted mushrooms, smoke and the long warmth of wild pepper.", note: "Woodland / smoky / savoury", image: "/images/courses/i10.png" },
      { no: "11", name: "Plantain", detail: "Charred plantain heart / cashew cream / Malabar tamarind / aromatic spice", story: "Plantain transformed through fire, surrounded by cashew, tamarind and crisp textures in shades of gold.", note: "Charred / creamy / tangy", image: "/images/courses/i11.png" },
    ],
  },
};

const visualCourses = Object.entries(courses).flatMap(([menu, value]) => value.dishes.map((dish) => ({ ...dish, menu })));

const faqs = [
  ["Can you accommodate dietary requirements?", "Yes. We can adapt the menu for vegetarian guests and most allergies with 48 hours' notice. We cannot safely accommodate airborne seafood allergies."],
  ["What is the dress code?", "Relaxed evening elegance. Linen, sandals and smart casual clothing are welcome. We only ask that beachwear is left for the daytime."],
  ["How long is the experience?", "The Journey lasts around two and a half hours. The Coast and Garden menus take approximately two hours."],
  ["Are children welcome?", "Guests aged twelve and above are warmly welcomed. The tasting menu is served to the entire table."],
];

const reveal = {
  initial: { opacity: 0, y: 54, filter: "blur(7px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-8%" },
  transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
};

const imageReveal = {
  initial: { opacity: 0, clipPath: "inset(12% 0 12% 0)", scale: 1.06 },
  whileInView: { opacity: 1, clipPath: "inset(0% 0 0% 0)", scale: 1 },
  viewport: { once: true, margin: "-8%" },
  transition: { duration: 1.35, ease: [0.16, 1, 0.3, 1] },
};

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Restaurant", "story"], ["Menu", "menu"], ["Experience", "experience"], ["Visit", "visit"]];
  return (
    <>
      <motion.header className={`nav ${scrolled ? "nav--scrolled" : ""}`} initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}>
        <a className="brand" href="#top" aria-label="Aurum home">AURUM<span>coastal table</span></a>
        <nav className="nav__links" aria-label="Main navigation">{links.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
        <a className="nav__cta" href="#reserve">Reserve <ArrowUpRight size={14} /></a>
        <button className="nav__menu" onClick={() => setOpen(true)} aria-label="Open navigation"><MenuIcon /></button>
      </motion.header>
      <AnimatePresence>
        {open && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
          <span className="eyebrow">Explore Aurum</span>
          {[...links, ["Reserve", "reserve"]].map(([label, id], i) => <motion.a href={`#${id}`} onClick={() => setOpen(false)} key={id} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .07 }}>{label}</motion.a>)}
        </motion.div>}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 150]);
  const copyY = useTransform(scrollY, [0, 700], [0, 75]);
  const line = {
    hidden: {},
    visible: { transition: { staggerChildren: .11 } },
  };
  const word = {
    hidden: { opacity: 0, y: "110%", rotate: 3, filter: "blur(8px)" },
    visible: { opacity: 1, y: "0%", rotate: 0, filter: "blur(0px)", transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] } },
  };
  return <section className="hero" id="top">
    <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} style={{ y: imageY }} src="/images/aurum-hero.webp" alt="A candlelit table overlooking the Kerala coast" fetchPriority="high" />
    <div className="hero__shade" />
    <motion.div className="hero__copy" style={{ y: copyY }}>
      <motion.p className="eyebrow hero__eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2, duration: .9 }}><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .15, duration: 1.1 }} />Kovalam / Kerala / 8.3988 N</motion.p>
      <motion.h1 initial="hidden" animate="visible" transition={{ delayChildren: .38 }}>
        <motion.span className="hero__line" variants={line}><span className="hero__word-wrap"><motion.span variants={word}>Beyond</motion.span></span><span className="hero__word-wrap"><motion.span variants={word}>dining.</motion.span></span></motion.span>
        <motion.span className="hero__line hero__line--accent" variants={line}><span className="hero__word-wrap"><motion.span variants={word}>A</motion.span></span><span className="hero__word-wrap"><motion.span variants={word}>coastal</motion.span></span><span className="hero__word-wrap"><motion.span variants={word}>ritual.</motion.span></span></motion.span>
      </motion.h1>
      <motion.p className="hero__type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: .7 }}>Seasonal menus shaped by tide, fire and candlelight.</motion.p>
      <motion.div className="hero__actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: .85, ease: [0.16, 1, 0.3, 1] }}>
        <a className="button button--light" href="#reserve">Reserve your evening <ArrowUpRight size={15} /></a>
        <a className="text-link" href="#menu">Explore the menu <ChevronRight size={14} /></a>
      </motion.div>
    </motion.div>
    <motion.div className="hero__meta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: .62, y: 0 }} transition={{ delay: 1.55, duration: .8 }}><span>Tuesday to Sunday</span><span>Dinner from 7 PM</span><span>Fourteen tables</span></motion.div>
    <motion.a href="#story" className="hero__scroll" aria-label="Scroll to story" animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity }}><ArrowDown size={17} /></motion.a>
  </section>;
}

function Story() {
  return <section className="restaurant-story section-light" id="story">
    <motion.div className="restaurant-story__intro" {...reveal}>
      <p className="eyebrow">The restaurant</p>
      <h2>Open the book<br />of <em>Aurum.</em></h2>
      <p>After the hero, the story unfolds like a quiet chapter: pages of coastline, candlelight, and service written around the rhythm of Kerala.</p>
    </motion.div>
    <div className="story-book" aria-label="Aurum restaurant story book">
      <motion.div className="story-book__cover" aria-hidden="true" initial={{ opacity: 1, rotateY: 0, x: 0 }} whileInView={{ opacity: 0, rotateY: -118, x: "-18%" }} viewport={{ once: true, margin: "-18%" }} transition={{ duration: 3.4, ease: [0.22, 1, 0.36, 1], opacity: { duration: .8, delay: 2.55 } }}>
        <span>Aurum</span>
        <strong>Coastal Table</strong>
        <em>Chapter 01</em>
      </motion.div>
      <motion.div className="story-book__page story-book__page--left" initial={{ opacity: 0, rotateY: -18, x: -35 }} whileInView={{ opacity: 1, rotateY: 0, x: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}>
        <span className="story-book__chapter">Chapter 01</span>
        <h3>A dining room<br />written by the sea.</h3>
        <p className="story-book__lead">Aurum is a fourteen-table coastal room where the evening is paced like a page turning slowly: first gold, then blue, then candlelight.</p>
        <p>Natural stone, dark timber and open air frame the horizon without stealing attention from it. Service stays quiet. The music stays low. Every table is left with space to settle into the night.</p>
        <div className="story-book__stats">
          <div><strong>14</strong><span>ocean-facing tables</span></div>
          <div><strong>01</strong><span>seating each evening</span></div>
          <div><strong>2.5 hr</strong><span>signature experience</span></div>
        </div>
        <a className="text-link text-link--dark" href="#experience">Read the evening <ArrowUpRight size={14} /></a>
      </motion.div>
      <motion.div className="story-book__page story-book__page--right" initial={{ opacity: 0, rotateY: 16, x: 35 }} whileInView={{ opacity: 1, rotateY: 0, x: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ delay: .12, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
        <figure className="story-book__photo story-book__photo--large"><img src="/images/restaurant-interior.webp" alt="Aurum's ocean-facing restaurant interior" loading="lazy" /><figcaption>The room faces west, toward the changing water.</figcaption></figure>
        <figure className="story-book__photo story-book__photo--small"><img src="/images/table-detail.webp" alt="An elegant table setting at Aurum" loading="lazy" /><figcaption>Set for an unhurried evening.</figcaption></figure>
        <div className="story-book__note"><span>Kovalam / Kerala</span><p>Come before sunset. Let the first course arrive only after the sky has begun to soften.</p></div>
      </motion.div>
    </div>
  </section>;
}

function CoastalEvening() {
  return <section className="coastal-evening" id="producers">
    <motion.div className="coastal-evening__hero" {...imageReveal}><img src="/images/sunset-table.webp" alt="An elegant private table overlooking the coast at sunset" loading="lazy" /><div className="coastal-evening__overlay"><p className="eyebrow">The golden hour</p><h2>Dinner begins<br /><em>before the first course.</em></h2></div></motion.div>
    <motion.div className="coastal-evening__copy" {...reveal}><span>01 / Arrive</span><h3>Come for the sunset.<br />Stay for the story.</h3><p>Your evening begins above the shoreline with a coastal aperitif. As the light softens, we guide you to the dining room for a menu paced around the changing horizon.</p><a className="text-link text-link--dark" href="#reserve">Plan your evening <ArrowUpRight size={13} /></a></motion.div>
    <motion.figure className="coastal-evening__arrival" {...imageReveal}><img src="/images/guest-arrival.webp" alt="Guests arriving at Aurum for dinner by the sea" loading="lazy" /><figcaption><span>02 / Settle in</span><strong>Blue hour at Aurum</strong></figcaption></motion.figure>
    <div className="coastal-evening__taste-stack">
      <motion.figure className="coastal-evening__small" {...imageReveal}><img src="/images/table-detail.webp" alt="A small table detail before the aperitif service" loading="lazy" /><figcaption><span>03 / Detail</span><strong>Before the pour</strong></figcaption></motion.figure>
      <motion.figure className="coastal-evening__aperitif" {...imageReveal}><img src="/images/coastal-aperitif.webp" alt="A botanical aperitif served beside the sea" loading="lazy" /><figcaption><span>04 / First taste</span><strong>Aperitif by the water</strong></figcaption></motion.figure>
    </div>
  </section>;
}

function MenuSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dish = visualCourses[active];
  const move = (direction) => setActive((active + direction + visualCourses.length) % visualCourses.length);
  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % visualCourses.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return <section className="menu-section section-light" id="menu">
    <div className="menu-stage">
      <div className="menu-stage__layers" aria-hidden="true"><i /><i /><i /><i /><span /><span /><span /></div>
      <div className="menu-stage__top"><p className="eyebrow">The monsoon menu</p><nav aria-label="Select a course">{visualCourses.map((item, index) => <button className={active === index ? "active" : ""} onClick={() => setActive(index)} aria-label={`View course ${item.no}: ${item.name}`} aria-current={active === index ? "true" : undefined} key={item.no}>{item.no}</button>)}</nav><div className="menu-stage__arrows"><button onClick={() => move(-1)} aria-label="Previous course">&lt;</button><button onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume carousel" : "Pause carousel"}>{paused ? <Play size={16} /> : <Pause size={16} />}</button><button onClick={() => move(1)} aria-label="Next course">&gt;</button></div></div>
      <AnimatePresence mode="sync">
        <motion.div className="menu-stage__copy" key={`${dish.no}-copy`} initial={{ opacity: 0, x: "-55vw", filter: "blur(4px)" }} animate={{ opacity: 1, x: "0vw", filter: "blur(0px)" }} exit={{ opacity: 0, x: "0vw", filter: "blur(3px)", transition: { duration: .18 } }} transition={{ duration: 2.15, ease: [0.22, 1, 0.36, 1] }}>
          <span className="eyebrow">{dish.menu} / Course {dish.no}</span><h2>{dish.name}</h2><p className="menu-stage__detail">{dish.detail}</p><p className="menu-stage__story">{dish.story}</p><div className="menu-stage__taste"><span>Tasting notes</span><strong>{dish.note}</strong></div><a className="text-link text-link--dark" href="#reserve">Reserve this experience <ArrowUpRight size={13} /></a>
        </motion.div>
      </AnimatePresence>
      <div className="menu-stage__dish">
        <AnimatePresence mode="sync"><motion.figure key={dish.no} initial={{ opacity: 0, x: "65vw" }} animate={{ opacity: 1, x: "0vw" }} exit={{ opacity: 0, x: "0vw", transition: { duration: .18 } }} transition={{ duration: 2.15, ease: [0.22, 1, 0.36, 1] }}><img src={dish.image} alt={`${dish.name}: ${dish.detail}`} /></motion.figure></AnimatePresence>
      </div>
    </div>
  </section>;
}

function Experience() {
  return <section className="experience" id="experience">
    <img src="/images/dining-room.webp" alt="Aurum's open-air dining room at blue hour" loading="lazy" />
    <div className="experience__shade" />
    <motion.div className="experience__copy" {...reveal}><p className="eyebrow">The room</p><h2>Fourteen tables.<br /><em>One horizon.</em></h2><p>Arrive before sunset for a drink in the garden. Dinner unfolds at an unhurried pace as the coast moves from gold to blue.</p><a className="button button--light" href="#visit">Plan your visit <ArrowUpRight size={15} /></a></motion.div>
  </section>;
}

function Visit() {
  return <section className="visit section-light" id="visit">
    <motion.div className="visit__heading" {...reveal}><p className="eyebrow">Before you arrive</p><h2>A quiet evening<br />by the <em>water.</em></h2></motion.div>
    <motion.div className="visit__details" {...reveal}>
      <div><Clock3 /><span>Service</span><strong>Tuesday - Sunday<br />7 PM - 11 PM</strong></div>
      <div><MapPin /><span>Find us</span><strong>Kovalam Beach Road<br />Thiruvananthapuram</strong><a href="https://maps.google.com/?q=Kovalam+Beach+Kerala" target="_blank" rel="noreferrer">Open in maps <ArrowUpRight size={12} /></a></div>
      <div><Phone /><span>Contact</span><strong>+91 471 555 0140<br />hello@aurum.table</strong><a href="tel:+914715550140">Call the restaurant <ArrowUpRight size={12} /></a></div>
    </motion.div>
    <motion.div className="faq" {...reveal}><p className="eyebrow">Good to know</p>{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={16} /></summary><p>{a}</p></details>)}</motion.div>
  </section>;
}

function Reservation() {
  const initial = { name: "", email: "", phone: "", date: "", guests: "2", time: "7:30 PM", menu: "The Journey", notes: "" };
  const [form, setForm] = useState(initial);
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setStatus({ loading: true, error: "" });
    try {
      const response = await fetch("/api/reservations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setReference(result.reference);
      setStatus({ loading: false, error: "" });
    } catch (error) {
      setStatus({ loading: false, error: error.message || "Please call us to complete your request." });
    }
  };
  return <section className="reserve" id="reserve">
    <motion.div className="reserve__intro" {...reveal}><p className="eyebrow">Reservations</p><h2>Your table<br /><em>awaits.</em></h2><p>Requests are personally confirmed within 24 hours. For tonight or parties larger than six, please call us.</p><a href="tel:+914715550140" className="text-link">+91 471 555 0140 <ArrowUpRight size={13} /></a></motion.div>
    <motion.div className="reserve__card" {...reveal}><AnimatePresence mode="wait">
      {reference ? <motion.div className="success" key="success" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }}><span><Check /></span><p className="eyebrow">Request received</p><h3>We saved your evening.</h3><p>Your reference is <strong>{reference}</strong>. A confirmation will be sent to <strong>{form.email}</strong>.</p><div className="success__summary"><span>{form.date}</span><span>{form.guests} guests</span><span>{form.time}</span></div><button className="text-link text-link--dark" onClick={() => { setForm(initial); setReference(""); }}>Make another request <ChevronRight size={14} /></button></motion.div>
      : <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="form-title"><CalendarDays size={18} /><span>Request a table</span></div>
        <div className="form-row"><label>Full name<input required value={form.name} onChange={update("name")} autoComplete="name" /></label><label>Email<input required type="email" value={form.email} onChange={update("email")} autoComplete="email" /></label></div>
        <div className="form-row"><label>Phone<input required type="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" /></label><label>Date<input required type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={update("date")} /></label></div>
        <div className="form-row form-row--three"><label>Guests<select value={form.guests} onChange={update("guests")}>{[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}</select></label><label>Time<select value={form.time} onChange={update("time")}><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option><option>8:30 PM</option></select></label><label>Menu<select value={form.menu} onChange={update("menu")}>{Object.keys(courses).map(name => <option key={name}>{name}</option>)}</select></label></div>
        <label>Dietary notes or occasion<textarea value={form.notes} onChange={update("notes")} placeholder="Tell us how we can care for your table" /></label>
        {status.error && <p className="form-error" role="alert">{status.error}</p>}
        <button className="button button--gold" type="submit" disabled={status.loading}>{status.loading ? <><LoaderCircle className="spinner" size={15} /> Sending request</> : <>Send reservation request <ArrowUpRight size={15} /></>}</button><small>No payment required. This is a request, not an instant confirmation.</small>
      </motion.form>}
    </AnimatePresence></motion.div>
  </section>;
}

function Footer() {
  return <footer><div className="footer__top"><a className="brand" href="#top">AURUM<span>coastal table</span></a><p>For dinners shaped by the season.</p><a className="button button--outline" href="#reserve">Reserve a table</a></div><div className="footer__links"><div><span>Explore</span><a href="#story">The restaurant</a><a href="#menu">Menus</a><a href="#experience">The room</a></div><div><span>Visit</span><a href="#visit">Hours & location</a><a href="tel:+914715550140">+91 471 555 0140</a><a href="mailto:hello@aurum.table">hello@aurum.table</a></div><div><span>Connect</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="mailto:press@aurum.table">Press enquiries</a><a href="mailto:careers@aurum.table">Careers</a></div></div><div className="footer__bottom"><small>Copyright 2026 Aurum Coastal Table</small><a href="#top">Back to top <ArrowUpRight size={12} /></a><span><Sparkles size={11} /> Kerala, India</span></div></footer>;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const onPointerMove = (event) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);
  return <><motion.div className="progress" style={{ scaleX: scrollYProgress }} /><Nav /><main><Hero /><Story /><CoastalEvening /><MenuSection /><Experience /><Visit /><Reservation /></main><Footer /></>;
}
