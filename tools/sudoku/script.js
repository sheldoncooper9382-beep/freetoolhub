const root = document.documentElement;

// Inputs
const cellBg = document.getElementById("cellBg");
const gridLine = document.getElementById("gridLine");
const textColor = document.getElementById("textColor");
const thickSize = document.getElementById("thickSize");

// Cell background
cellBg.addEventListener("input", e => {
  root.style.setProperty("--cell-bg", e.target.value);
});

// Grid line color
gridLine.addEventListener("input", e => {
  root.style.setProperty("--line-color", e.target.value);
});

// Text (number) color
textColor.addEventListener("input", e => {
  root.style.setProperty("--text-color", e.target.value);
});

// Thick line size
thickSize.addEventListener("input", e => {
  root.style.setProperty("--thick-line", `${e.target.value}px`);
});
