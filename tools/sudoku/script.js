const root = document.documentElement;

const cellBg = document.getElementById("cellBg");
const gridColor = document.getElementById("gridColor");
const thickSize = document.getElementById("thickSize");
const output = document.getElementById("output");

cellBg.addEventListener("input", e =>
  root.style.setProperty("--cell-bg", e.target.value)
);

gridColor.addEventListener("input", e =>
  root.style.setProperty("--grid-line", e.target.value)
);

thickSize.addEventListener("input", e =>
  root.style.setProperty("--grid-thick", `${e.target.value}px`)
);

function applyTheme(theme) {
  if (theme === "glass") {
    root.style.setProperty("--cell-bg", "rgba(255,255,255,0.15)");
    root.style.setProperty("--grid-line", "rgba(255,255,255,0.4)");
    root.style.setProperty("--grid-thick", "3px");
  }

  if (theme === "neon") {
    root.style.setProperty("--cell-bg", "rgba(0,0,0,0.4)");
    root.style.setProperty("--grid-line", "#38bdf8");
    root.style.setProperty("--grid-thick", "4px");
  }

  if (theme === "minimal") {
    root.style.setProperty("--cell-bg", "#ffffff");
    root.style.setProperty("--grid-line", "#000000");
    root.style.setProperty("--grid-thick", "2px");
  }
}

document.getElementById("exportBtn").addEventListener("click", () => {
  output.value = `
:root {
  --cell-bg: ${getComputedStyle(root).getPropertyValue("--cell-bg")};
  --grid-line: ${getComputedStyle(root).getPropertyValue("--grid-line")};
  --grid-thick: ${getComputedStyle(root).getPropertyValue("--grid-thick")};
}
`.trim();
});
