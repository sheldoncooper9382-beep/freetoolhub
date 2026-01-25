(() => {
  const el = (id) => document.getElementById(id);

  const prop = el("prop");
  const unitMode = el("unitMode");
  const minSize = el("minSize");
  const maxSize = el("maxSize");
  const minVw = el("minVw");
  const maxVw = el("maxVw");
  const rootPx = el("rootPx");
  const roundTo = el("roundTo");
  const simWidth = el("simWidth");

  const cssOut = el("cssOut");
  const previewBox = el("previewBox");
  const currentReadout = el("currentReadout");

  const simWidthLabel = el("simWidthLabel");
  const metaWidth = el("metaWidth");
  const metaValue = el("metaValue");
  const metaFormula = el("metaFormula");

  const copyClampBtn = el("copyClampBtn");
  const copyRuleBtn = el("copyRuleBtn");
  const copyAllBtn = el("copyAllBtn");
  const resetBtn = el("resetBtn");
  const swapBtn = el("swapBtn");

  const defaults = {
    prop: "font-size",
    unitMode: "rem",
    minSize: 16,
    maxSize: 28,
    minVw: 320,
    maxVw: 1200,
    rootPx: 16,
    roundTo: 3,
    simWidth: 900
  };

  function clampNum(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function round(n, d){
    const p = Math.pow(10, d);
    return Math.round(n * p) / p;
  }

  function toRem(px, root){
    return px / root;
  }

  function buildClamp({ minPx, maxPx, minViewport, maxViewport, root, decimals, unit }) {
    // slope (px per px) * 100 => px per vw
    const slope = ((maxPx - minPx) / (maxViewport - minViewport)) * 100; // px per vw
    const intercept = minPx - (slope * minViewport) / 100; // px

    const d = clampNum(decimals, 0, 6);

    if (unit === "px") {
      const minS = round(minPx, d) + "px";
      const maxS = round(maxPx, d) + "px";
      const a = round(intercept, d) + "px";
      const b = round(slope, d) + "vw";
      const preferred = `calc(${a} + ${b})`;
      return {
        clamp: `clamp(${minS}, ${preferred}, ${maxS})`,
        slope, intercept
      };
    }

    // rem mode
    const minR = round(toRem(minPx, root), d) + "rem";
    const maxR = round(toRem(maxPx, root), d) + "rem";
    const aR = round(toRem(intercept, root), d) + "rem";
    const b = round(slope / root, d) + "vw"; // convert px/vw into rem/vw: (px per vw)/root
    const preferred = `calc(${aR} + ${b})`;
    return {
      clamp: `clamp(${minR}, ${preferred}, ${maxR})`,
      slope, intercept
    };
  }

  function evalFluidAtWidth({ minPx, maxPx, minViewport, maxViewport, width }) {
    // Linear interpolation then clamp
    const t = (width - minViewport) / (maxViewport - minViewport);
    const preferred = minPx + (maxPx - minPx) * t;
    return clampNum(preferred, Math.min(minPx, maxPx), Math.max(minPx, maxPx));
  }

  function readInputs() {
    const minPx = Number(minSize.value);
    const maxPx = Number(maxSize.value);
    const minViewport = Number(minVw.value);
    const maxViewport = Number(maxVw.value);
    const root = Math.max(1, Number(rootPx.value) || 16);
    const decimals = Number(roundTo.value);

    return { minPx, maxPx, minViewport, maxViewport, root, decimals, unit: unitMode.value };
  }

  function validState(s) {
    if (![s.minPx, s.maxPx, s.minViewport, s.maxViewport].every(Number.isFinite)) return false;
    if (s.minViewport === s.maxViewport) return false;
    return true;
  }

  function render() {
    simWidthLabel.textContent = `${simWidth.value}px`;
    metaWidth.textContent = `${simWidth.value}px`;

    const s = readInputs();
    if (!validState(s)) {
      cssOut.textContent = `/* Fix inputs: viewport min/max must be different, and values must be numbers. */`;
      metaValue.textContent = "—";
      metaFormula.textContent = "—";
      currentReadout.textContent = "Invalid inputs";
      return;
    }

    const minViewport = Math.min(s.minViewport, s.maxViewport);
    const maxViewport = Math.max(s.minViewport, s.maxViewport);

    const minPx = s.minPx;
    const maxPx = s.maxPx;

    const built = buildClamp({
      minPx, maxPx,
      minViewport, maxViewport,
      root: s.root,
      decimals: s.decimals,
      unit: s.unit
    });

    const clampStr = built.clamp;
    const property = prop.value;

    const rule = `.element {\n  ${property}: ${clampStr};\n}\n\n/* Key values */\n/* min viewport: ${minViewport}px | max viewport: ${maxViewport}px */\n/* min size: ${minPx}px | max size: ${maxPx}px */`;

    cssOut.textContent = rule;

    // Simulated width readout (in px and rem)
    const w = Number(simWidth.value);
    const computedPx = evalFluidAtWidth({
      minPx, maxPx,
      minViewport, maxViewport,
      width: w
    });

    const computedRem = computedPx / s.root;

    metaValue.textContent = `${round(computedPx, 2)}px  •  ${round(computedRem, 3)}rem`;
    metaFormula.textContent = clampStr;

    // Apply to preview + set stage width
    const stage = previewBox.closest(".previewStage");
    stage.style.width = "100%";
    stage.style.maxWidth = "100%";

    previewBox.style.setProperty(property, clampStr);

    // Simulated viewport by constraining preview box container width
    // We set the previewBox parent (previewStage content area) max-width effect by setting previewBox width.
    previewBox.style.width = `min(520px, 100%)`;
    previewBox.style.maxWidth = "100%";

    // But simulate viewport by applying a wrapper width on the previewStage's inner area:
    // easiest: set the previewBox's container width via a CSS variable:
    stage.style.setProperty("--simw", `${w}px`);
    stage.style.display = "grid";
    stage.style.placeItems = "center";

    // create an inner "simulation" by setting previewBox's outer wrapper width:
    previewBox.style.width = `${Math.min(520, Math.max(260, Math.floor(w * 0.55)))}px`;

    // Show current readout
    currentReadout.textContent = `${property}: ${clampStr}`;
  }

  async function copyText(txt) {
    try {
      await navigator.clipboard.writeText(txt);
      return true;
    } catch {
      // fallback
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

  function getClampOnly() {
    const s = readInputs();
    if (!validState(s)) return "";
    const minViewport = Math.min(s.minViewport, s.maxViewport);
    const maxViewport = Math.max(s.minViewport, s.maxViewport);
    return buildClamp({
      minPx: s.minPx,
      maxPx: s.maxPx,
      minViewport,
      maxViewport,
      root: s.root,
      decimals: s.decimals,
      unit: s.unit
    }).clamp;
  }

  function getRule() {
    const clampStr = getClampOnly();
    if (!clampStr) return "";
    return `.element {\n  ${prop.value}: ${clampStr};\n}`;
  }

  function toast(msg) {
    currentReadout.textContent = msg;
    currentReadout.style.borderColor = "rgba(110,231,255,.25)";
    setTimeout(() => {
      render();
      currentReadout.style.borderColor = "rgba(255,255,255,.12)";
    }, 800);
  }

  // Events
  [
    prop, unitMode, minSize, maxSize, minVw, maxVw, rootPx, roundTo, simWidth
  ].forEach(node => node.addEventListener("input", render));

  resetBtn.addEventListener("click", () => {
    prop.value = defaults.prop;
    unitMode.value = defaults.unitMode;
    minSize.value = defaults.minSize;
    maxSize.value = defaults.maxSize;
    minVw.value = defaults.minVw;
    maxVw.value = defaults.maxVw;
    rootPx.value = defaults.rootPx;
    roundTo.value = defaults.roundTo;
    simWidth.value = defaults.simWidth;
    render();
    toast("Reset ✅");
  });

  swapBtn.addEventListener("click", () => {
    const a = minSize.value;
    minSize.value = maxSize.value;
    maxSize.value = a;
    render();
    toast("Swapped ⇄");
  });

  copyClampBtn.addEventListener("click", async () => {
    const t = getClampOnly();
    if (!t) return toast("Nothing to copy");
    const ok = await copyText(t);
    toast(ok ? "clamp() copied ✅" : "Copy failed");
  });

  copyRuleBtn.addEventListener("click", async () => {
    const t = getRule();
    if (!t) return toast("Nothing to copy");
    const ok = await copyText(t);
    toast(ok ? "CSS rule copied ✅" : "Copy failed");
  });

  copyAllBtn.addEventListener("click", async () => {
    const t = cssOut.textContent || "";
    if (!t.trim()) return toast("Nothing to copy");
    const ok = await copyText(t);
    toast(ok ? "Output copied ✅" : "Copy failed");
  });

  // Init
  render();
})();
