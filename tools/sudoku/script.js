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
cellBg.addEventListener("input", e => {
  root.style.setProperty("--cell-bg", e.target.value);
  sudoku.style.background = e.target.value; // force update
  document.querySelectorAll(".sudoku td").forEach(td => {
    td.style.background = e.target.value;
  });
});

gridLine.addEventListener("input", e => {
  root.style.setProperty("--line-color", e.target.value);
  document.querySelectorAll(".sudoku td").forEach(td => {
    td.style.borderColor = e.target.value;
  });
  sudoku.style.borderColor = e.target.value;
});

textColor.addEventListener("input", e => {
  root.style.setProperty("--text-color", e.target.value);
  sudoku.style.color = e.target.value;
});

thickSize.addEventListener("input", e => {
  root.style.setProperty("--thick-line", `${e.target.value}px`);
  sudoku.style.borderWidth = `${e.target.value}px`;
});

// Presets
glassBtn.onclick = () => {
  const bg = "rgba(255,255,255,0.18)";
  const line = "rgba(255,255,255,0.9)";
  const text = "#ffffff";
  const thick = "4px";

  root.style.setProperty("--cell-bg", bg);
  root.style.setProperty("--line-color", line);
  root.style.setProperty("--text-color", text);
  root.style.setProperty("--thick-line", thick);

  sudoku.style.background = bg;
  sudoku.style.color = text;
  sudoku.style.border = `${thick} solid ${line}`;
  sudoku.style.backdropFilter = "blur(12px)";
  document.querySelectorAll(".sudoku td").forEach(td => {
    td.style.background = bg;
    td.style.borderColor = line;
  });
};

neonBtn.onclick = () => {
  const bg = "rgba(0,255,213,0.15)";
  const line = "#00ffd5";
  const text = "#00ffd5";
  const thick = "3px";

  root.style.setProperty("--cell-bg", bg);
  root.style.setProperty("--line-color", line);
  root.style.setProperty("--text-color", text);
  root.style.setProperty("--thick-line", thick);

  sudoku.style.background = bg;
  sudoku.style.color = text;
  sudoku.style.border = `${thick} solid ${line}`;
  sudoku.style.boxShadow =
    "0 0 20px rgba(0,255,213,0.6), inset 0 0 12px rgba(0,255,213,0.4)";
  document.querySelectorAll(".sudoku td").forEach(td => {
    td.style.background = bg;
    td.style.borderColor = line;
  });
};

minimalBtn.onclick = () => {
  const bg = "#ffffff";
  const line = "#222";
  const text = "#111";
  const thick = "2px";

  root.style.setProperty("--cell-bg", bg);
  root.style.setProperty("--line-color", line);
  root.style.setProperty("--text-color", text);
  root.style.setProperty("--thick-line", thick);

  sudoku.style.background = bg;
  sudoku.style.color = text;
  sudoku.style.border = `${thick} solid ${line}`;
  sudoku.style.boxShadow = "none";
  sudoku.style.backdropFilter = "none";
  document.querySelectorAll(".sudoku td").forEach(td => {
    td.style.background = bg;
    td.style.borderColor = line;
  });
};
