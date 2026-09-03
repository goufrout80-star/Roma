"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { copy, productKeys } from "./data/copy";
import {
  AudienceIllustration,
  BotanicalPoster,
  ProcessIcon,
  ProductIllustration,
  RomaMark,
  StandardIcon,
} from "./components/Illustrations";

const productTheme = {
  almonds: { main: "#D7AF7B", pale: "#F4F0E7", leaf: "#214432", accent: "#D76B42", bg: "#E7D5BA" },
  cashews: { main: "#D9C7A2", pale: "#F7F2E7", leaf: "#46614A", accent: "#C97A4D", bg: "#E9DEC8" },
  pistachios: { main: "#B8C59A", pale: "#F4F0E7", leaf: "#214432", accent: "#E0B760", bg: "#CFD7B6" },
  dates: { main: "#8D4F3C", pale: "#F2E7DB", leaf: "#405A3E", accent: "#D76B42", bg: "#A96B55" },
  walnuts: { main: "#B78E62", pale: "#F4F0E7", leaf: "#344F38", accent: "#D76B42", bg: "#D0B18D" },
  raisins: { main: "#7C625B", pale: "#F4F0E7", leaf: "#3A593D", accent: "#B65E47", bg: "#9C847B" },
  peanuts: { main: "#C9A56F", pale: "#F4F0E7", leaf: "#405E42", accent: "#D76B42", bg: "#DCC49D" },
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function LanguageSwitch({ lang, onChange, compact = false }) {
  return (
    <div className={"language-switch " + (compact ? "language-switch--compact" : "")} aria-label="Language">
      {["en", "fr", "ar"].map((key) => (
        <button
          type="button"
          key={key}
          onClick={() => onChange(key)}
          className={lang === key ? "active" : ""}
          aria-pressed={lang === key}
        >
          {copy[key].code}
        </button>
      ))}
    </div>
  );
}

function Loader({ visible }) {
  if (!visible) return null;
  return (
    <div className="site-loader" aria-hidden="true">
      <div className="loader-mark">
        <RomaMark />
      </div>
      <div className="loader-almond">
        <svg viewBox="0 0 120 160">
          <path d="M60 10C96 33 112 72 99 111C87 146 53 160 27 138C1 116 6 74 22 43C33 22 45 13 60 10Z" />
        </svg>
      </div>
      <span>FROM ORIGIN TO BUSINESS</span>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState(0);
  const [activeAudience, setActiveAudience] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [quoteStep, setQuoteStep] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [form, setForm] = useState({ quantity: "", city: "", business: "", contact: "", message: "" });
  const [formError, setFormError] = useState("");
  const [requestText, setRequestText] = useState("");
  const [copied, setCopied] = useState(false);
  const productRef = useRef(null);

  const t = copy[lang];
  const isRTL = t.dir === "rtl";

  const products = useMemo(
    () =>
      productKeys.map((key, index) => ({
        key,
        id: String(index + 1).padStart(2, "0"),
        name: t.product.names[key],
        description: t.product.descriptions[key],
        theme: productTheme[key],
      })),
    [t]
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("roma-language");
    if (stored && copy[stored]) setLang(stored);

    const media = window.matchMedia("(max-width: 900px)");
    const updateMobile = () => setIsMobile(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);

    const seen = window.sessionStorage.getItem("roma-v3-seen");
    const timer = window.setTimeout(() => {
      setLoading(false);
      window.sessionStorage.setItem("roma-v3-seen", "1");
    }, seen ? 180 : 900);

    return () => {
      media.removeEventListener("change", updateMobile);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("roma-language", lang);
    document.documentElement.lang = lang === "ar" ? "ar" : lang;
    document.documentElement.dir = t.dir;
    document.title =
      lang === "fr"
        ? "Roma Fruits Secs — Grossiste fruits secs & noix"
        : lang === "ar"
          ? "Roma Fruits Secs — توريد الفواكه المجففة والمكسرات بالجملة"
          : "Roma Fruits Secs — Wholesale Dried Fruits & Nuts";
  }, [lang, t.dir]);

  useEffect(() => {
    const move = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move);

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    document.querySelectorAll("[data-section]").forEach((el) => sectionObserver.observe(el));

    return () => {
      window.removeEventListener("pointermove", move);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [lang]);

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
  }, [products.length]);

  const changeLanguage = (key) => {
    setLang(key);
    setMenuOpen(false);
  };

  const goToProduct = (index) => {
    const el = productRef.current;
    if (!el) return;
    const sectionTop = window.scrollY + el.getBoundingClientRect().top;
    const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1);
    const target = sectionTop + (scrollable * index) / Math.max(products.length - 1, 1);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const askForProduct = (key) => {
    setSelectedProducts((current) => (current.includes(key) ? current : [...current, key]));
    setQuoteStep(0);
    document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleProduct = (key) => {
    setSelectedProducts((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  };

  const buildRequest = () => {
    const labels = selectedProducts.map((key) => t.product.names[key]).join(", ");
    return [
      "ROMA FRUITS SECS — WHOLESALE ENQUIRY",
      "",
      `${t.form.products}: ${labels || "—"}`,
      `${t.form.quantity}: ${form.quantity || "—"}`,
      `${t.form.city}: ${form.city || "—"}`,
      `${t.form.business}: ${form.business || "—"}`,
      `${t.form.contact}: ${form.contact || "—"}`,
      `${t.form.message}: ${form.message || "—"}`,
    ].join("\n");
  };

  const submitRequest = (event) => {
    event.preventDefault();
    setFormError("");
    if (!selectedProducts.length || !form.contact.trim()) {
      setFormError(t.form.missing);
      if (isMobile && !selectedProducts.length) setQuoteStep(0);
      return;
    }
    setRequestText(buildRequest());
    setCopied(false);
  };

  const copyRequest = async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const genericWhatsapp = encodeURIComponent(
    lang === "fr"
      ? "Bonjour Roma Fruits Secs, je souhaite recevoir des informations sur vos produits en gros."
      : lang === "ar"
        ? "مرحباً Roma Fruits Secs، أريد معلومات عن منتجاتكم بالجملة."
        : "Hello Roma Fruits Secs, I would like information about your wholesale products."
  );

  const whatsappUrl = requestText
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(requestText)}`
    : `https://api.whatsapp.com/send?text=${genericWhatsapp}`;

  const activeProductData = products[activeProduct];
  const audienceData = t.serve.audiences[activeAudience];

  return (
    <main className={isRTL ? "site site--rtl" : "site"} dir={t.dir}>
      <Loader visible={loading} />

      <div
        className={"cursor " + (cursorActive ? "cursor--active" : "")}
        style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}
      />

      <header className={"nav " + (activeSection !== "top" ? "nav--scrolled" : "")}>
        <a className="brand" href="#top" aria-label="Roma home">
          <RomaMark className="roma-mark" />
          <span>ROMA</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a className={activeSection === "products" ? "active" : ""} href="#products">{t.nav.products}</a>
          <a className={activeSection === "standard" || activeSection === "process" ? "active" : ""} href="#standard">{t.nav.supply}</a>
          <a className={activeSection === "about" ? "active" : ""} href="#about">{t.nav.about}</a>
        </nav>

        <div className="nav-actions">
          <LanguageSwitch lang={lang} onChange={changeLanguage} />
          <a className="quote-pill" href="#quote">{t.nav.quote}<Arrow /></a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span /><span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-panel">
          <div className="menu-head">
            <div className="brand brand--menu"><RomaMark className="roma-mark" /><span>ROMA</span></div>
            <button className="menu-close" onClick={() => setMenuOpen(false)}>{t.form.close}</button>
          </div>
          <LanguageSwitch lang={lang} onChange={changeLanguage} compact />
          <div className="menu-illustration" style={productTheme.almonds}>
            <ProductIllustration type="almonds" />
          </div>
          <nav>
            <a href="#products" onClick={() => setMenuOpen(false)}>{t.nav.products}<span>01</span></a>
            <a href="#standard" onClick={() => setMenuOpen(false)}>{t.nav.supply}<span>02</span></a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}<span>03</span></a>
            <a href="#quote" onClick={() => setMenuOpen(false)}>{t.nav.contact}<span>04</span></a>
          </nav>
        </div>
      )}

      <section className="hero" id="top" data-section>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-topline">
          <div className="hero-badge"><span />{t.hero.badge}</div>
          <div className="hero-kicker">{t.hero.kicker}</div>
        </div>

        <div className="hero-copy">
          <h1 className="display">
            <span>{t.hero.lines[0]}</span>
            <em>{t.hero.lines[1]}</em>
          </h1>
        </div>

        <div
          className="hero-art"
          style={{
            "--ill-main": productTheme.almonds.main,
            "--ill-pale": productTheme.almonds.pale,
            "--ill-leaf": productTheme.almonds.leaf,
            "--ill-accent": productTheme.almonds.accent,
          }}
          aria-hidden="true"
        >
          <div className="hero-art-ring" />
          <ProductIllustration type="almonds" />
          <span className="art-label art-label--one">01 / {t.product.names.almonds}</span>
          <span className="art-label art-label--two">ROMA / SOURCE</span>
        </div>

        <div className="hero-bottom">
          <p>{t.hero.intro}</p>
          <a href="#products" className="round-link">{t.hero.explore}<Arrow /></a>
        </div>
      </section>

      <section className="ticker" aria-label={t.about.note}>
        <div>
          {[0,1,2,3].map((i) => <span key={i}>{t.about.note}<i>✦</i></span>)}
        </div>
      </section>

      <section className="serve section-pad" id="serve" data-section>
        <div className="section-label" data-reveal>{t.serve.eyebrow}</div>
        <div className="serve-intro">
          <h2 className="display" data-reveal>{t.serve.title[0]}<br />{t.serve.title[1]}<br /><em>{t.serve.title[2]}</em></h2>
          <div className="serve-preview" data-reveal>
            <div className="serve-preview-art" key={audienceData[0]}>
              <AudienceIllustration type={audienceData[0]} />
            </div>
            <p>{audienceData[2]}</p>
          </div>
        </div>

        <div className="audience-list" data-reveal>
          {t.serve.audiences.map(([key, label], index) => (
            <button
              type="button"
              className={"audience-row " + (activeAudience === index ? "active" : "")}
              key={key}
              onPointerEnter={() => { setActiveAudience(index); setCursorActive(true); }}
              onPointerLeave={() => setCursorActive(false)}
              onFocus={() => setActiveAudience(index)}
              onClick={() => setActiveAudience(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong className="display">{label}</strong>
              <Arrow />
            </button>
          ))}
        </div>
      </section>

      <section
        className="products-atlas"
        id="products"
        data-section
        ref={productRef}
        style={{ height: `${Math.max(385, products.length * 55)}vh` }}
      >
        <div
          className="atlas-sticky"
          style={{
            "--ill-main": activeProductData.theme.main,
            "--ill-pale": activeProductData.theme.pale,
            "--ill-leaf": activeProductData.theme.leaf,
            "--ill-accent": activeProductData.theme.accent,
            "--atlas-bg": activeProductData.theme.bg,
          }}
        >
          <div className="atlas-head">
            <span>{t.product.eyebrow}</span>
            <h2 className="display">{t.product.title}</h2>
            <span>{t.product.range}</span>
          </div>

          <nav className="atlas-nav" aria-label={t.product.title}>
            {products.map((product, index) => (
              <button
                type="button"
                key={product.key}
                onClick={() => goToProduct(index)}
                className={index === activeProduct ? "active" : ""}
                aria-label={product.name}
              >
                <span>{product.id}</span>
                <b>{product.name}</b>
              </button>
            ))}
          </nav>

          <div className="atlas-art" key={activeProductData.key}>
            <div className="atlas-orbit atlas-orbit--one" />
            <div className="atlas-orbit atlas-orbit--two" />
            <ProductIllustration type={activeProductData.key} />
          </div>

          <div className="atlas-info" key={lang + activeProductData.key}>
            <span className="atlas-index">{activeProductData.id} / {products.length}</span>
            <h3 className="display">{activeProductData.name}</h3>
            <p>{activeProductData.description}</p>
            <button type="button" onClick={() => askForProduct(activeProductData.key)}>
              {t.product.availability}<Arrow />
            </button>
          </div>
        </div>
      </section>

      <section className="standard section-pad" id="standard" data-section>
        <div className="section-label section-label--light" data-reveal>{t.standard.eyebrow}</div>
        <div className="standard-title">
          <h2 className="display" data-reveal>{t.standard.title[0]}<br /><em>{t.standard.title[1]}</em></h2>
        </div>
        <div className="standard-list">
          {t.standard.items.map(([title, body], index) => (
            <article className="standard-row" key={title} data-reveal>
              <span className="standard-num">{String(index + 1).padStart(2, "0")}</span>
              <div className="standard-icon-wrap"><StandardIcon index={index} /></div>
              <h3 className="display">{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-pad" id="process" data-section>
        <div className="section-label" data-reveal>{t.process.eyebrow}</div>
        <h2 className="display process-title" data-reveal>{t.process.title[0]}<br />{t.process.title[1]}<br /><em>{t.process.title[2]}</em></h2>
        <div className="process-track" data-reveal>
          <div className="process-line" />
          {t.process.steps.map(([title, body], index) => (
            <article className="process-step" key={title}>
              <div className="process-node">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <ProcessIcon index={index} />
              </div>
              <h3 className="display">{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about" data-section>
        <div className="about-copy section-pad">
          <div className="section-label section-label--light" data-reveal>{t.about.eyebrow}</div>
          <h2 className="display" data-reveal>{t.about.title[0]}<br /><em>{t.about.title[1]}</em></h2>
          <p data-reveal>{t.about.copy}</p>
          <a href="#quote" data-reveal>{t.about.link}<Arrow /></a>
        </div>
        <div
          className="about-poster"
          style={{
            "--ill-main": productTheme.almonds.main,
            "--ill-pale": productTheme.almonds.pale,
            "--ill-leaf": "#B8C59A",
            "--ill-accent": "#E6C96C",
          }}
        >
          <span>{t.about.note}</span>
          <BotanicalPoster />
        </div>
      </section>

      <section className="quote section-pad" id="quote" data-section>
        <div className="quote-intro">
          <div className="section-label" data-reveal>{t.form.eyebrow}</div>
          <h2 className="display" data-reveal>{t.form.title[0]}<br /><em>{t.form.title[1]}</em></h2>
          <div className="quote-progress" aria-label="Quote progress">
            {[0,1,2,3].map((step) => (
              <button
                type="button"
                key={step}
                onClick={() => setQuoteStep(step)}
                className={quoteStep === step ? "active" : ""}
              >
                <span>{String(step + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>

        <form className="quote-form" onSubmit={submitRequest}>
          <section className={"quote-panel " + ((!isMobile || quoteStep === 0) ? "is-current" : "")}>
            <div className="quote-panel-head">
              <span>01</span>
              <h3 className="display">{t.form.products}</h3>
            </div>
            <div className="product-chips">
              {products.map((product) => (
                <button
                  type="button"
                  key={product.key}
                  className={selectedProducts.includes(product.key) ? "active" : ""}
                  onClick={() => toggleProduct(product.key)}
                >
                  <span className="chip-art" style={{
                    "--ill-main": product.theme.main,
                    "--ill-pale": product.theme.pale,
                    "--ill-leaf": product.theme.leaf,
                    "--ill-accent": product.theme.accent,
                  }}>
                    <ProductIllustration type={product.key} />
                  </span>
                  <b>{product.name}</b>
                  <i>{selectedProducts.includes(product.key) ? "✓" : "+"}</i>
                </button>
              ))}
            </div>
            {isMobile && <button type="button" className="form-next" onClick={() => setQuoteStep(1)}>{t.form.next}<Arrow /></button>}
          </section>

          <section className={"quote-panel " + ((!isMobile || quoteStep === 1) ? "is-current" : "")}>
            <div className="quote-panel-head">
              <span>02</span>
              <h3 className="display">{t.form.quantity}</h3>
            </div>
            <div className="field-grid">
              <label>
                <span>{t.form.quantity}</span>
                <select value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })}>
                  <option value="" disabled>{t.form.choose}</option>
                  {t.form.quantities.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span>{t.form.city}</span>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder={t.form.cityPlaceholder} />
              </label>
            </div>
            {isMobile && <div className="form-mobile-nav"><button type="button" onClick={() => setQuoteStep(0)}>{t.form.back}</button><button type="button" onClick={() => setQuoteStep(2)}>{t.form.next}<Arrow /></button></div>}
          </section>

          <section className={"quote-panel " + ((!isMobile || quoteStep === 2) ? "is-current" : "")}>
            <div className="quote-panel-head">
              <span>03</span>
              <h3 className="display">{t.form.contact}</h3>
            </div>
            <div className="field-grid">
              <label>
                <span>{t.form.business}</span>
                <input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder={t.form.businessPlaceholder} />
              </label>
              <label>
                <span>{t.form.contact}</span>
                <input inputMode="tel" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder={t.form.contactPlaceholder} />
              </label>
            </div>
            {isMobile && <div className="form-mobile-nav"><button type="button" onClick={() => setQuoteStep(1)}>{t.form.back}</button><button type="button" onClick={() => setQuoteStep(3)}>{t.form.next}<Arrow /></button></div>}
          </section>

          <section className={"quote-panel quote-panel--final " + ((!isMobile || quoteStep === 3) ? "is-current" : "")}>
            <div className="quote-panel-head">
              <span>04</span>
              <h3 className="display">{t.form.message}</h3>
            </div>
            <label className="textarea-field">
              <span>{t.form.message}</span>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.form.messagePlaceholder} />
            </label>
            {formError ? <p className="form-error" role="alert">{formError}</p> : null}
            <div className="quote-submit">
              <p>{t.form.privacy}</p>
              <button type="submit">{t.form.submit}<Arrow /></button>
            </div>
            {isMobile && <button type="button" className="form-back-only" onClick={() => setQuoteStep(2)}>{t.form.back}</button>}
          </section>
        </form>
      </section>

      {requestText && (
        <div className="request-modal" role="dialog" aria-modal="true" aria-label={t.form.success}>
          <button className="request-backdrop" onClick={() => setRequestText("")} aria-label={t.form.close} />
          <div className="request-card">
            <button className="request-close" onClick={() => setRequestText("")}>{t.form.close}</button>
            <span className="request-kicker">ROMA / B2B</span>
            <h3 className="display">{t.form.success}</h3>
            <pre>{requestText}</pre>
            <div className="request-actions">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.form.open}<Arrow /></a>
              <button type="button" onClick={copyRequest}>{copied ? t.form.copied : t.form.copy}</button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-call">
          <p>{t.footer.prefer}</p>
          <h2 className="display">{t.footer.heading[0]}<br /><em>{t.footer.heading[1]}</em></h2>
          <div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.footer.whatsapp}<Arrow /></a>
            <a href="#quote">{t.footer.phone}<Arrow /></a>
          </div>
        </div>
        <div className="footer-word display">ROMA</div>
        <div className="footer-bottom">
          <span>{t.footer.descriptor}</span>
          <span>© {new Date().getFullYear()} Roma Fruits Secs</span>
          <span>{t.footer.country}</span>
          <LanguageSwitch lang={lang} onChange={changeLanguage} compact />
        </div>
      </footer>

      <div className="mobile-contact-bar">
        <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.footer.whatsapp}</a>
        <a href="#quote">{t.nav.quote}</a>
      </div>
    </main>
  );
}
