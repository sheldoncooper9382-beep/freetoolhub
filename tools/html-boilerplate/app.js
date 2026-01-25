(() => {
  const $ = (id) => document.getElementById(id);

  // Inputs
  const inputs = {
    pageTitle: $("pageTitle"),
    lang: $("lang"),
    description: $("description"),
    themeColor: $("themeColor"),

    metaViewport: $("metaViewport"),
    metaCharset: $("metaCharset"),
    metaDescription: $("metaDescription"),
    metaThemeColor: $("metaThemeColor"),
    metaRobots: $("metaRobots"),
    includeFavicon: $("includeFavicon"),

    includeCss: $("includeCss"),
    cssPath: $("cssPath"),
    includeJs: $("includeJs"),
    jsPath: $("jsPath"),
    includeCdnFont: $("includeCdnFont"),
    includePreconnect: $("includePreconnect"),

    includeHeaderMainFooter: $("includeHeaderMainFooter"),
    includeSkipLink: $("includeSkipLink"),
    includeNoscript: $("includeNoscript"),
    includeContainer: $("includeContainer"),
    includeInlineStyle: $("includeInlineStyle"),

    prettyIndent: $("prettyIndent"),
    includeComments: $("includeComments"),
  };

  // Outputs
  const outputCode = $("outputCode");
  const charCount = $("charCount");
  const previewFrame = $("previewFrame");

  // Buttons
  const copyHtmlBtn = $("copyHtmlBtn");
  const downloadHtmlBtn = $("downloadHtmlBtn");
  const resetBtn = $("resetBtn");

  const copyInlineBtn = $("copyInlineBtn");
  const copyPreviewBtn = $("copyPreviewBtn");
  const downloadBundleBtn = $("downloadBundleBtn");

  const refreshPreviewBtn = $("refreshPreviewBtn");
  const openPreviewBtn = $("openPreviewBtn");

  const toast = $("toast");

  // Tabs
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const codePane = $("codePane");
  const previewPane = $("previewPane");

  const DEFAULTS = {
    pageTitle: "My Website",
    lang: "en",
    description: "A modern static site.",
    themeColor: "#7dd3fc",

    metaViewport: true,
    metaCharset: true,
    metaDescription: true,
    metaThemeColor: true,
    metaRobots: false,
    includeFavicon: false,

    includeCss: true,
    cssPath: "style.css",
    includeJs: true,
    jsPath: "app.js",
    includeCdnFont: false,
    includePreconnect: false,

    includeHeaderMainFooter: true,
    includeSkipLink: true,
    includeNoscript: false,
    includeContainer: true,
    includeInlineStyle: false,

    prettyIndent: true,
    includeComments: true,
  };

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function indent(level, pretty) {
    return pretty ? "  ".repeat(level) : "";
  }

  function buildHtml() {
    const v = readValues();
    const pretty = v.prettyIndent;

    const lines = [];

    lines.push("<!DOCTYPE html>");
    lines.push(`<html lang="${escapeAttr(v.lang)}">`);
    lines.push("<head>");

    const head = [];

    if (v.metaCharset) head.push(`<meta charset="UTF-8" />`);
    if (v.metaViewport) head.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
    head.push(`<title>${escapeText(v.pageTitle)}</title>`);

    if (v.metaDescription) head.push(`<meta name="description" content="${escapeAttr(v.description)}" />`);
    if (v.metaThemeColor) head.push(`<meta name="theme-color" content="${escapeAttr(v.themeColor)}" />`);
    if (v.metaRobots) head.push(`<meta name="robots" content="index,follow" />`);

    if (v.includePreconnect && v.includeCdnFont) {
      head.push(`<link rel="preconnect" href="https://fonts.googleapis.com">`);
      head.push(`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`);
    }

    if (v.includeCdnFont) {
      head.push(`<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">`);
    }

    if (v.includeFavicon) head.push(`<link rel="icon" href="favicon.ico" />`);

    if (v.includeCss) head.push(`<link rel="stylesheet" href="${escapeAttr(v.cssPath)}" />`);

    if (v.includeInlineStyle) {
      if (v.includeComments) head.push(`<!-- Minimal inline styles (optional) -->`);
      head.push(`<style>
  :root { color-scheme: dark; }
  body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; }
  .container { width: min(1100px, calc(100% - 32px)); margin: 0 auto; }
  header, main, footer { padding: 24px 0; }
  a { color: inherit; }
  .skip-link { position:absolute; left:-9999px; top:auto; }
  .skip-link:focus{ left:16px; top:16px; padding:10px 12px; background:#000; color:#fff; z-index:999; }
</style>`);
    }

    for (const h of head) lines.push(indent(1, pretty) + h);

    lines.push("</head>");
    lines.push("<body>");

    if (v.includeSkipLink) {
      if (v.includeComments) lines.push(indent(1, pretty) + "<!-- Accessibility: skip link -->");
      lines.push(indent(1, pretty) + `<a class="skip-link" href="#main">Skip to content</a>`);
      if (!v.includeInlineStyle && v.includeComments) {
        lines.push(indent(1, pretty) + "<!-- Add CSS for .skip-link in your stylesheet -->");
      }
    }

    if (v.includeNoscript) {
      lines.push(indent(1, pretty) + `<noscript>This site works best with JavaScript enabled.</noscript>`);
    }

    const wrapOpen = v.includeContainer ? `<div class="container">` : "";
    const wrapClose = v.includeContainer ? `</div>` : "";

    if (v.includeHeaderMainFooter) {
      if (wrapOpen) lines.push(indent(1, pretty) + wrapOpen);

      const baseLevel = 1 + (wrapOpen ? 1 : 0);

      lines.push(indent(baseLevel, pretty) + `<header>`);
      if (v.includeComments) lines.push(indent(baseLevel + 1, pretty) + `<!-- Site header -->`);
      lines.push(indent(baseLevel + 1, pretty) + `<h1>${escapeText(v.pageTitle)}</h1>`);
      lines.push(indent(baseLevel + 1, pretty) + `<p>${escapeText(v.description)}</p>`);
      lines.push(indent(baseLevel, pretty) + `</header>`);

      lines.push(indent(baseLevel, pretty) + `<main id="main">`);
      if (v.includeComments) lines.push(indent(baseLevel + 1, pretty) + `<!-- Main content -->`);
      lines.push(indent(baseLevel + 1, pretty) + `<section>`);
      lines.push(indent(baseLevel + 2, pretty) + `<h2>Hello, world 👋</h2>`);
      lines.push(indent(baseLevel + 2, pretty) + `<p>Edit this template to get started.</p>`);
      lines.push(indent(baseLevel + 1, pretty) + `</section>`);
      lines.push(indent(baseLevel, pretty) + `</main>`);

      lines.push(indent(baseLevel, pretty) + `<footer>`);
      if (v.includeComments) lines.push(indent(baseLevel + 1, pretty) + `<!-- Site footer -->`);
      lines.push(indent(baseLevel + 1, pretty) + `<small>&copy; ${new Date().getFullYear()} ${escapeText(v.pageTitle)}</small>`);
      lines.push(indent(baseLevel, pretty) + `</footer>`);

      if (wrapClose) lines.push(indent(1, pretty) + wrapClose);
    } else {
      if (v.includeComments) lines.push(indent(1, pretty) + "<!-- Body content -->");
      lines.push(indent(1, pretty) + `<main id="main">`);
      lines.push(indent(2, pretty) + `<h1>${escapeText(v.pageTitle)}</h1>`);
      lines.push(indent(1, pretty) + `</main>`);
    }

    if (v.includeJs) {
      lines.push(indent(1, pretty) + `<script src="${escapeAttr(v.jsPath)}" defer></script>`);
    }

    lines.push("</body>");
    lines.push("</html>");

    return pretty ? lines.join("\n") : lines.join("").replaceAll("><", ">\n<");
  }

  function escapeAttr(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function escapeText(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function readValues() {
    return {
      pageTitle: inputs.pageTitle.value.trim() || DEFAULTS.pageTitle,
      lang: inputs.lang.value.trim() || DEFAULTS.lang,
      description: inputs.description.value.trim() || DEFAULTS.description,
      themeColor: inputs.themeColor.value.trim() || DEFAULTS.themeColor,

      metaViewport: inputs.metaViewport.checked,
      metaCharset: inputs.metaCharset.checked,
      metaDescription: inputs.metaDescription.checked,
      metaThemeColor: inputs.metaThemeColor.checked,
      metaRobots: inputs.metaRobots.checked,
      includeFavicon: inputs.includeFavicon.checked,

      includeCss: inputs.includeCss.checked,
      cssPath: inputs.cssPath.value.trim() || DEFAULTS.cssPath,
      includeJs: inputs.includeJs.checked,
      jsPath: inputs.jsPath.value.trim() || DEFAULTS.jsPath,
      includeCdnFont: inputs.includeCdnFont.checked,
      includePreconnect: inputs.includePreconnect.checked,

      includeHeaderMainFooter: inputs.includeHeaderMainFooter.checked,
      includeSkipLink: inputs.includeSkipLink.checked,
      includeNoscript: inputs.includeNoscript.checked,
      includeContainer: inputs.includeContainer.checked,
      includeInlineStyle: inputs.includeInlineStyle.checked,

      prettyIndent: inputs.prettyIndent.checked,
      includeComments: inputs.includeComments.checked,
    };
  }

  function setValues(values) {
    for (const [k, v] of Object.entries(values)) {
      if (!(k in inputs)) continue;
      if (typeof v === "boolean") inputs[k].checked = v;
      else inputs[k].value = v;
    }
  }

  function currentHtml() {
    return buildHtml();
  }

  function render() {
    const html = currentHtml();
    outputCode.innerHTML = escapeHtml(html);
    charCount.textContent = `${html.length} chars`;
    updatePreview(html);
  }

  // ✅ FIX: Inject a <base> tag so relative paths (style.css/app.js) work in iframe srcdoc
  function updatePreview(html) {
    const baseHref = location.href.replace(/[#?].*$/, "");
    const baseTag = `<base href="${baseHref}">`;

    let patched = html;

    if (/<head[^>]*>/i.test(patched)) {
      patched = patched.replace(/<head[^>]*>/i, (m) => `${m}\n  ${baseTag}`);
    } else {
      patched = `${baseTag}\n` + patched;
    }

    previewFrame.srcdoc = patched;
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied ✅");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      showToast("Copied ✅");
    }
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 1400);
  }

  // Tiny ZIP generator (store only)
  function crc32(buf) {
    let crc = ~0;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xEDB88320 & (-(crc & 1)));
    }
    return ~crc >>> 0;
  }

  function strToU8(s) { return new TextEncoder().encode(s); }
  function u16(n) { return [n & 255, (n >>> 8) & 255]; }
  function u32(n) { return [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]; }

  function buildZip(files) {
    const local = [];
    const central = [];
    let offset = 0;

    for (const f of files) {
      const nameU8 = strToU8(f.name);
      const data = f.data;
      const crc = crc32(data);

      const lh = [];
      lh.push(...u32(0x04034b50));
      lh.push(...u16(20));
      lh.push(...u16(0));
      lh.push(...u16(0));
      lh.push(...u16(0));
      lh.push(...u16(0));
      lh.push(...u32(crc));
      lh.push(...u32(data.length));
      lh.push(...u32(data.length));
      lh.push(...u16(nameU8.length));
      lh.push(...u16(0));

      local.push(new Uint8Array(lh), nameU8, data);

      const ch = [];
      ch.push(...u32(0x02014b50));
      ch.push(...u16(20));
      ch.push(...u16(20));
      ch.push(...u16(0));
      ch.push(...u16(0));
      ch.push(...u16(0));
      ch.push(...u16(0));
      ch.push(...u32(crc));
      ch.push(...u32(data.length));
      ch.push(...u32(data.length));
      ch.push(...u16(nameU8.length));
      ch.push(...u16(0));
      ch.push(...u16(0));
      ch.push(...u16(0));
      ch.push(...u16(0));
      ch.push(...u32(0));
      ch.push(...u32(offset));

      central.push(new Uint8Array(ch), nameU8);

      offset += lh.length + nameU8.length + data.length;
    }

    const centralSize = central.reduce((n, part) => n + part.length, 0);
    const centralOffset = offset;

    const end = [];
    end.push(...u32(0x06054b50));
    end.push(...u16(0));
    end.push(...u16(0));
    end.push(...u16(files.length));
    end.push(...u16(files.length));
    end.push(...u32(centralSize));
    end.push(...u32(centralOffset));
    end.push(...u16(0));

    const parts = [...local, ...central, new Uint8Array(end)];
    const total = parts.reduce((n, p) => n + p.length, 0);
    const out = new Uint8Array(total);
    let p = 0;
    for (const part of parts) {
      out.set(part, p);
      p += part.length;
    }
    return out;
  }

  function downloadZip(filename, files) {
    const zipU8 = buildZip(files);
    const blob = new Blob([zipU8], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
  }

  function openPreviewInNewTab(html) {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  function wireInputs() {
    const all = Object.values(inputs);
    for (const el of all) {
      const evt = el.type === "checkbox" ? "change" : "input";
      el.addEventListener(evt, render);
    }
  }

  copyHtmlBtn.addEventListener("click", () => copyText(currentHtml()));
  copyInlineBtn.addEventListener("click", () => copyText(currentHtml()));
  copyPreviewBtn.addEventListener("click", () => copyText(currentHtml()));

  downloadHtmlBtn.addEventListener("click", () => downloadText("index.html", currentHtml()));

  refreshPreviewBtn.addEventListener("click", () => {
    updatePreview(currentHtml());
    showToast("Preview refreshed");
  });

  openPreviewBtn.addEventListener("click", () => openPreviewInNewTab(currentHtml()));

  resetBtn.addEventListener("click", () => {
    setValues(DEFAULTS);
    render();
    showToast("Reset to defaults");
  });

  downloadBundleBtn.addEventListener("click", () => {
    const v = readValues();
    const files = [];
    const html = currentHtml();

    files.push({ name: "index.html", data: strToU8(html) });

    if (v.includeCss) {
      const css = `/* Starter CSS */\n:root{ color-scheme: dark; }\nbody{ margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; }\n.container{ width:min(1100px, calc(100% - 32px)); margin:0 auto; }\n.skip-link{ position:absolute; left:-9999px; top:auto; }\n.skip-link:focus{ left:16px; top:16px; padding:10px 12px; background:#000; color:#fff; z-index:999; }\n`;
      files.push({ name: v.cssPath || "style.css", data: strToU8(css) });
    }

    if (v.includeJs) {
      const js = `// Starter JS\nconsole.log("Ready ✅");\n`;
      files.push({ name: v.jsPath || "app.js", data: strToU8(js) });
    }

    downloadZip("starter-bundle.zip", files);
  });

  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      const tab = t.dataset.tab;

      if (tab === "code") {
        codePane.classList.remove("hidden");
        previewPane.classList.add("hidden");
      } else {
        previewPane.classList.remove("hidden");
        codePane.classList.add("hidden");
        updatePreview(currentHtml());
      }
    });
  });

  wireInputs();
  setValues(DEFAULTS);
  render();
})();
