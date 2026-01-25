/* -------------------------------------------------------
   Meta Tag Generator — Vanilla JS
   - Live preview + live counts
   - Omit empty tags
   - Pretty/minify output
   - Copy + download + fill example + reset
-------------------------------------------------------- */

(() => {
  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);

  const safe = (v) => (v ?? "").toString().trim();
  const escAttr = (s) =>
    safe(s)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  const setPill = (text, tone = "neutral") => {
    const pill = $("statusPill");
    pill.textContent = text;

    // Subtle tone styling without extra CSS complexity
    const map = {
      neutral: "rgba(255,255,255,.06)",
      good: "rgba(52,211,153,.12)",
      warn: "rgba(251,191,36,.12)",
      bad: "rgba(251,113,133,.12)"
    };
    const border = {
      neutral: "rgba(255,255,255,.14)",
      good: "rgba(52,211,153,.30)",
      warn: "rgba(251,191,36,.30)",
      bad: "rgba(251,113,133,.30)"
    };
    pill.style.background = map[tone] || map.neutral;
    pill.style.borderColor = border[tone] || border.neutral;

    clearTimeout(setPill._t);
    setPill._t = setTimeout(() => {
      pill.textContent = "Ready";
      pill.style.background = "rgba(255,255,255,.06)";
      pill.style.borderColor = "rgba(255,255,255,.14)";
    }, 1600);
  };

  const toLocaleFromLang = (lang) => {
    // Basic mapping. You can expand later.
    const l = safe(lang).toLowerCase();
    const map = {
      en: "en_US",
      en-us: "en_US",
      en-ca: "en_CA",
      en-gb: "en_GB",
      fr: "fr_FR",
      fr-ca: "fr_CA",
      es: "es_ES",
      de: "de_DE",
      it: "it_IT",
      pt: "pt_PT",
      pt-br: "pt_BR",
      nl: "nl_NL"
    };
    return map[l] || "";
  };

  const domainFromUrl = (url) => {
    try {
      const u = new URL(url);
      return u.hostname.replace(/^www\./i, "");
    } catch {
      return "example.com";
    }
  };

  const normalizeHandle = (h) => {
    const v = safe(h);
    if (!v) return "";
    return v.startsWith("@") ? v : "@" + v;
  };

  // ---------- Elements ----------
  const els = {
    title: $("title"),
    canonical: $("canonical"),
    description: $("description"),
    keywords: $("keywords"),
    robots: $("robots"),
    themeColor: $("themeColor"),
    lang: $("lang"),

    ogType: $("ogType"),
    ogLocale: $("ogLocale"),
    ogImage: $("ogImage"),
    ogImageAlt: $("ogImageAlt"),
    siteName: $("siteName"),

    twCard: $("twCard"),
    twSite: $("twSite"),
    twCreator: $("twCreator"),
    favicon: $("favicon"),

    addCharset: $("addCharset"),
    addViewport: $("addViewport"),

    countTitle: $("countTitle"),
    countDesc: $("countDesc"),

    out: $("out"),

    prevThumb: $("prevThumb"),
    prevDomain: $("prevDomain"),
    prevTitle: $("prevTitle"),
    prevDesc: $("prevDesc"),

    btnFill: $("btnFill"),
    btnReset: $("btnReset"),
    btnCopy: $("btnCopy"),
    btnMinify: $("btnMinify"),
    btnPretty: $("btnPretty"),
    btnDownload: $("btnDownload")
  };

  // ---------- State ----------
  let mode = "pretty"; // or "minify"

  // ---------- Generator ----------
  const buildTags = () => {
    const title = safe(els.title.value);
    const canonical = safe(els.canonical.value);
    const description = safe(els.description.value);
    const keywords = safe(els.keywords.value);
    const robots = safe(els.robots.value);
    const themeColor = safe(els.themeColor.value);
    const lang = safe(els.lang.value);

    const ogType = safe(els.ogType.value);
    const ogLocaleInput = safe(els.ogLocale.value);
    const ogLocale = ogLocaleInput || toLocaleFromLang(lang);

    const ogImage = safe(els.ogImage.value);
    const ogImageAlt = safe(els.ogImageAlt.value);
    const siteName = safe(els.siteName.value);

    const twCard = safe(els.twCard.value);
    const twSite = normalizeHandle(els.twSite.value);
    const twCreator = normalizeHandle(els.twCreator.value);
    const favicon = safe(els.favicon.value);

    const addCharset = !!els.addCharset.checked;
    const addViewport = !!els.addViewport.checked;

    // Output lines (raw, pretty)
    const L = [];

    // Core
    if (addCharset) L.push(`<meta charset="UTF-8">`);
    if (addViewport) L.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    if (description) L.push(`<meta name="description" content="${escAttr(description)}">`);
    if (keywords) L.push(`<meta name="keywords" content="${escAttr(keywords)}">`);
    if (robots) L.push(`<meta name="robots" content="${escAttr(robots)}">`);
    if (themeColor) L.push(`<meta name="theme-color" content="${escAttr(themeColor)}">`);
    if (canonical) L.push(`<link rel="canonical" href="${escAttr(canonical)}">`);
    if (favicon) L.push(`<link rel="icon" href="${escAttr(favicon)}">`);

    // Title
    // Note: <title> is not "meta", but included because users want the full head snippet.
    // Put it near the top in pretty mode.
    if (title) {
      // We’ll insert <title> after charset/viewport if present
      const titleTag = `<title>${escAttr(title)}</title>`;
      const insertAt = Math.min(L.length, (addCharset ? 1 : 0) + (addViewport ? 1 : 0));
      L.splice(insertAt, 0, titleTag);
    }

    // Open Graph
    // Only include OG block if user has *any* OG-ish signal.
    const hasOG = !!(title || description || canonical || ogImage || siteName || ogLocale || ogType);
    if (hasOG) {
      // spacer line (pretty only)
      if (mode === "pretty" && L.length) L.push(``);
      if (canonical) L.push(`<meta property="og:url" content="${escAttr(canonical)}">`);
      if (ogType) L.push(`<meta property="og:type" content="${escAttr(ogType)}">`);
      if (title) L.push(`<meta property="og:title" content="${escAttr(title)}">`);
      if (description) L.push(`<meta property="og:description" content="${escAttr(description)}">`);
      if (siteName) L.push(`<meta property="og:site_name" content="${escAttr(siteName)}">`);
      if (ogLocale) L.push(`<meta property="og:locale" content="${escAttr(ogLocale)}">`);
      if (ogImage) L.push(`<meta property="og:image" content="${escAttr(ogImage)}">`);
      if (ogImageAlt) L.push(`<meta property="og:image:alt" content="${escAttr(ogImageAlt)}">`);
    }

    // Twitter
    const hasTW = !!(title || description || ogImage || twSite || twCreator || twCard);
    if (hasTW) {
      if (mode === "pretty" && L.length) L.push(``);
      if (twCard) L.push(`<meta name="twitter:card" content="${escAttr(twCard)}">`);
      if (twSite) L.push(`<meta name="twitter:site" content="${escAttr(twSite)}">`);
      if (twCreator) L.push(`<meta name="twitter:creator" content="${escAttr(twCreator)}">`);
      if (title) L.push(`<meta name="twitter:title" content="${escAttr(title)}">`);
      if (description) L.push(`<meta name="twitter:description" content="${escAttr(description)}">`);
      if (ogImage) L.push(`<meta name="twitter:image" content="${escAttr(ogImage)}">`);
      if (ogImageAlt) L.push(`<meta name="twitter:image:alt" content="${escAttr(ogImageAlt)}">`);
    }

    // Final string formatting
    const pretty = L.join("\n").trim();
    const minified = pretty
      .replace(/\n\s*\n/g, "\n") // collapse double blanks
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean)
      .join("");

    return { pretty, minified };
  };

  const updatePreview = () => {
    const title = safe(els.title.value) || "Your title appears here";
    const description = safe(els.description.value) || "Your description appears here";
    const canonical = safe(els.canonical.value);
    const siteName = safe(els.siteName.value);
    const ogImage = safe(els.ogImage.value);

    const domain = canonical ? domainFromUrl(canonical) : "example.com";
    els.prevDomain.textContent = domain;
    els.prevTitle.textContent = siteName ? `${title} — ${siteName}` : title;
    els.prevDesc.textContent = description;

    // Thumb: show image if valid URL, otherwise placeholder.
    if (ogImage) {
      els.prevThumb.style.backgroundImage = `url("${ogImage}")`;
      els.prevThumb.style.backgroundSize = "cover";
      els.prevThumb.style.backgroundPosition = "center";
      els.prevThumb.style.backgroundRepeat = "no-repeat";
      const txt = els.prevThumb.querySelector(".thumbText");
      if (txt) txt.style.display = "none";
    } else {
      els.prevThumb.style.backgroundImage = "";
      els.prevThumb.style.backgroundSize = "";
      els.prevThumb.style.backgroundPosition = "";
      els.prevThumb.style.backgroundRepeat = "";
      const txt = els.prevThumb.querySelector(".thumbText");
      if (txt) txt.style.display = "inline-block";
    }
  };

  const updateCounts = () => {
    els.countTitle.textContent = String(safe(els.title.value).length);
    els.countDesc.textContent = String(safe(els.description.value).length);
  };

  const render = () => {
    updateCounts();

    const { pretty, minified } = buildTags();
    const outStr = mode === "minify" ? minified : pretty;

    els.out.textContent = outStr || `<!-- Fill out the inputs to generate meta tags -->`;

    updatePreview();
  };

  // ---------- Actions ----------
  const fillExample = () => {
    els.title.value = "Eddie’s ToolHub — Meta Tag Generator";
    els.canonical.value = "https://eddietoolhub.com/meta-tag-generator";
    els.description.value =
      "Generate SEO, Open Graph, and Twitter meta tags instantly with a live share preview. Clean output. GitHub Pages ready.";
    els.keywords.value = "meta tags, seo, open graph, twitter cards, generator, html head";
    els.robots.value = "index,follow";
    els.themeColor.value = "#7dd3fc";
    els.lang.value = "en";

    els.ogType.value = "website";
    els.ogLocale.value = ""; // auto-map
    els.ogImage.value = "https://eddietoolhub.com/assets/og/meta-generator-1200x630.jpg";
    els.ogImageAlt.value = "Glassmorphic Meta Tag Generator preview card";
    els.siteName.value = "Eddie’s ToolHub";

    els.twCard.value = "summary_large_image";
    els.twSite.value = "@EddiesToolHub";
    els.twCreator.value = "@EddiePickard";
    els.favicon.value = "https://eddietoolhub.com/favicon.ico";

    els.addCharset.checked = true;
    els.addViewport.checked = true;

    setPill("Example filled", "good");
    render();
  };

  const resetAll = () => {
    // Reset inputs to initial state
    els.title.value = "";
    els.canonical.value = "";
    els.description.value = "";
    els.keywords.value = "";
    els.robots.value = "index,follow";
    els.themeColor.value = "#7dd3fc";
    els.lang.value = "en";

    els.ogType.value = "website";
    els.ogLocale.value = "";
    els.ogImage.value = "";
    els.ogImageAlt.value = "";
    els.siteName.value = "";

    els.twCard.value = "summary_large_image";
    els.twSite.value = "";
    els.twCreator.value = "";
    els.favicon.value = "";

    els.addCharset.checked = true;
    els.addViewport.checked = true;

    mode = "pretty";
    setPill("Reset", "neutral");
    render();
  };

  const copyCode = async () => {
    const text = els.out.textContent || "";
    if (!text || text.includes("Fill out the inputs")) {
      setPill("Nothing to copy", "warn");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setPill("Copied!", "good");
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setPill("Copied!", "good");
      } catch {
        setPill("Copy failed", "bad");
      }
      document.body.removeChild(ta);
    }
  };

  const downloadTxt = (e) => {
    e.preventDefault();
    const text = els.out.textContent || "";
    if (!text || text.includes("Fill out the inputs")) {
      setPill("Nothing to download", "warn");
      return;
    }
    const blob = new Blob([text + "\n"], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meta-tags.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setPill("Downloaded", "good");
  };

  // ---------- Wire Events ----------
  const watchIds = [
    "title","canonical","description","keywords","robots","themeColor","lang",
    "ogType","ogLocale","ogImage","ogImageAlt","siteName",
    "twCard","twSite","twCreator","favicon",
    "addCharset","addViewport"
  ];

  watchIds.forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  els.btnFill.addEventListener("click", fillExample);
  els.btnReset.addEventListener("click", resetAll);
  els.btnCopy.addEventListener("click", copyCode);

  els.btnMinify.addEventListener("click", () => {
    mode = "minify";
    setPill("Minified", "neutral");
    render();
  });

  els.btnPretty.addEventListener("click", () => {
    mode = "pretty";
    setPill("Pretty format", "neutral");
    render();
  });

  els.btnDownload.addEventListener("click", downloadTxt);

  // ---------- Init ----------
  render();
})();
