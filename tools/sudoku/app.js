/* Sudoku Theme Generator
   - Live preview
   - Presets
   - Export CSS + JSON
   - Save to localStorage
*/

const $ = (id) => document.getElementById(id);

const els = {
  preset: $("preset"),
  font: $("font"),
  bgColor: $("bgColor"),
  accent: $("accent"),
  cellBg: $("cellBg"),
  cellText: $("cellText"),
  lineColor: $("lineColor"),
  thickLineColor: $("thickLineColor"),

  thinW: $("thinW"),
  thickW: $("thickW"),
  radius: $("radius"),
  cellPad: $("cellPad"),

  glass: $("glass"),
  glow: $("glow"),
  raised: $("raised"),
  rainbowAnim: $("rainbowAnim"),

  blur: $("blur"),
  glowAmt: $("glowAmt"),
  depth: $("depth"),
  bgStyle: $("bgStyle"),

  thinWVal: $("thinWVal"),
  thickWVal: $("thickWVal"),
  radiusVal: $("radiusVal"),
  cellPadVal: $("cellPadVal"),
  blurVal: $("blurVal"),
  glowAmtVal: $("glowAmtVal"),
  depthVal: $("depthVal"),

  sudoku: $("sudoku"),
  cssOut: $("cssOut"),
  jsonOut: $("jsonOut"),

  copyCss: $("copyCss"),
  copyJson: $("copyJson"),
  applyJson: $("applyJson"),

  btnRandom: $("btnRandom"),
  btnReset: $("btnReset"),
  btnSaveLocal: $("btnSaveLocal"),

  contrastNote: $("contrastNote"),
};

const DEFAULT = {
  preset: "glassmorphic",
  font: "system",
  bgStyle: "radial",

  bgColor: "#0b1020",
  accent: "#7dd3fc",
  cellBg: "#0f172a",
  cellText: "#e2e8f0",
  lineColor: "#94a3b8",
  thickLineColor: "#e2e8f0",

  thinW: 1,
  thickW: 4,
  radius: 8,
  cellPad: 8,

  glass: true,
  glow: true,
  raised: true,
  rainbowAnim: false,

  blur: 12,
  glowAmt: 0.55,
  depth: 14,
};

