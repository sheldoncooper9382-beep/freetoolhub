const previewText = document.getElementById("previewText");
const textInput = document.getElementById("textInput");
const fontSize = document.getElementById("fontSize");
const fontWeight = document.getElementById("fontWeight");
const italicToggle = document.getElementById("italicToggle");
const direction = document.getElementById("direction");
const colorList = document.getElementById("colorList");
const addColorBtn = document.getElementById("addColor");
const removeColorBtn = document.getElementById("removeColor");
const copyCSSBtn = document.getElementById("copyCSS");

function getColors() {
  return [...colorList.querySelectorAll("input")].map(c => c.value);
}

function updateGradient() {
  const colors = getColors();
  const dir = direction.value;
  const gradient = `linear-gradient(${dir}, ${colors.join(", ")})`;

  previewText.style.background = gradient;
  previewText.style.webkitBackgroundClip = "text";
  previewText.style.backgroundClip = "text";
  previewText.style.color = "transparent";
}

function updateText() {
  previewText.textContent = textInput.value || " ";
}

function updateFont() {
  previewText.style.fontSize = fontSize.value + "px";
  previewText.style.fontWeight = fontWeight.value;
  previewText.style.fontStyle = italicToggle.checked ? "italic" : "normal";
}

function updateAll() {
  updateText();
  updateFont();
  updateGradient();
}

addColorBtn.addEventListener("click", () => {
  if (colorList.children.length >= 6) return;
  const input = document.createElement("input");
  input.type = "color";
  input.value = "#ffffff";
  input.addEventListener("input", updateGradient);
  colorList.appendChild(input);
  updateGradient();
});

removeColorBtn.addEventListener("click", () => {
  if (colorList.children.length <= 2) return;
  colorList.removeChild(colorList.lastElementChild);
  updateGradient();
});

[textInput, fontSize, fontWeight, italicToggle, direction].forEach(el =>
  el.addEventListener("input", updateAll)
);

colorList.addEventListener("input", updateGradient);

copyCSSBtn.addEventListener("click", () => {
  const colors = getColors();
  const css = `
background: linear-gradient(${direction.value}, ${colors.join(", ")});
-webkit-background-clip: text;
background-clip: text;
color: transparent;
font-size: ${fontSize.value}px;
font-weight: ${fontWeight.value};
font-style: ${italicToggle.checked ? "italic" : "normal"};
`.trim();

  navigator.clipboard.writeText(css);
  copyCSSBtn.textContent = "Copied!";
  setTimeout(() => copyCSSBtn.textContent = "Copy CSS", 1200);
});

updateAll();
