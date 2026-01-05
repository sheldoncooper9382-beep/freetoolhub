const previewButton = document.getElementById("previewButton");
const cssOutput = document.getElementById("cssOutput");

function updateButton() {
  const text = document.getElementById("btnText").value;
  const width = document.getElementById("btnWidth").value;
  const height = document.getElementById("btnHeight").value;
  const fontSize = document.getElementById("btnFont").value;
  const radius = document.getElementById("btnRadius").value;
  const gradStart = document.getElementById("gradStart").value;
  const gradEnd = document.getElementById("gradEnd").value;
  const shadowX = document.getElementById("shadowX").value;
  const shadowY = document.getElementById("shadowY").value;
  const shadowBlur = document.getElementById("shadowBlur").value;
  const frosted = document.getElementById("frosted").checked;
  const neon = document.getElementById("neon").checked;
  const depth3d = document.getElementById("depth3d").checked;

  previewButton.textContent = text;
  let styles = `width:${width}px; height:${height}px; font-size:${fontSize}px; border-radius:${radius}px; `;
  styles += `background: linear-gradient(135deg, ${gradStart}, ${gradEnd}); `;

  // Frosted glass
  if(frosted) styles += `backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); background: rgba(255,255,255,0.1); `;

  // Shadow
  styles += `box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.5); `;

  // Neon
  if(neon) styles += `text-shadow: 0 0 8px ${gradEnd}, 0 0 16px ${gradEnd}; `;

  // 3D depth
  if(depth3d) styles += `transform: translateY(-2px); `;

  previewButton.style = styles;
  cssOutput.value = `button {\n  ${styles.replace(/; /g,";\n  ")}\n}`;
}

// Sync sliders with number inputs
function syncSliderNumber(sliderId, numberId){
  const slider = document.getElementById(sliderId);
  const number = document.getElementById(numberId);
  slider.addEventListener("input", ()=>{ number.value = slider.value; updateButton(); });
  number.addEventListener("input", ()=>{ slider.value = number.value; updateButton(); });
}
syncSliderNumber("btnWidth","btnWidthNum");
syncSliderNumber("btnHeight","btnHeightNum");
syncSliderNumber("btnFont","btnFontNum");
syncSliderNumber("btnRadius","btnRadiusNum");

// Copy CSS
function copyCSS(){
  cssOutput.select();
  document.execCommand("copy");
}

// Download CSS
function downloadCSS(){
  const blob = new Blob([cssOutput.value], {type: "text/css"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "button.css";
  link.click();
}

// Reset
function resetButton(){
  document.getElementById("btnText").value = "Click Me!";
  document.getElementById("btnWidth").value = 150;
  document.getElementById("btnWidthNum").value = 150;
  document.getElementById("btnHeight").value = 50;
  document.getElementById("btnHeightNum").value = 50;
  document.getElementById("btnFont").value = 16;
  document.getElementById("btnFontNum").value = 16;
  document.getElementById("btnRadius").value = 12;
  document.getElementById("btnRadiusNum").value = 12;
  document.getElementById("gradStart").value = "#ff6ec4";
  document.getElementById("gradEnd").value = "#7873f5";
  document.getElementById("shadowX").value = 5;
  document.getElementById("shadowY").value = 5;
  document.getElementById("shadowBlur").value = 15;
  document.getElementById("frosted").checked = false;
  document.getElementById("neon").checked = false;
  document.getElementById("depth3d").checked = false;
  updateButton();
}

// Initial update
updateButton();