const PRESETS = {
  glassmorphic: {
    bgStyle: "aurora",
    bgColor: "#070a14",
    accent: "#7dd3fc",
    cellBg: "#0b1633",
    cellText: "#e6f0ff",
    lineColor: "#6b7fa3",
    thickLineColor: "#dbeafe",
    thinW: 1,
    thickW: 4,
    radius: 10,
    cellPad: 8,
    glass: true,
    glow: true,
    raised: true,
    rainbowAnim: false,
    blur: 14,
    glowAmt: 0.55,
    depth: 16,
    font: "system",
  },
  frosted: {
    bgStyle: "radial",
    bgColor: "#0b1220",
    accent: "#a78bfa",
    cellBg: "#101b33",
    cellText: "#f1f5f9",
    lineColor: "#7c8aa8",
    thickLineColor: "#f8fafc",
    thinW: 1,
    thickW: 4,
    radius: 12,
    cellPad: 9,
    glass: true,
    glow: false,
    raised: true,
    rainbowAnim: false,
    blur: 20,
    glowAmt: 0.20,
    depth: 18,
    font: "rounded",
  },
  neon: {
    bgStyle: "radial",
    bgColor: "#050710",
    accent: "#22d3ee",
    cellBg: "#050a18",
    cellText: "#e0fbff",
    lineColor: "#145a6a",
    thickLineColor: "#67e8f9",
    thinW: 1,
    thickW: 4,
    radius: 8,
    cellPad: 8,
    glass: true,
    glow: true,
    raised: false,
    rainbowAnim: false,
    blur: 10,
    glowAmt: 0.90,
    depth: 12,
    font: "mono",
  },
  rainbow: {
    bgStyle: "linear",
    bgColor: "#060816",
    accent: "#ff4dd2",
    cellBg: "#0b1020",
    cellText: "#ffffff",
    lineColor: "#6b7280",
    thickLineColor: "#ffffff",
    thinW: 1,
    thickW: 4,
    radius: 10,
    cellPad: 8,
    glass: true,
    glow: true,
    raised: true,
    rainbowAnim: true,
    blur: 14,
    glowAmt: 0.65,
    depth: 16,
    font: "display",
  },
  neumorphism: {
    bgStyle: "solid",
    bgColor: "#0b1220",
    accent: "#34d399",
    cellBg: "#0b1220",
    cellText: "#e5e7eb",
    lineColor: "#2b344a",
    thickLineColor: "#9ca3af",
    thinW: 1,
    thickW: 3,
    radius: 14,
    cellPad: 10,
    glass: false,
    glow: false,
    raised: true,
    rainbowAnim: false,
    blur: 0,
    glowAmt: 0.0,
    depth: 22,
    font: "rounded",
  },
  cyberpunk: {
    bgStyle: "aurora",
    bgColor: "#070313",
    accent: "#fb7185",
    cellBg: "#0b071c",
    cellText: "#fff1f2",
    lineColor: "#6d1d2b",
    thickLineColor: "#fda4af",
    thinW: 1,
    thickW: 5,
    radius: 6,
    cellPad: 7,
    glass: true,
    glow: true,
    raised: false,
    rainbowAnim: false,
    blur: 12,
    glowAmt: 0.85,
    depth: 14,
    font: "mono",
  },
  minimal: {
    bgStyle: "solid",
    bgColor: "#0b1020",
    accent: "#e2e8f0",
    cellBg: "#0b1020",
    cellText: "#e2e8f0",
    lineColor: "#334155",
    thickLineColor: "#e2e8f0",
    thinW: 1,
    thickW: 4,
    radius: 4,
    cellPad: 8,
    glass: false,
    glow: false,
    raised: false,
    rainbowAnim: false,
    blur: 0,
    glowAmt: 0.0,
    depth: 10,
    font: "system",
  },
  paper: {
    bgStyle: "solid",
    bgColor: "#0b1020",
    accent: "#fbbf24",
    cellBg: "#f8fafc",
    cellText: "#0b1020",
    lineColor: "#334155",
    thickLineColor: "#0b1020",
    thinW: 1,
    thickW: 4,
    radius: 2,
    cellPad: 8,
    glass: false,
    glow: false,
    raised: true,
    rainbowAnim: false,
    blur: 0,
    glowAmt: 0.0,
    depth: 18,
    font: "system",
  },
  arcade: {
    bgStyle: "radial",
    bgColor: "#020617",
    accent: "#a78bfa",
    cellBg: "#06122b",
    cellText: "#e9d5ff",
    lineColor: "#1f3b68",
    thickLineColor: "#c4b5fd",
    thinW: 1,
    thickW: 4,
    radius: 12,
    cellPad: 9,
    glass: true,
    glow: true,
    raised: true,
    rainbowAnim: false,
    blur: 10,
    glowAmt: 0.70,
    depth: 20,
    font: "display",
  },
};

let state = loadLocal() ?? { ...DEFAULT };
buildGrid();
hydrateUIFromState();
applyState();

function buildGrid(){
  els.sudoku.innerHTML = "";
  // add theme class container for export parity
  els.sudoku.classList.add("sudoku-theme");

  // create 81 cells with thick separators each 3
  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      const idx = r*9 + c;
      const d = document.createElement("div");
      d.className = "cell";

      // thick borders on 3rd, 6th columns/rows (using helper classes)
      if(c === 2 || c === 5) d.classList.add("thick-r");
      if(r === 2 || r === 5) d.classList.add("thick-b");

      // demo numbers for visual
      const demo = pickDemoNumber(r,c);
      if(demo !== ""){
        d.textContent = demo;
        d.classList.add("demo");
      }

      els.sudoku.appendChild(d);
    }
  }
}

function pickDemoNumber(r,c){
  // light pattern to show typography without looking like a solved board
  const map = [
    ["", "8", "", "", "", "4", "", "", ""],
    ["", "", "3", "", "", "", "6", "", ""],
    ["", "", "", "1", "", "", "", "9", ""],
    ["", "2", "", "", "6", "", "", "", "7"],
    ["", "", "", "", "", "", "", "", ""],
    ["9", "", "", "", "8", "", "", "1", ""],
    ["", "5", "", "", "", "2", "", "", ""],
    ["", "", "7", "", "", "", "4", "", ""],
    ["", "", "", "9", "", "", "", "3", ""],
  ];
  return map[r][c];
}

