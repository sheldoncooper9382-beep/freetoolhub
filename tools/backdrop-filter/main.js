const glassBox = document.getElementById("glassBox");
const cssOutput = document.getElementById("cssOutput");

const controls = [
  "blur",
  "brightness",
  "contrast",
  "saturate",
  "hue",
  "opacity",
  "tint"
];

controls.forEach(id => {
  document.getElementById(id).addEventListener("input", updateGlass);
});

function updateGlass() {
  const blur = document.getElementById("blur").value;
  const brightness = document.getElementById("brightness").value;
  const contrast = document.getElementById("contrast").value;
  const saturate = document.getElementById("saturate").value;
  const hue = document.getElementById("hue").value;
  const opacity = document.getElementById("opacity").value;
  const tint = document.getElementById("tint").value;

  const rgba = hexToRgba(tint, opacity);

  const filterValue =
    `blur(${blur}px) ` +
    `brightness(${brightness}%) ` +
    `contrast(${contrast}%) ` +
    `saturate(${saturate}%) ` +
    `hue-rotate(${hue}deg)`;

  glassBox.style.backdropFilter = filterValue;
  glassBox.style.webkitBackdropFilter = filterValue;
  glassBox.style.background = rgba;

  cssOutput.value =
`background: ${rgba};
backdrop-filter: ${filterValue};
-webkit-backdrop-filter: ${filterValue};`;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function copyCSS() {
  cssOutput.select();
  document.execCommand("copy");
}

function downloadCSS() {
  const blob = new Blob([cssOutput.value], { type: "text/css" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "backdrop-filter.css";
  link.click();
}

function resetAll() {
  document.getElementById("blur").value = 12;
  document.getElementById("brightness").value = 100;
  document.getElementById("contrast").value = 100;
  document.getElementById("saturate").value = 120;
  document.getElementById("hue").value = 0;
  document.getElementById("opacity").value = 0.15;
  document.getElementById("tint").value = "#ffffff";
  updateGlass();
}

updateGlass();