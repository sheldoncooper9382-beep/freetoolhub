const previewText = document.getElementById("previewText");
const textInput = document.getElementById("textInput");
const fontSize = document.getElementById("fontSize");
const fontWeight = document.getElementById("fontWeight");
const italicToggle = document.getElementById("italicToggle");
const direction = document.getElementById("direction");
const colorList = document.getElementById("colorList");
const addColor = document.getElementById("addColor");
const removeColor = document.getElementById("removeColor");
const copyCSS = document.getElementById("copyCSS");

function getColors() {
  return [...colorList.querySelectorAll("input")].map(c => c.value);
}

function update() {
  const gradient = `linear-gradient(${direction.value}, ${getColors().join(", ")})`;

  previewText.textContent = textInput.value || " ";
  previewText.style.fontSize = fontSize.value + "px";
  previewText.style.fontWeight = fontWeight.value;
  previewText.style.fontStyle = italicToggle.checked ? "italic" : "normal";
  previewText.style.background = gradient;
}

addColor.onclick = () => {
  if (colorList.children.length >= 6) return;
  const c = document.createElement("input");
  c.type = "color";
  c.value = "#ffffff";
  c.oninput = update;
  colorList.appendChild(c);
  update();
};

removeColor.onclick = () => {
  if (colorList.children.length <= 2) return;
  colorList.removeChild(colorList.lastElementChild);
  update();
};

copyCSS.onclick = () => {
  const css = `
background: linear-gradient(${direction.value}, ${getColors().join(", ")});
-webkit-background-clip: text;
background-clip: text;
color: transparent;
font-size: ${fontSize.value}px;
font-weight: ${fontWeight.value};
font-style: ${italicToggle.checked ? "italic" : "normal"};
`.trim();

  navigator.clipboard.writeText(css);
  copyCSS.textContent = "Copied!";
  setTimeout(() => copyCSS.textContent = "Copy CSS", 1200);
};

[textInput, fontSize, fontWeight, italicToggle, direction].forEach(el =>
  el.addEventListener("input", update)
);

colorList.addEventListener("input", update);

update();