function loadLocal(){
  try{
    const raw = localStorage.getItem("sudokuThemeGen_v1");
    if(!raw) return null;
    const parsed = JSON.parse(raw);
    return sanitize(parsed);
  }catch{
    return null;
  }
}

function saveLocal(){
  localStorage.setItem("sudokuThemeGen_v1", JSON.stringify(state, null, 2));
}

function sanitize(obj){
  // keep only known keys
  const clean = { ...DEFAULT };
  for(const k of Object.keys(clean)){
    if(obj && obj[k] !== undefined) clean[k] = obj[k];
  }
  // basic constraints
  clean.thinW = clampInt(clean.thinW, 1, 6);
  clean.thickW = clampInt(clean.thickW, 2, 10);
  clean.radius = clampInt(clean.radius, 0, 16);
  clean.cellPad = clampInt(clean.cellPad, 4, 18);
  clean.blur = clampInt(clean.blur, 0, 24);
  clean.depth = clampInt(clean.depth, 0, 24);
  clean.glowAmt = clampFloat(clean.glowAmt, 0, 1);
  return clean;
}

function clampInt(v,min,max){
  v = Number(v);
  if(Number.isNaN(v)) v = min;
  return Math.max(min, Math.min(max, Math.round(v)));
}
function clampFloat(v,min,max){
  v = Number(v);
  if(Number.isNaN(v)) v = min;
  return Math.max(min, Math.min(max, v));
}

function hydrateUIFromState(){
  els.preset.value = state.preset;
  els.font.value = state.font;
  els.bgStyle.value = state.bgStyle;

  els.bgColor.value = state.bgColor;
  els.accent.value = state.accent;
  els.cellBg.value = state.cellBg;
  els.cellText.value = state.cellText;
  els.lineColor.value = state.lineColor;
  els.thickLineColor.value = state.thickLineColor;

  els.thinW.value = state.thinW;
  els.thickW.value = state.thickW;
  els.radius.value = state.radius;
  els.cellPad.value = state.cellPad;

  els.glass.checked = !!state.glass;
  els.glow.checked = !!state.glow;
  els.raised.checked = !!state.raised;
  els.rainbowAnim.checked = !!state.rainbowAnim;

  els.blur.value = state.blur;
  els.glowAmt.value = Math.round(state.glowAmt * 100);
  els.depth.value = state.depth;

  updateValueLabels();
}

function updateValueLabels(){
  els.thinWVal.textContent = `${els.thinW.value}px`;
  els.thickWVal.textContent = `${els.thickW.value}px`;
  els.radiusVal.textContent = `${els.radius.value}px`;
  els.cellPadVal.textContent = `${els.cellPad.value}px`;
  els.blurVal.textContent = `${els.blur.value}px`;
  els.glowAmtVal.textContent = `${(els.glowAmt.value/100).toFixed(2)}`;
  els.depthVal.textContent = `${els.depth.value}`;
}

function uiToState(){
  state.preset = els.preset.value;
  state.font = els.font.value;
  state.bgStyle = els.bgStyle.value;

  state.bgColor = els.bgColor.value;
  state.accent = els.accent.value;
  state.cellBg = els.cellBg.value;
  state.cellText = els.cellText.value;
  state.lineColor = els.lineColor.value;
  state.thickLineColor = els.thickLineColor.value;

  state.thinW = clampInt(els.thinW.value, 1, 6);
  state.thickW = clampInt(els.thickW.value, 2, 10);
  state.radius = clampInt(els.radius.value, 0, 16);
  state.cellPad = clampInt(els.cellPad.value, 4, 18);

  state.glass = !!els.glass.checked;
  state.glow = !!els.glow.checked;
  state.raised = !!els.raised.checked;
  state.rainbowAnim = !!els.rainbowAnim.checked;

  state.blur = clampInt(els.blur.value, 0, 24);
  state.glowAmt = clampFloat(els.glowAmt.value / 100, 0, 1);
  state.depth = clampInt(els.depth.value, 0, 24);
}

