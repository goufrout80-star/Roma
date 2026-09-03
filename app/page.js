"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const productAssets = [
  {
    key: "almonds",
    id: "01",
    image: "https://images.pexels.com/photos/9811631/pexels-photo-9811631.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tone: "almond",
  },
  {
    key: "cashews",
    id: "02",
    image: "https://images.pexels.com/photos/18876240/pexels-photo-18876240.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tone: "cashew",
  },
  {
    key: "pistachios",
    id: "03",
    image: "https://images.pexels.com/photos/6086412/pexels-photo-6086412.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tone: "pistachio",
  },
  {
    key: "dates",
    id: "04",
    image: "https://images.pexels.com/photos/15913423/pexels-photo-15913423.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tone: "date",
  },
  {
    key: "walnuts",
    id: "05",
    image: "https://images.pexels.com/photos/10111741/pexels-photo-10111741.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tone: "walnut",
  },
  {
    key: "raisins",
    id: "06",
    image: "https://images.pexels.com/photos/6085951/pexels-photo-6085951.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tone: "raisin",
  },
  {
    key: "peanuts",
    id: "07",
    image: "https://images.pexels.com/photos/4590484/pexels-photo-4590484.jpeg?auto=compress&cs=tinysrgb&w=1800",
    tone: "peanut",
  },
];

