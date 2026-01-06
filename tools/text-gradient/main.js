const textEl = document.getElementById("gradientText");
const cssOutput = document.getElementById("cssOutput");

const textInput = document.getElementById("textInput");
const fontSize = document.getElementById("fontSize");
const fontWeight = document.getElementById("fontWeight");
const italic = document.getElementById("italic");
const direction = document.getElementById("direction");
const colorsContainer = document.querySelector(".colors");

document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", updateGradient);
});

function getColors() {
  return [...colorsContainer.querySelectorAll("input")].map(i => i.value);
}

function updateGradient() {
  const colors = getColors().join(", ");
  const gradient = `linear-gradient(${direction.value}, ${colors})`;

  textEl.textContent = textInput.value;
  textEl.style.fontSize = fontSize.value + "px";
  textEl.style.fontWeight = fontWeight.value;
  textEl.style.fontStyle = italic.checked ? "italic" : "normal";
  textEl.style.background = gradient;

  cssOutput.value =
`background: ${gradient};
-webkit-background-clip: text;
background-clip: text;
color: transparent;
font-size: ${fontSize.value}px;
font-weight: ${fontWeight.value};
font-style: ${italic.checked ? "italic" : "normal"};`;
}

function addColor() {
  if (colorsContainer.children.length >= 6) return;
  const input = document.createElement("input");
  input.type = "color";
  input.value = "#ffffff";
  input.addEventListener("input", updateGradient);
  colorsContainer.appendChild(input);
  updateGradient();
}

function removeColor() {
  if (colorsContainer.children.length <= 2) return;
  colorsContainer.lastElementChild.remove();
  updateGradient();
}

function copyCSS() {
  cssOutput.select();
  document.execCommand("copy");
}

function resetAll() {
  textInput.value = "Gradient Text";
  fontSize.value = 64;
  fontWeight.value = 600;
  italic.checked = false;
  direction.value = "to right";

  colorsContainer.innerHTML = `
    <input type="color" value="#ff6ec4">
    <input type="color" value="#7873f5">
    <input type="color" value="#4ade80">
  `;

  [...colorsContainer.querySelectorAll("input")].forEach(i =>
    i.addEventListener("input", updateGradient)
  );

  updateGradient();
}

updateGradient();