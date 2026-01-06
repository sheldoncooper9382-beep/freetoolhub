const textInput = document.getElementById('textInput');
const previewText = document.getElementById('previewText');
const presetSelect = document.getElementById('presetSelect');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const fontSize = document.getElementById('fontSize');
const applyBtn = document.getElementById('applyBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Apply gradient and text settings
applyBtn.addEventListener('click', () => {
  previewText.textContent = textInput.value;
  previewText.style.background = `linear-gradient(90deg, ${color1.value}, ${color2.value})`;
  previewText.style.fontSize = fontSize.value + 'px';
});

// Preset selection updates colors
presetSelect.addEventListener('change', () => {
  previewText.style.background = presetSelect.value;
  // Extract colors from preset
  const colors = presetSelect.value.match(/#([0-9a-f]{3,6})/gi);
  if (colors) {
    color1.value = colors[0];
    color2.value = colors[1];
  }
});

// Download preview as PNG
downloadBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontSizePx = parseInt(fontSize.value);
  canvas.width = previewText.offsetWidth * 2;
  canvas.height = previewText.offsetHeight * 2;

  ctx.scale(2, 2);
  ctx.font = `${fontSizePx}px Arial`;
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, color1.value);
  gradient.addColorStop(1, color2.value);
  
  ctx.fillStyle = gradient;
  ctx.fillText(textInput.value, 0, fontSizePx);

  const link = document.createElement('a');
  link.download = 'gradient-text.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