const copy = {
  en: {
    code: "EN",
    dir: "ltr",
    nav: { products: "Products", supply: "Supply", about: "About", contact: "Contact", quote: "Request a quote" },
    hero: {
      kicker: "WHOLESALE · DRIED FRUITS · NUTS",
      lines: ["SELECTED BY", "ORIGIN.", "SUPPLIED FOR", "BUSINESS."],
      intro: "Roma Fruits Secs supplies dried fruits and nuts to professional buyers with a clear focus on dependable service and direct business relationships.",
      explore: "Explore",
      badge: "B2B SUPPLY",
    },
    serve: {
      eyebrow: "WHO WE SERVE / 01",
      title: ["BUILT FOR THE", "BUSINESSES THAT", "SERVE EVERY DAY."],
      audiences: ["GROCERY", "BAKERY", "CAFÉ", "RESTAURANT", "HOSPITALITY", "RESELLER"],
    },
    product: {
      eyebrow: "PRODUCTS",
      range: "WHOLESALE RANGE",
      availability: "Ask about availability",
      selected: "Selected product",
      names: {
        almonds: "ALMONDS",
        cashews: "CASHEWS",
        pistachios: "PISTACHIOS",
        dates: "DATES",
        walnuts: "WALNUTS",
        raisins: "RAISINS",
        peanuts: "PEANUTS",
      },
      descriptions: {
        almonds: "Selected for consistency, texture and dependable wholesale supply.",
        cashews: "A versatile staple for retailers, bakeries, cafés and hospitality.",
        pistachios: "Distinctive character and professional-ready quantities.",
        dates: "Naturally rich produce selected for professional demand.",
        walnuts: "A trusted everyday category for food businesses and resellers.",
        raisins: "A practical dried-fruit staple for bakery, retail and food service.",
        peanuts: "Flexible wholesale supply for retail, hospitality and food production.",
      },
    },
    standard: {
      eyebrow: "THE ROMA STANDARD / 02",
      title: ["SUPPLY, WITHOUT", "THE NOISE."],
      intro: "A straightforward wholesale relationship: tell us what you need, receive current availability and pricing, then confirm directly with our team.",
      items: [
        ["PROFESSIONAL QUANTITIES", "Built around business demand rather than consumer baskets."],
        ["SELECTED RANGE", "A focused mix of dried fruits and nuts for professional buyers."],
        ["RESPONSIVE SUPPLY", "Availability and quote information shared directly with your business."],
        ["LOCAL RELATIONSHIPS", "A human, direct approach to recurring supply and enquiries."],
      ],
    },
    process: {
      eyebrow: "HOW IT WORKS / 03",
      steps: [
        ["REQUEST", "Tell us the products and quantities you need."],
        ["QUOTE", "Receive availability, pricing and delivery information."],
        ["SUPPLY", "Confirm your order directly with the Roma team."],
      ],
    },
    about: {
      eyebrow: "ROMA / 04",
      title: ["SIMPLE SUPPLY.", "SERIOUS SERVICE."],
      copy: "Roma Fruits Secs is built around a simple idea: make wholesale sourcing of dried fruits and nuts clearer, faster and easier for local professional buyers.",
      link: "Start an enquiry",
      note: "FROM ORIGIN TO BUSINESS",
    },
    form: {
      eyebrow: "ENQUIRY / 05",
      title: ["WHAT DO", "YOU NEED?"],
      products: "01 — Select products",
      quantity: "02 — Estimated quantity",
      city: "03 — Delivery city",
      business: "04 — Business name",
      contact: "05 — WhatsApp or phone",
      message: "06 — Extra details",
      cityPlaceholder: "Your city",
      businessPlaceholder: "Company / shop",
      contactPlaceholder: "+212...",
      messagePlaceholder: "Grade, packaging, timing, or anything else we should know...",
      choose: "Select range",
      quantities: ["Under 10 kg", "10–50 kg", "50–100 kg", "100 kg+", "Not sure yet"],
      privacy: "Prototype enquiry: no data is stored on a server. The request is prepared for WhatsApp.",
      submit: "PREPARE REQUEST",
      missing: "Please select at least one product and add your contact details.",
      success: "Your wholesale request is ready.",
      open: "OPEN WHATSAPP",
      copy: "COPY REQUEST",
      copied: "Copied",
      close: "Close",
    },
    footer: {
      prefer: "Prefer a direct conversation?",
      whatsapp: "WHATSAPP",
      phone: "PHONE",
      descriptor: "Wholesale dried fruits & nuts",
      country: "Morocco",
      prototype: "Prototype photography: Pexels + Unsplash",
    },
  },
  fr: {
    code: "FR",
    dir: "ltr",
    nav: { products: "Produits", supply: "Approvisionnement", about: "À propos", contact: "Contact", quote: "Demander un devis" },
    hero: {
      kicker: "GROSSISTE · FRUITS SECS · NOIX",
      lines: ["SÉLECTIONNÉS", "À LA SOURCE.", "FOURNIS POUR", "LES PROS."],
      intro: "Roma Fruits Secs fournit des fruits secs et des noix aux professionnels, avec un service direct, réactif et adapté aux besoins du commerce.",
      explore: "Découvrir",
      badge: "FOURNITURE B2B",
    },
    serve: {
      eyebrow: "NOS CLIENTS / 01",
      title: ["PENSÉ POUR", "LES PROFESSIONNELS", "AU QUOTIDIEN."],
      audiences: ["ÉPICERIES", "BOULANGERIES", "CAFÉS", "RESTAURANTS", "HÔTELLERIE", "REVENDEURS"],
    },
    product: {
      eyebrow: "PRODUITS",
      range: "GAMME PROFESSIONNELLE",
      availability: "Demander la disponibilité",
      selected: "Produit sélectionné",
      names: {
        almonds: "AMANDES",
        cashews: "NOIX DE CAJOU",
        pistachios: "PISTACHES",
        dates: "DATTES",
        walnuts: "NOIX",
        raisins: "RAISINS SECS",
        peanuts: "CACAHUÈTES",
      },
      descriptions: {
        almonds: "Sélectionnées pour leur régularité, leur texture et un approvisionnement fiable.",
        cashews: "Un essentiel polyvalent pour commerces, boulangeries, cafés et hôtellerie.",
        pistachios: "Un produit de caractère disponible en quantités adaptées aux professionnels.",
        dates: "Un fruit naturellement riche, sélectionné pour les besoins professionnels.",
        walnuts: "Une catégorie incontournable pour les métiers de bouche et la revente.",
        raisins: "Un classique pratique pour la boulangerie, le commerce et la restauration.",
        peanuts: "Une offre flexible pour le retail, l’hôtellerie et la transformation.",
      },
    },
    standard: {
      eyebrow: "LE STANDARD ROMA / 02",
      title: ["L'APPROVISIONNEMENT,", "SANS COMPLICATION."],
      intro: "Une relation grossiste simple : indiquez vos besoins, recevez les disponibilités et le prix du moment, puis confirmez directement avec notre équipe.",
      items: [
        ["QUANTITÉS PRO", "Une offre pensée pour la demande professionnelle, pas pour le panier consommateur."],
        ["GAMME SÉLECTIONNÉE", "Un assortiment ciblé de fruits secs et de noix pour les professionnels."],
        ["RÉPONSE RAPIDE", "Disponibilités et devis communiqués directement à votre entreprise."],
        ["RELATION DIRECTE", "Une approche humaine et simple pour les demandes et commandes récurrentes."],
      ],
    },
    process: {
      eyebrow: "COMMENT ÇA MARCHE / 03",
      steps: [
        ["DEMANDE", "Indiquez-nous les produits et quantités recherchés."],
        ["DEVIS", "Recevez disponibilité, prix et informations de livraison."],
        ["FOURNITURE", "Confirmez la commande directement avec l’équipe Roma."],
      ],
    },
    about: {
      eyebrow: "ROMA / 04",
      title: ["APPROVISIONNEMENT SIMPLE.", "SERVICE SÉRIEUX."],
      copy: "Roma Fruits Secs part d’une idée simple : rendre l’achat en gros de fruits secs et de noix plus clair, plus rapide et plus facile pour les professionnels locaux.",
      link: "Faire une demande",
      note: "DE LA SOURCE À VOTRE ACTIVITÉ",
    },
    form: {
      eyebrow: "DEMANDE / 05",
      title: ["DE QUOI", "AVEZ-VOUS BESOIN ?"],
      products: "01 — Choisissez les produits",
      quantity: "02 — Quantité estimée",
      city: "03 — Ville de livraison",
      business: "04 — Nom de l’entreprise",
      contact: "05 — WhatsApp ou téléphone",
      message: "06 — Détails complémentaires",
      cityPlaceholder: "Votre ville",
      businessPlaceholder: "Entreprise / commerce",
      contactPlaceholder: "+212...",
      messagePlaceholder: "Grade, emballage, délai ou autre information utile...",
      choose: "Choisir une tranche",
      quantities: ["Moins de 10 kg", "10–50 kg", "50–100 kg", "100 kg+", "Pas encore sûr"],
      privacy: "Demande de démonstration : aucune donnée n’est enregistrée. Le message est préparé pour WhatsApp.",
      submit: "PRÉPARER LA DEMANDE",
      missing: "Choisissez au moins un produit et ajoutez vos coordonnées.",
      success: "Votre demande grossiste est prête.",
      open: "OUVRIR WHATSAPP",
      copy: "COPIER LA DEMANDE",
      copied: "Copié",
      close: "Fermer",
    },
    footer: {
      prefer: "Vous préférez un échange direct ?",
      whatsapp: "WHATSAPP",
      phone: "TÉLÉPHONE",
      descriptor: "Grossiste en fruits secs & noix",
      country: "Maroc",
      prototype: "Photos de prototype : Pexels + Unsplash",
    },
  },
  ar: {
    code: "ع",
    dir: "rtl",
    nav: { products: "المنتجات", supply: "التوريد", about: "من نحن", contact: "تواصل", quote: "اطلب عرض سعر" },
    hero: {
      kicker: "توريد بالجملة · فواكه مجففة · مكسرات",
      lines: ["مختارة من", "المصدر.", "مُورَّدة", "للمحترفين."],
      intro: "توفّر Roma Fruits Secs الفواكه المجففة والمكسرات للمهنيين، بخدمة مباشرة ومرنة تناسب احتياجات المتاجر والمقاهي والمطاعم والموزعين.",
      explore: "اكتشف",
      badge: "توريد للشركات",
    },
    serve: {
      eyebrow: "لمن نوفّر / 01",
      title: ["توريد مصمم", "للمهنيين", "كل يوم."],
      audiences: ["البقالات والمتاجر", "المخابز والحلويات", "المقاهي", "المطاعم", "الفنادق والضيافة", "الموزعون والبائعون"],
    },
    product: {
      eyebrow: "المنتجات",
      range: "تشكيلة بالجملة",
      availability: "اسأل عن التوفر",
      selected: "المنتج المختار",
      names: {
        almonds: "اللوز",
        cashews: "الكاجو",
        pistachios: "الفستق",
        dates: "التمور",
        walnuts: "الجوز",
        raisins: "الزبيب",
        peanuts: "الفول السوداني",
      },
      descriptions: {
        almonds: "مختار لتحقيق ثبات في الجودة والملمس وتوريد يعتمد عليه.",
        cashews: "منتج أساسي مرن للمتاجر والمخابز والمقاهي والضيافة.",
        pistachios: "منتج مميز بكميات مناسبة لاحتياجات المهنيين.",
        dates: "تمور غنية بطبيعتها ومختارة لتلبية الطلب المهني.",
        walnuts: "فئة أساسية لأعمال الأغذية وإعادة البيع.",
        raisins: "منتج عملي للمخابز والمتاجر وخدمات الطعام.",
        peanuts: "توريد مرن للمتاجر والضيافة والإنتاج الغذائي.",
      },
    },
    standard: {
      eyebrow: "معيار ROMA / 02",
      title: ["توريد واضح،", "بدون تعقيد."],
      intro: "علاقة توريد مباشرة وبسيطة: أخبرنا بما تحتاجه، واستلم معلومات التوفر والسعر والتوصيل، ثم أكّد طلبك مباشرة مع فريقنا.",
      items: [
        ["كميات مهنية", "عرض مخصص لاحتياجات الأعمال وليس لسلة المستهلك الفردي."],
        ["تشكيلة مختارة", "مجموعة مركزة من الفواكه المجففة والمكسرات للمهنيين."],
        ["استجابة مباشرة", "معلومات التوفر وعروض الأسعار تصل مباشرة إلى نشاطك."],
        ["علاقة محلية", "تواصل إنساني مباشر للطلبات المتكررة والاستفسارات."],
      ],
    },
    process: {
      eyebrow: "كيف يتم الطلب / 03",
      steps: [
        ["اطلب", "أخبرنا بالمنتجات والكميات التي تحتاجها."],
        ["استلم العرض", "احصل على التوفر والسعر ومعلومات التوصيل."],
        ["أكّد التوريد", "أكّد طلبك مباشرة مع فريق Roma."],
      ],
    },
    about: {
      eyebrow: "ROMA / 04",
      title: ["توريد بسيط.", "خدمة جدية."],
      copy: "تقوم Roma Fruits Secs على فكرة واضحة: جعل شراء الفواكه المجففة والمكسرات بالجملة أسهل وأسرع وأكثر وضوحاً للمهنيين المحليين.",
      link: "ابدأ طلبك",
      note: "من المصدر إلى نشاطك",
    },
    form: {
      eyebrow: "طلب توريد / 05",
      title: ["ماذا", "تحتاج؟"],
      products: "01 — اختر المنتجات",
      quantity: "02 — الكمية التقريبية",
      city: "03 — مدينة التوصيل",
      business: "04 — اسم النشاط",
      contact: "05 — واتساب أو الهاتف",
      message: "06 — تفاصيل إضافية",
      cityPlaceholder: "مدينتك",
      businessPlaceholder: "الشركة / المتجر",
      contactPlaceholder: "+212...",
      messagePlaceholder: "الدرجة، التغليف، الموعد أو أي تفاصيل أخرى...",
      choose: "اختر الكمية",
      quantities: ["أقل من 10 كلغ", "10–50 كلغ", "50–100 كلغ", "+100 كلغ", "غير محدد بعد"],
      privacy: "هذه نسخة تجريبية: لا يتم حفظ أي بيانات على الخادم. يتم تجهيز الطلب لإرساله عبر واتساب.",
      submit: "جهّز الطلب",
      missing: "اختر منتجاً واحداً على الأقل وأدخل وسيلة التواصل.",
      success: "طلبك بالجملة جاهز.",
      open: "افتح واتساب",
      copy: "انسخ الطلب",
      copied: "تم النسخ",
      close: "إغلاق",
    },
    footer: {
      prefer: "تفضّل التواصل المباشر؟",
      whatsapp: "واتساب",
      phone: "الهاتف",
      descriptor: "توريد الفواكه المجففة والمكسرات بالجملة",
      country: "المغرب",
      prototype: "صور النسخة التجريبية: Pexels + Unsplash",
    },
  },
};

