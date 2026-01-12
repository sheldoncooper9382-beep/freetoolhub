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

// Live updates
cellBg.addEventListener("input", e =>
  root.style.setProperty("--cell-bg", e.target.value)
);

gridLine.addEventListener("input", e =>
  root.style.setProperty("--line-color", e.target.value)
);

textColor.addEventListener("input", e =>
  root.style.setProperty("--text-color", e.target.value)
);

thickSize.addEventListener("input", e =>
  root.style.setProperty("--thick-line", `${e.target.value}px`)
);

// Presets
glassBtn.onclick = () => {
  root.style.setProperty("--cell-bg", "rgba(255,255,255,0.18)");
  root.style.setProperty("--line-color", "rgba(255,255,255,0.9)");
  root.style.setProperty("--text-color", "#ffffff");
  root.style.setProperty("--thick-line", "4px");
  sudoku.style.backdropFilter = "blur(12px)";
};

neonBtn.onclick = () => {
  root.style.setProperty("--cell-bg", "rgba(0,255,213,0.15)");
  root.style.setProperty("--line-color", "#00ffd5");
  root.style.setProperty("--text-color", "#00ffd5");
  root.style.setProperty("--thick-line", "3px");
  sudoku.style.boxShadow =
    "0 0 20px rgba(0,255,213,0.6), inset 0 0 12px rgba(0,255,213,0.4)";
};

minimalBtn.onclick = () => {
  root.style.setProperty("--cell-bg", "#ffffff");
  root.style.setProperty("--line-color", "#222");
  root.style.setProperty("--text-color", "#111");
  root.style.setProperty("--thick-line", "2px");
  sudoku.style.boxShadow = "none";
  sudoku.style.backdropFilter = "none";
};
