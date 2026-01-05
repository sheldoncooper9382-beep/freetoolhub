const preview = document.getElementById("preview");
const cssOutput = document.getElementById("cssOutput");

const xOffset = document.getElementById("xOffset");
const yOffset = document.getElementById("yOffset");
const blur = document.getElementById("blur");
const spread = document.getElementById("spread");
const shadowColor = document.getElementById("shadowColor");
const inset = document.getElementById("inset");
const alpha = document.getElementById("alpha");

const xOffsetNum = document.getElementById("xOffsetNum");
const yOffsetNum = document.getElementById("yOffsetNum");
const blurNum = document.getElementById("blurNum");
const spreadNum = document.getElementById("spreadNum");

// Sync sliders and numbers
function syncSliderNumber(slider, number) {
  slider.addEventListener("input", () => {
    number.value = slider.value;
    updateShadow();
  });
  number.addEventListener("input", () => {
    slider.value = number.value;
    updateShadow();
  });
}

syncSliderNumber(xOffset, xOffsetNum);
syncSliderNumber(yOffset, yOffsetNum);
syncSliderNumber(blur, blurNum);
syncSliderNumber(spread, spreadNum);

function updateShadow() {
  const rgbaColor = hexToRgba(shadowColor.value, alpha.value / 100);
  const insetText = inset.checked ? "inset " : "";
  const boxShadow = `${insetText}${xOffset.value}px ${yOffset.value}px ${blur.value}px ${spread.value}px ${rgbaColor}`;
  preview.style.boxShadow = boxShadow;
  cssOutput.value = `box-shadow: ${boxShadow};`;
}

function hexToRgba(hex, alpha) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function copyCSS() {
  cssOutput.select();
  document.execCommand("copy");
}

function resetShadow() {
  xOffset.value = xOffsetNum.value = 5;
  yOffset.value = yOffsetNum.value = 5;
  blur.value = blurNum.value = 15;
  spread.value = spreadNum.value = 0;
  shadowColor.value = "#000000";
  alpha.value = 50;
  inset.checked = false;
  updateShadow();
}

updateShadow();
