"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  {
    id: "01",
    name: "ALMONDS",
    subtitle: "Selected for consistency, texture and dependable wholesale supply.",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1600&q=90",
    tone: "almond",
  },
  {
    id: "02",
    name: "CASHEWS",
    subtitle: "A versatile staple for retailers, bakeries, cafés and hospitality.",
    image: "https://images.unsplash.com/photo-1600189020840-e9918c25269d?auto=format&fit=crop&w=1600&q=90",
    tone: "cashew",
  },
  {
    id: "03",
    name: "PISTACHIOS",
    subtitle: "Distinctive colour, character and professional-ready quantities.",
    image: "https://images.unsplash.com/photo-1525059337994-6f2a1311b4d4?auto=format&fit=crop&w=1600&q=90",
    tone: "pistachio",
  },
  {
    id: "04",
    name: "DATES",
    subtitle: "Rich, naturally sweet produce selected for business demand.",
    image: "https://images.unsplash.com/photo-1605196560547-1f3a780f5522?auto=format&fit=crop&w=1600&q=90",
    tone: "date",
  },
];

const audiences = ["GROCERY", "BAKERY", "CAFÉ", "RESTAURANT", "HOSPITALITY", "RESELLER"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);
  const productRef = useRef(null);

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("pointermove", move);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = productRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(0.999, Math.max(0, -rect.top / total));
      setActiveProduct(Math.min(products.length - 1, Math.floor(progress * products.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <div
        className={"cursor " + (cursorActive ? "cursor--active" : "")}
        style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}
      />

      <header className="nav">
        <a className="brand" href="#top" aria-label="Roma home">
          <span>R</span>OMA
        </a>

        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#standard">Supply</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <button className="language">FR <span>/</span> AR</button>
          <a className="quote-pill" href="#quote">Request a quote <Arrow /></a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-panel">
          <button className="menu-close" onClick={() => setMenuOpen(false)}>Close</button>
          <div className="menu-word">ROMA</div>
          <nav>
            <a href="#products" onClick={() => setMenuOpen(false)}>Products <span>01</span></a>
            <a href="#standard" onClick={() => setMenuOpen(false)}>Supply <span>02</span></a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About <span>03</span></a>
            <a href="#quote" onClick={() => setMenuOpen(false)}>Contact <span>04</span></a>
          </nav>
        </div>
      )}

      <section className="hero" id="top">
        <div className="hero-kicker">WHOLESALE · DRIED FRUITS · NUTS</div>
        <div className="hero-copy">
          <h1>
            <span className="hero-line">SELECTED BY</span>
            <span className="hero-line hero-line--indent">ORIGIN.</span>
            <span className="hero-line">SUPPLIED FOR</span>
            <span className="hero-line hero-line--indent2">BUSINESS.</span>
          </h1>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit--one">
            <img src={products[0].image} alt="" />
          </div>
          <div className="hero-orbit hero-orbit--two">
            <img src={products[2].image} alt="" />
          </div>
          <div className="hero-orbit hero-orbit--three">
            <img src={products[3].image} alt="" />
          </div>
        </div>

        <div className="hero-bottom">
          <p>
            Roma Fruits Secs supplies dried fruits and nuts to professional buyers with
            a clear focus on dependable service and direct business relationships.
          </p>
          <a href="#products" className="round-link" aria-label="Explore products">
            <span>Explore</span>
            <Arrow />
          </a>
        </div>
      </section>

      <section className="statement section-pad">
        <div className="eyebrow" data-reveal>WHO WE SERVE / 01</div>
        <h2 data-reveal>
          BUILT FOR THE
          <br />
          BUSINESSES THAT
          <br />
          <em>SERVE EVERY DAY.</em>
        </h2>
        <div className="audience-list" data-reveal>
          {audiences.map((item, i) => (
            <div
              className="audience-row"
              key={item}
              onPointerEnter={() => setCursorActive(true)}
              onPointerLeave={() => setCursorActive(false)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              <Arrow />
            </div>
          ))}
        </div>
      </section>

      <section className="products-scroll" id="products" ref={productRef}>
        <div className="products-sticky">
          <div className={`product-stage product-stage--${products[activeProduct].tone}`}>
            <div className="product-topline">
              <span>PRODUCTS / {products[activeProduct].id}</span>
              <span>WHOLESALE RANGE</span>
            </div>

            <div className="product-name-wrap">
              <span className="product-number">{products[activeProduct].id}</span>
              <h2 key={products[activeProduct].name}>{products[activeProduct].name}</h2>
            </div>

            <div className="product-image-shell" key={products[activeProduct].image}>
              <img src={products[activeProduct].image} alt={products[activeProduct].name.toLowerCase()} />
            </div>

            <div className="product-meta">
              <p>{products[activeProduct].subtitle}</p>
              <a href="#quote">Ask about availability <Arrow /></a>
            </div>

            <div className="product-dots">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  className={i === activeProduct ? "active" : ""}
                  onClick={() => setActiveProduct(i)}
                  aria-label={p.name}
                >
                  <span>{p.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="standard section-pad" id="standard">
        <div className="eyebrow eyebrow--light" data-reveal>THE ROMA STANDARD / 02</div>
        <div className="standard-intro" data-reveal>
          <h2>SUPPLY, WITHOUT<br /><em>THE NOISE.</em></h2>
          <p>
            A straightforward wholesale relationship: tell us what you need, receive
            current availability and pricing, then confirm directly with our team.
          </p>
        </div>

        <div className="standard-grid">
          {[
            ["01", "PROFESSIONAL QUANTITIES", "Built around business demand rather than consumer baskets."],
            ["02", "SELECTED RANGE", "A focused mix of dried fruits and nuts for professional buyers."],
            ["03", "RESPONSIVE SUPPLY", "Availability and quote information shared directly with your business."],
            ["04", "LOCAL RELATIONSHIPS", "A human, direct approach to recurring supply and enquiries."],
          ].map(([num, title, copy]) => (
            <article className="standard-card" key={num} data-reveal>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-pad">
        <div className="eyebrow" data-reveal>HOW IT WORKS / 03</div>
        <div className="process-line">
          {[
            ["01", "REQUEST", "Tell us the products and quantities you need."],
            ["02", "QUOTE", "Receive availability, pricing and delivery information."],
            ["03", "SUPPLY", "Confirm your order directly with the Roma team."],
          ].map(([num, title, copy]) => (
            <div className="process-step" key={num} data-reveal>
              <span className="process-num">{num}</span>
              <div className="process-marker" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1599599810694-b5ac4dd8b3e8?auto=format&fit=crop&w=2000&q=90"
            alt="Dried fruits and nuts prepared for supply"
          />
        </div>
        <div className="about-copy">
          <div className="eyebrow eyebrow--light" data-reveal>ROMA / 04</div>
          <h2 data-reveal>
            SIMPLE SUPPLY.
            <br />
            <em>SERIOUS SERVICE.</em>
          </h2>
          <p data-reveal>
            Roma Fruits Secs is being built around a simple idea: make wholesale sourcing
            of dried fruits and nuts clearer, faster and easier for local professional buyers.
          </p>
          <a href="#quote" data-reveal>Start an enquiry <Arrow /></a>
        </div>
      </section>

      <section className="quote section-pad" id="quote">
        <div className="quote-head">
          <div className="eyebrow" data-reveal>ENQUIRY / 05</div>
          <h2 data-reveal>WHAT DO<br />YOU NEED?</h2>
        </div>

        <form className="quote-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-block" data-reveal>
            <label>01 — Select products</label>
            <div className="chips">
              {["Almonds", "Cashews", "Walnuts", "Pistachios", "Dates", "Raisins", "Other"].map((x) => (
                <button type="button" key={x}>{x}</button>
              ))}
            </div>
          </div>

          <div className="form-grid" data-reveal>
            <label>
              <span>02 — Estimated quantity</span>
              <select defaultValue="">
                <option value="" disabled>Select range</option>
                <option>Under 10 kg</option>
                <option>10–50 kg</option>
                <option>50–100 kg</option>
                <option>100 kg+</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label>
              <span>03 — Delivery city</span>
              <input placeholder="Your city" />
            </label>
          </div>

          <div className="form-grid" data-reveal>
            <label>
              <span>04 — Business name</span>
              <input placeholder="Company / shop" />
            </label>
            <label>
              <span>05 — WhatsApp or phone</span>
              <input placeholder="+212..." />
            </label>
          </div>

          <div className="submit-row" data-reveal>
            <p>We’ll use these details only to respond to your wholesale enquiry.</p>
            <button type="submit">REQUEST AVAILABILITY <Arrow /></button>
          </div>
        </form>
      </section>

      <footer>
        <div className="footer-top">
          <p>Prefer a direct conversation?</p>
          <a href="#quote">WHATSAPP <Arrow /></a>
          <a href="#quote">PHONE <Arrow /></a>
        </div>
        <div className="footer-word">ROMA</div>
        <div className="footer-bottom">
          <span>Wholesale dried fruits & nuts</span>
          <span>© {new Date().getFullYear()} Roma Fruits Secs</span>
          <span>Morocco</span>
        </div>
      </footer>
    </main>
  );
}
