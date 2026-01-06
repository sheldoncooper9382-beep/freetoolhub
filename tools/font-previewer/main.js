const preview = document.getElementById("textPreview");
const cssOutput = document.getElementById("cssOutput");

const controls = {
  text: document.getElementById("previewText"),
  family: document.getElementById("fontFamily"),
  size: document.getElementById("fontSize"),
  weight: document.getElementById("fontWeight"),
  line: document.getElementById("lineHeight"),
  spacing: document.getElementById("letterSpacing"),
  italic: document.getElementById("italic"),
  color: document.getElementById("textColor")
};

Object.values(controls).forEach(ctrl => {
  ctrl.addEventListener("input", updatePreview);
});

function updatePreview() {
  preview.textContent = controls.text.value;
  preview.style.fontFamily = controls.family.value;
  preview.style.fontSize = controls.size.value + "px";
  preview.style.fontWeight = controls.weight.value;
  preview.style.lineHeight = controls.line.value;
  preview.style.letterSpacing = controls.spacing.value + "px";
  preview.style.fontStyle = controls.italic.checked ? "italic" : "normal";
  preview.style.color = controls.color.value;

  cssOutput.value =
`font-family: ${controls.family.value};
font-size: ${controls.size.value}px;
font-weight: ${controls.weight.value};
line-height: ${controls.line.value};
letter-spacing: ${controls.spacing.value}px;
font-style: ${controls.italic.checked ? "italic" : "normal"};
color: ${controls.color.value};`;
}

function copyCSS() {
  cssOutput.select();
  document.execCommand("copy");
}

function resetAll() {
  controls.text.value = "The quick brown fox jumps over the lazy dog";
  controls.family.value = "Inter, sans-serif";
  controls.size.value = 32;
  controls.weight.value = 400;
  controls.line.value = 1.3;
  controls.spacing.value = 0;
  controls.italic.checked = false;
  controls.color.value = "#ffffff";
  updatePreview();
}

updatePreview();