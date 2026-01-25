(() => {
  const $ = (id) => document.getElementById(id);

  const basePx = $("basePx");
  const roundTo = $("roundTo");
  const pxIn = $("pxIn");
  const emIn = $("emIn");

  const swapBtn = $("swapBtn");
  const resetBtn = $("resetBtn");
  const copyEmBtn = $("copyEmBtn");
  const copyPxBtn = $("copyPxBtn");
  const copyAllBtn = $("copyAllBtn");

  const statusPill = $("statusPill");
  const sampleText = $("sampleText");

  const metaBase = $("metaBase");
  const metaPx = $("metaPx");
  const metaEm = $("metaEm");
  const outCode = $("outCode");

  const defaults = {
    basePx: 16,
    roundTo: 3,
    px: 16,
    em: 1
  };

  let lock = null; // "px" or "em" to avoid feedback loops

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function round(n, d){
    const p = Math.pow(10, d);
    return Math.round(n * p) / p;
  }

  function read() {
    const base = Number(basePx.value);
    const d = clamp(Number(roundTo.value), 0, 8);
    return { base: (Number.isFinite(base) && base > 0) ? base : 16, d };
  }

  function setStatus(msg){
    statusPill.textContent = msg;
  }

  function renderOutput(base, px, em, d){
    const pxR = round(px, Math.min(d, 6));
    const emR = round(em, d);

    metaBase.textContent = `${round(base, 2)}px`;
    metaPx.textContent = `${pxR}px`;
    metaEm.textContent = `${emR}em`;

    // live preview: scale sample text using em (relative sizing)
    sampleText.style.fontSize = `${emR}em`;

    outCode.textContent =
`/* PX ⇄ EM Conversion */
base: ${round(base, 2)}px;

px → em: ${pxR}px ÷ ${round(base, 2)}px = ${emR}em
em → px: ${emR}em × ${round(base, 2)}px = ${pxR}px

/* Use in CSS */
font-size: ${emR}em;`;
  }

  function updateFromPx() {
    const { base, d } = read();
    const px = Number(pxIn.value);
    if (!Number.isFinite(px)) return setStatus("Enter a valid PX");

    const em = px / base;
    emIn.value = String(round(em, d));
    renderOutput(base, px, em, d);
    setStatus("Updated from PX");
  }

  function updateFromEm() {
    const { base, d } = read();
    const em = Number(emIn.value);
    if (!Number.isFinite(em)) return setStatus("Enter a valid EM");

    const px = em * base;
    pxIn.value = String(round(px, Math.min(d, 6)));
    renderOutput(base, px, em, d);
    setStatus("Updated from EM");
  }

  function sync() {
    if (lock === "px") updateFromPx();
    else if (lock === "em") updateFromEm();
    else updateFromPx();
  }

  async function copyText(txt) {
    try {
      await navigator.clipboard.writeText(txt);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(ta);
        return true;
      } catch {
        document.body.removeChild(ta);
        return false;
      }
    }
  }

  function toast(msg){
    statusPill.textContent = msg;
    setTimeout(() => sync(), 650);
  }

  // Events
  pxIn.addEventListener("input", () => { lock = "px"; updateFromPx(); });
  emIn.addEventListener("input", () => { lock = "em"; updateFromEm(); });

  basePx.addEventListener("input", () => sync());
  roundTo.addEventListener("input", () => sync());

  swapBtn.addEventListener("click", () => {
    // swap raw values (not units): px value becomes computed from em and vice versa
    const px = pxIn.value;
    pxIn.value = emIn.value;
    emIn.value = px;
    lock = "px";
    sync();
    toast("Swapped ⇄");
  });

  resetBtn.addEventListener("click", () => {
    basePx.value = defaults.basePx;
    roundTo.value = defaults.roundTo;
    pxIn.value = defaults.px;
    emIn.value = defaults.em;
    lock = "px";
    sync();
    toast("Reset ✅");
  });

  copyEmBtn.addEventListener("click", async () => {
    const ok = await copyText(`${emIn.value}em`);
    toast(ok ? "EM copied ✅" : "Copy failed");
  });

  copyPxBtn.addEventListener("click", async () => {
    const ok = await copyText(`${pxIn.value}px`);
    toast(ok ? "PX copied ✅" : "Copy failed");
  });

  copyAllBtn.addEventListener("click", async () => {
    const ok = await copyText(outCode.textContent || "");
    toast(ok ? "Output copied ✅" : "Copy failed");
  });

  // Init
  lock = "px";
  sync();
})();