function applyState(){
  // apply CSS vars to :root so preview updates
  const root = document.documentElement;

  // background style affects the outer layer
  applyBackgroundLayer(state);

  // fonts
  root.style.setProperty("--font", fontToStack(state.font));

  root.style.setProperty("--s-bg", state.bgColor);
  root.style.setProperty("--s-accent", state.accent);
  root.style.setProperty("--s-cell-bg", state.cellBg);
  root.style.setProperty("--s-cell-text", state.cellText);
  root.style.setProperty("--s-line", state.lineColor);
  root.style.setProperty("--s-thick", state.thickLineColor);

  root.style.setProperty("--s-thin-w", `${state.thinW}px`);
  root.style.setProperty("--s-thick-w", `${state.thickW}px`);
  root.style.setProperty("--s-radius", `${state.radius}px`);
  root.style.setProperty("--s-pad", `${state.cellPad}px`);

  root.style.setProperty("--s-blur", `${state.blur}px`);
  root.style.setProperty("--s-glow", `${state.glowAmt}`);
  root.style.setProperty("--s-depth", `${state.depth}`);

  root.style.setProperty("--s-glass", state.glass ? "1" : "0");
  root.style.setProperty("--s-glow-on", state.glow ? "1" : "0");
  root.style.setProperty("--s-raised", state.raised ? "1" : "0");
  root.style.setProperty("--s-rainbow", state.rainbowAnim ? "1" : "0");

  // class toggles for preview grid
  els.sudoku.classList.toggle("raised", !!state.raised);
  els.sudoku.classList.toggle("rainbow", !!state.rainbowAnim);

  updateExports();
  updateContrastNotice();
}

function applyBackgroundLayer(s){
  const bg = document.querySelector(".bg-layer");
  if(!bg) return;

  // set a base using chosen background color as anchor
  if(s.bgStyle === "solid"){
    bg.style.background = `linear-gradient(180deg, ${s.bgColor}, ${s.bgColor})`;
    return;
  }

  if(s.bgStyle === "linear"){
    bg.style.background =
      `linear-gradient(135deg,
        color-mix(in oklab, ${s.bgColor} 85%, rgba(255,255,255,0.08)),
        color-mix(in oklab, ${s.accent} 20%, ${s.bgColor}),
        ${s.bgColor}
      )`;
    return;
  }

  if(s.bgStyle === "aurora"){
    bg.style.background =
      `radial-gradient(1100px 600px at 10% 10%, color-mix(in oklab, ${s.accent} 30%, transparent), transparent 60%),
       radial-gradient(1000px 600px at 90% 30%, rgba(167,139,250,0.18), transparent 55%),
       radial-gradient(900px 500px at 50% 90%, rgba(52,211,153,0.12), transparent 60%),
       linear-gradient(180deg, ${s.bgColor}, ${s.bgColor})`;
    return;
  }

  // radial default
  bg.style.background =
    `radial-gradient(1100px 600px at 15% 10%, color-mix(in oklab, ${s.accent} 22%, transparent), transparent 60%),
     radial-gradient(900px 500px at 85% 20%, rgba(167,139,250,0.14), transparent 55%),
     linear-gradient(180deg, ${s.bgColor}, ${s.bgColor})`;
}

function fontToStack(key){
  switch(key){
    case "mono":
      return `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
    case "rounded":
      return `"ui-rounded", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
    case "display":
      return `"Trebuchet MS", "Segoe UI", system-ui, -apple-system, Roboto, Helvetica, Arial`;
    default:
      return `system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"`;
  }
}

function updateExports(){
  // Export CSS: copy/paste to your Sudoku site
  const css = generateExportCSS(state);
  els.cssOut.value = css;

  // Export JSON config
  els.jsonOut.value = JSON.stringify(state, null, 2);
}