function RomaMark() {
  return (
    <svg className="roma-mark" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 34V14h8.1c5.6 0 9 2.8 9 7.5 0 3.3-1.8 5.7-5 6.8L35 34h-5.7l-5-5.1h-2.2V34H17Zm5.1-9.4h2.7c2.7 0 4.2-1 4.2-3s-1.5-3-4.2-3h-2.7v6Z" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SourceCurve() {
  return (
    <svg className="source-curve" viewBox="0 0 700 260" fill="none" aria-hidden="true">
      <path d="M18 217C127 71 253 50 354 139c86 76 169 64 326-92" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 9" />
      <circle cx="18" cy="217" r="6" fill="currentColor" />
      <circle cx="680" cy="47" r="6" fill="currentColor" />
    </svg>
  );
}

function LanguageSwitch({ lang, setLang, compact = false }) {
  return (
    <div className={"language-switch " + (compact ? "language-switch--compact" : "")} aria-label="Language">
      {["en", "fr", "ar"].map((key) => (
        <button
          type="button"
          key={key}
          onClick={() => setLang(key)}
          className={lang === key ? "active" : ""}
          aria-pressed={lang === key}
        >
          {copy[key].code}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);
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
      productAssets.map((product) => ({
        ...product,
        name: t.product.names[product.key],
        description: t.product.descriptions[product.key],
      })),
    [t]
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("roma-language");
    if (stored && copy[stored]) setLang(stored);
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
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("pointermove", move);
      observer.disconnect();
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

  const selectProduct = (key) => {
    setSelectedProducts((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  };

  const askForProduct = (key) => {
    setSelectedProducts((current) => (current.includes(key) ? current : [...current, key]));
    document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToProduct = (index) => {
    const el = productRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1);
    const target = sectionTop + (scrollable * index) / Math.max(products.length - 1, 1);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const buildRequest = () => {
    const labels = selectedProducts.map((key) => t.product.names[key]).join(", ");
    return [
      "ROMA FRUITS SECS — WHOLESALE ENQUIRY",
      "",
      `${t.form.products.replace("01 — ", "")}: ${labels || "—"}`,
      `${t.form.quantity.replace("02 — ", "")}: ${form.quantity || "—"}`,
      `${t.form.city.replace("03 — ", "")}: ${form.city || "—"}`,
      `${t.form.business.replace("04 — ", "")}: ${form.business || "—"}`,
      `${t.form.contact.replace("05 — ", "")}: ${form.contact || "—"}`,
      `${t.form.message.replace("06 — ", "")}: ${form.message || "—"}`,
    ].join("\n");
  };

  const submitRequest = (e) => {
    e.preventDefault();
    setFormError("");
    if (!selectedProducts.length || !form.contact.trim()) {
      setFormError(t.form.missing);
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

  const whatsappUrl = requestText
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(requestText)}`
    : "#quote";

  return (
    <main className={isRTL ? "site site--rtl" : "site"} dir={t.dir}>
      <div
        className={"cursor " + (cursorActive ? "cursor--active" : "")}
        style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}
      />

      <header className="nav">
        <a className="brand" href="#top" aria-label="Roma home">
          <RomaMark />
          <span className="brand-word">ROMA</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#products">{t.nav.products}</a>
          <a href="#standard">{t.nav.supply}</a>
          <a href="#about">{t.nav.about}</a>
        </nav>

        <div className="nav-actions">
          <LanguageSwitch lang={lang} setLang={setLang} />
          <a className="quote-pill" href="#quote">
            {t.nav.quote} <Arrow />
          </a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-panel">
          <div className="menu-head">
            <div className="brand brand--menu"><RomaMark /><span>ROMA</span></div>
            <button className="menu-close" onClick={() => setMenuOpen(false)}>{t.form.close}</button>
          </div>
          <LanguageSwitch lang={lang} setLang={setLang} compact />
          <div className="menu-word">ROMA</div>
          <nav>
            <a href="#products" onClick={() => setMenuOpen(false)}>{t.nav.products}<span>01</span></a>
            <a href="#standard" onClick={() => setMenuOpen(false)}>{t.nav.supply}<span>02</span></a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t.nav.about}<span>03</span></a>
            <a href="#quote" onClick={() => setMenuOpen(false)}>{t.nav.contact}<span>04</span></a>
          </nav>
        </div>
      )}

      <section className="hero" id="top">
        <div className="hero-grain" />
        <div className="hero-kicker">{t.hero.kicker}</div>
        <div className="hero-badge"><span />{t.hero.badge}</div>

        <div className="hero-copy">
          <h1 className="display">
            <span className="hero-line">{t.hero.lines[0]}</span>
            <span className="hero-line hero-line--indent">{t.hero.lines[1]}</span>
            <span className="hero-line">{t.hero.lines[2]}</span>
            <span className="hero-line hero-line--indent2">{t.hero.lines[3]}</span>
          </h1>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <SourceCurve />
          <figure className="hero-product hero-product--main">
            <img src={productAssets[0].image} alt="" />
            <figcaption>01 / {t.product.names.almonds}</figcaption>
          </figure>
          <figure className="hero-product hero-product--small">
            <img src={productAssets[2].image} alt="" />
          </figure>
          <figure className="hero-product hero-product--tiny">
            <img src={productAssets[3].image} alt="" />
          </figure>
        </div>

        <div className="hero-bottom">
          <p>{t.hero.intro}</p>
          <a href="#products" className="round-link" aria-label={t.hero.explore}>
            <span>{t.hero.explore}</span>
            <Arrow />
          </a>
        </div>
      </section>

      <section className="origin-strip" aria-label={t.about.note}>
        <div>
          <span>{t.about.note}</span><i>✦</i><span>{t.about.note}</span><i>✦</i><span>{t.about.note}</span><i>✦</i>
        </div>
      </section>

      <section className="statement section-pad">
        <div className="eyebrow" data-reveal>{t.serve.eyebrow}</div>
        <h2 className="display" data-reveal>
          {t.serve.title[0]}<br />{t.serve.title[1]}<br /><em>{t.serve.title[2]}</em>
        </h2>
        <div className="audience-list" data-reveal>
          {t.serve.audiences.map((item, i) => (
            <div
              className="audience-row"
              key={item}
              onPointerEnter={() => setCursorActive(true)}
              onPointerLeave={() => setCursorActive(false)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong className="display">{item}</strong>
              <Arrow />
            </div>
          ))}
        </div>
      </section>

      <section
        className="products-scroll"
        id="products"
        ref={productRef}
        style={{ height: `${products.length * 100}vh` }}
      >
        <div className="products-sticky">
          <div className={`product-stage product-stage--${products[activeProduct].tone}`}>
            <div className="product-topline">
              <span>{t.product.eyebrow} / {products[activeProduct].id}</span>
              <span>{t.product.range}</span>
            </div>

            <div className="product-name-wrap">
              <span className="product-number">{products[activeProduct].id}</span>
              <h2 className="display" key={lang + products[activeProduct].name}>{products[activeProduct].name}</h2>
            </div>

            <div className="product-image-shell" key={products[activeProduct].image}>
              <img src={products[activeProduct].image} alt={products[activeProduct].name} />
            </div>

            <div className="product-meta">
              <p>{products[activeProduct].description}</p>
              <button type="button" onClick={() => askForProduct(products[activeProduct].key)}>
                {t.product.availability} <Arrow />
              </button>
            </div>

            <div className="product-dots">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  className={i === activeProduct ? "active" : ""}
                  onClick={() => goToProduct(i)}
                  aria-label={p.name}
                >
                  <span>{p.id}</span>
                </button>
              ))}
            </div>

            <div className="product-index-label">{activeProduct + 1} / {products.length}</div>
          </div>
        </div>
      </section>

      <section className="standard section-pad" id="standard">
        <div className="eyebrow eyebrow--light" data-reveal>{t.standard.eyebrow}</div>
        <div className="standard-intro" data-reveal>
          <h2 className="display">{t.standard.title[0]}<br /><em>{t.standard.title[1]}</em></h2>
          <p>{t.standard.intro}</p>
        </div>

        <div className="standard-grid">
          {t.standard.items.map(([title, body], index) => (
            <article className="standard-card" key={title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3 className="display">{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-pad">
        <div className="eyebrow" data-reveal>{t.process.eyebrow}</div>
        <div className="process-line">
          {t.process.steps.map(([title, body], index) => (
            <div className="process-step" key={title} data-reveal>
              <span className="process-num">{String(index + 1).padStart(2, "0")}</span>
              <div className="process-marker" />
              <h3 className="display">{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1771871394540-1612e4681edc?auto=format&fit=crop&w=2200&q=88"
            alt=""
          />
          <div className="about-image-label">ROMA / SOURCE / 2026</div>
        </div>
        <div className="about-copy">
          <div className="eyebrow eyebrow--light" data-reveal>{t.about.eyebrow}</div>
          <h2 className="display" data-reveal>{t.about.title[0]}<br /><em>{t.about.title[1]}</em></h2>
          <p data-reveal>{t.about.copy}</p>
          <a href="#quote" data-reveal>{t.about.link} <Arrow /></a>
        </div>
      </section>

      <section className="quote section-pad" id="quote">
        <div className="quote-head">
          <div className="eyebrow" data-reveal>{t.form.eyebrow}</div>
          <h2 className="display" data-reveal>{t.form.title[0]}<br />{t.form.title[1]}</h2>
        </div>

        <form className="quote-form" onSubmit={submitRequest}>
          <div className="form-block" data-reveal>
            <label>{t.form.products}</label>
            <div className="chips">
              {products.map((product) => (
                <button
                  type="button"
                  key={product.key}
                  className={selectedProducts.includes(product.key) ? "active" : ""}
                  onClick={() => selectProduct(product.key)}
                >
                  {product.name}
                  {selectedProducts.includes(product.key) ? <span>✓</span> : null}
                </button>
              ))}
            </div>
          </div>

          <div className="form-grid" data-reveal>
            <label>
              <span>{t.form.quantity}</span>
              <select
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              >
                <option value="" disabled>{t.form.choose}</option>
                {t.form.quantities.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>{t.form.city}</span>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder={t.form.cityPlaceholder}
              />
            </label>
          </div>

          <div className="form-grid" data-reveal>
            <label>
              <span>{t.form.business}</span>
              <input
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                placeholder={t.form.businessPlaceholder}
              />
            </label>
            <label>
              <span>{t.form.contact}</span>
              <input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder={t.form.contactPlaceholder}
                inputMode="tel"
              />
            </label>
          </div>

          <div className="form-block" data-reveal>
            <label>{t.form.message}</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t.form.messagePlaceholder}
              rows={4}
            />
          </div>

          {formError ? <p className="form-error" role="alert">{formError}</p> : null}

          <div className="submit-row" data-reveal>
            <p>{t.form.privacy}</p>
            <button type="submit">{t.form.submit} <Arrow /></button>
          </div>
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
              <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.form.open} <Arrow /></a>
              <button type="button" onClick={copyRequest}>{copied ? t.form.copied : t.form.copy}</button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-top">
          <p>{t.footer.prefer}</p>
          <a href="#quote">{t.footer.whatsapp} <Arrow /></a>
          <a href="#quote">{t.footer.phone} <Arrow /></a>
        </div>
        <div className="footer-word display">ROMA</div>
        <div className="footer-bottom">
          <span>{t.footer.descriptor}</span>
          <span>© {new Date().getFullYear()} Roma Fruits Secs</span>
          <span>{t.footer.country}</span>
          <span>{t.footer.prototype}</span>
        </div>
      </footer>
    </main>
  );
}
