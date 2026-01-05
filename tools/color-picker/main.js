const colorInput = document.getElementById("colorInput");
const preview = document.getElementById("preview");
const hexField = document.getElementById("hex");
const rgbField = document.getElementById("rgb");
const hslField = document.getElementById("hsl");

function updateColor() {
  const hex = colorInput.value;
  preview.style.background = hex;
  hexField.value = hex.toUpperCase();

  const rgb = hexToRgb(hex);
  rgbField.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hslField.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h = Math.round(h * 60);
  }

  return {
    h,
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function copy(id) {
  const field = document.getElementById(id);
  field.select();
  document.execCommand("copy");
}

colorInput.addEventListener("input", updateColor);
updateColor();