function generateExportCSS(s){
  // This CSS is meant to be pasted into your main site stylesheet.
  // Apply .sudoku-theme to the container (or :root) and reuse .sudoku/.cell styles from your site if you want.
  return `/* Sudoku Theme Export (paste into your site CSS)
   Usage:
   - Add class "sudoku-theme" on a wrapper element (or :root)
   - Your Sudoku grid should use:
       .sudoku { display:grid; grid-template-columns:repeat(9,1fr); }
       .cell   { aspect-ratio:1/1; display:grid; place-items:center; }
   - Optional: use "raised" and "rainbow" classes on .sudoku
*/

.sudoku-theme{
  --s-bg: ${s.bgColor};
  --s-accent: ${s.accent};
  --s-cell-bg: ${s.cellBg};
  --s-cell-text: ${s.cellText};
  --s-line: ${s.lineColor};
  --s-thick: ${s.thickLineColor};

  --s-thin-w: ${s.thinW}px;
  --s-thick-w: ${s.thickW}px;
  --s-radius: ${s.radius}px;
  --s-pad: ${s.cellPad}px;

  --s-blur: ${s.blur}px;
  --s-glow: ${s.glowAmt};
  --s-depth: ${s.depth};

  --s-glass: ${s.glass ? 1 : 0};
  --s-glow-on: ${s.glow ? 1 : 0};
  --s-raised: ${s.raised ? 1 : 0};
  --s-rainbow: ${s.rainbowAnim ? 1 : 0};
}

/* If your site already has Sudoku styles, just map your variables to these */
.sudoku{
  border: var(--s-thick-w) solid var(--s-thick);
  border-radius: calc(var(--s-radius) + 6px);
  background: color-mix(in oklab, var(--s-bg) 80%, rgba(255,255,255,0.10));
  backdrop-filter: blur(calc(var(--s-blur) * var(--s-glass)));
  box-shadow: 0 calc(var(--s-depth) * 1px) calc((var(--s-depth) * 3) * 1px) rgba(0,0,0,0.45);
  filter: drop-shadow(0 0 calc(22px * var(--s-glow) * var(--s-glow-on)) color-mix(in oklab, var(--s-accent) 55%, transparent));
  overflow:hidden;
}
.cell{
  padding: var(--s-pad);
  color: var(--s-cell-text);
  background: color-mix(in oklab, var(--s-cell-bg) 88%, rgba(255,255,255,0.06));
  border-right: var(--s-thin-w) solid var(--s-line);
  border-bottom: var(--s-thin-w) solid var(--s-line);
  font-weight: 800;
}
.cell:nth-child(9n){ border-right:none; }
.cell:nth-last-child(-n + 9){ border-bottom:none; }

/* Optional: raised mode */
.sudoku.raised .cell{
  border:none;
  border-radius: var(--s-radius);
  margin: 2px;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.08),
    0 10px 22px rgba(0,0,0,0.35),
    inset 0 1px rgba(255,255,255,0.12);
  background: linear-gradient(180deg,
    color-mix(in oklab, var(--s-cell-bg) 92%, rgba(255,255,255,0.10)),
    color-mix(in oklab, var(--s-cell-bg) 92%, rgba(0,0,0,0.10))
  );
}

/* Optional: rainbow outline */
.sudoku.rainbow{ border-color: transparent; position:relative; }
.sudoku.rainbow::before{
  content:"";
  position:absolute; inset:-3px;
  border-radius: calc(var(--s-radius) + 10px);
  padding: 3px;
  background: conic-gradient(from 0deg,#ff4d4d,#ffb84d,#fff04d,#65ff8a,#4dd9ff,#7b5cff,#ff4dd2,#ff4d4d);
  animation: spin 6s linear infinite;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events:none;
}
@keyframes spin{ to{ transform: rotate(360deg); } }
`;
}

/* tiny accessibility helper: contrast check for cellText vs cellBg */
function updateContrastNotice(){
  const bg = hexToRgb(state.cellBg);
  const fg = hexToRgb(state.cellText);
  if(!bg || !fg){
    els.contrastNote.textContent = "";
    return;
  }
  const ratio = contrastRatio(fg, bg);
  const ok = ratio >= 4.5;
  els.contrastNote.textContent =
    `Contrast (cell text vs cell bg): ${ratio.toFixed(2)}:1 — ${ok ? "OK" : "Low (try brighter text or darker cells)"}`;
}

function hexToRgb(hex){
  const h = (hex || "").replace("#","").trim();
  if(h.length !== 6) return null;
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  if([r,g,b].some(n => Number.isNaN(n))) return null;
  return {r,g,b};
}

function luminance({r,g,b}){
  const srgb = [r,g,b].map(v => v/255).map(v => (v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4)));
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}

