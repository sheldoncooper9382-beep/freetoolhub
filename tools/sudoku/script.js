const root = document.documentElement;
const sudoku = document.querySelector(".sudoku");

// Inputs
const cellBg = document.getElementById("cellBg");
const gridLine = document.getElementById("gridLine");
const textColor = document.getElementById("textColor");
const thickSize = document.getElementById("thickSize");

// Buttons
const glassBtn = document.querySelector(".glass");
const neonBtn = document.querySelector(".neon");
const minimalBtn = document.querySelector(".minimal");

// === LIVE CONTROLS ===

// Cell background
cellBg.addEventListener("input", e => {
  root.style.setProperty("--cell-bg", e.target.value);
});

// Grid line color
gridLine.addEventListener("input", e => {
  root.style.setProperty("--line-color", e.target.value);
});

// Text color (FIXED)
textColor.addEventListener("input", e => {
  root.style.setProperty("--text-color", e.target.value);
});

// Thick line size
thickSize.addEventListener("input", e => {
  root.style.setProperty("--thick-line", `${e.target.value}px`);
});

// === PRESETS ===

// GLASS
glassBtn.addEventListener("click", () => {
  root.style.setProperty("--cell-bg", "rgba(255,255,255,0.18)");
  root.style.setProperty("--line-color", "rgba(255,255,255,0.8)");
  root.style.setProperty("--text-color", "#ffffff");
  root.style.setProperty("--thick-line", "4px");

  cellBg.value = "#ffffff";
  gridLine.value = "#ffffff";
  textColor.value = "#ffffff";
  thickSize.value = 4;

  sudoku.style.backdropFilter = "blur(12px)";
});

// NEON
neonBtn.addEventListener("click", () => {
  root.style.setProperty("--cell-bg", "rgba(0,255,213,0.15)");
  root.style.setProperty("--line-color", "#00ffd5");
  root.style.setProperty("--text-color", "#00ffd5");
  root.style.setProperty("--thick-line", "3px");

  cellBg.value = "#00ffd5";
  gridLine.value = "#00ffd5";
  textColor.value = "#00ffd5";
  thickSize.value = 3;

  sudoku.style.boxShadow =
    "0 0 20px rgba(0,255,213,0.6), inset 0 0 12px rgba(0,255,213,0.4)";
});

// MINIMAL
minimalBtn.addEventListener("click", () => {
  root.style.setProperty("--cell-bg", "#ffffff");
  root.style.setProperty("--line-color", "#222222");
  root.style.setProperty("--text-color", "#111111");
  root.style.setProperty("--thick-line", "2px");

  cellBg.value = "#ffffff";
  gridLine.value = "#222222";
  textColor.value = "#111111";
  thickSize.value = 2;

  sudoku.style.boxShadow = "none";
  sudoku.style.backdropFilter = "none";
});