function contrastRatio(rgb1, rgb2){
  const L1 = luminance(rgb1);
  const L2 = luminance(rgb2);
  const lighter = Math.max(L1,L2);
  const darker = Math.min(L1,L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/* events */
const inputs = [
  "preset","font","bgStyle",
  "bgColor","accent","cellBg","cellText","lineColor","thickLineColor",
  "thinW","thickW","radius","cellPad",
  "glass","glow","raised","rainbowAnim",
  "blur","glowAmt","depth"
];

inputs.forEach(id => {
  const el = $(id);
  const evt = (el.type === "checkbox" || el.tagName === "SELECT" || el.type === "color") ? "change" : "input";
  el.addEventListener(evt, () => {
    // If user changes preset selector, apply preset values but keep some user-chosen fields when helpful
    if(id === "preset"){
      applyPreset(els.preset.value);
      hydrateUIFromState();
      applyState();
      return;
    }
    uiToState();
    updateValueLabels();
    applyState();
  });
});

function applyPreset(name){
  const p = PRESETS[name];
  if(!p) return;
  // merge preset into state
  state = sanitize({ ...state, ...p, preset: name });
}

els.btnReset.addEventListener("click", () => {
  state = { ...DEFAULT };
  hydrateUIFromState();
  applyState();
});

els.btnRandom.addEventListener("click", () => {
  state = randomThemeFrom(state);
  hydrateUIFromState();
  applyState();
});

els.btnSaveLocal.addEventListener("click", () => {
  uiToState();
  saveLocal();
  toast("Saved locally ✔");
});

els.copyCss.addEventListener("click", async () => {
  await copyText(els.cssOut.value);
  toast("CSS copied ✔");
});

els.copyJson.addEventListener("click", async () => {
  await copyText(els.jsonOut.value);
  toast("JSON copied ✔");
});

els.applyJson.addEventListener("click", () => {
  try{
    const parsed = JSON.parse(els.jsonOut.value);
    state = sanitize(parsed);
    hydrateUIFromState();
    applyState();
    toast("JSON applied ✔");
  }catch{
    toast("Invalid JSON ✖");
  }
});

/* utils */
async function copyText(txt){
  try{
    await navigator.clipboard.writeText(txt);
  }catch{
    // fallback
    const ta = document.createElement("textarea");
    ta.value = txt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

function toast(msg){
  els.contrastNote.textContent = msg + "  •  " + els.contrastNote.textContent.replace(/^.*?•\s*/,"");
}

function randomThemeFrom(base){
  // random palette with constraints that usually look good on dark UIs
  const rand = (min,max)=> Math.floor(min + Math.random()*(max-min+1));

  const accent = hslToHex(rand(0,359), rand(70,95), rand(55,65));
  const bg = hslToHex(rand(210,260), rand(35,65), rand(6,12));
  const cellBg = hslToHex(rand(210,260), rand(35,65), rand(10,18));

  const lightText = "#e2e8f0";
  const line = hslToHex(rand(210,260), rand(20,40), rand(40,55));
  const thick = "#f8fafc";

  const r = {
    ...base,
    preset: base.preset,
    bgStyle: ["radial","aurora","linear"][rand(0,2)],
    bgColor: bg,
    accent,
    cellBg,
    cellText: lightText,
    lineColor: line,
    thickLineColor: thick,
    thinW: rand(1,2),
    thickW: rand(3,6),
    radius: rand(4,14),
    cellPad: rand(6,11),
    glass: Math.random() > 0.25,
    glow: Math.random() > 0.20,
    raised: Math.random() > 0.35,
    rainbowAnim: Math.random() > 0.80,
    blur: rand(0,20),
    glowAmt: Math.round((0.15 + Math.random()*0.85)*100)/100,
    depth: rand(8,22),
    font: ["system","mono","rounded","display"][rand(0,3)],
  };

  // keep glass meaningful
  if(!r.glass) r.blur = 0;
  if(!r.glow) r.glowAmt = 0.0;
  return sanitize(r);
}

function hslToHex(h,s,l){
  s/=100; l/=100;
  const k = n => (n + h/30) % 12;
  const a = s * Math.min(l, 1-l);
  const f = n => l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n), 1)));
  const toHex = x => Math.round(x*255).toString(16).padStart(2,'0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
