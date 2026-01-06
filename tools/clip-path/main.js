const preview = document.getElementById("shapePreview");
const cssOutput = document.getElementById("cssOutput");
const shapeType = document.getElementById("shapeType");
const radius = document.getElementById("radius");
const sides = document.getElementById("sides");
const radiusControls = document.getElementById("radiusControls");
const polygonControls = document.getElementById("polygonControls");

shapeType.addEventListener("change", updateShape);
radius.addEventListener("input", updateShape);
sides.addEventListener("input", updateShape);

function updateShape() {
  let clipValue = "";

  radiusControls.classList.add("hidden");
  polygonControls.classList.add("hidden");

  switch (shapeType.value) {
    case "circle":
      radiusControls.classList.remove("hidden");
      clipValue = `circle(${radius.value}% at 50% 50%)`;
      break;

    case "ellipse":
      clipValue = `ellipse(40% 50% at 50% 50%)`;
      break;

    case "rounded":
      radiusControls.classList.remove("hidden");
      clipValue = `inset(0 round ${radius.value}px)`;
      break;

    case "triangle":
      clipValue = "polygon(50% 0%, 0% 100%, 100% 100%)";
      break;

    case "pentagon":
      clipValue = "polygon(50% 0%, 95% 35%, 77% 100%, 23% 100%, 5% 35%)";
      break;

    case "hexagon":
      clipValue = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
      break;

    case "polygon":
      polygonControls.classList.remove("hidden");
      clipValue = generatePolygon(sides.value);
      break;
  }

  preview.style.clipPath = clipValue;
  preview.style.webkitClipPath = clipValue;

  cssOutput.value =
`clip-path: ${clipValue};
-webkit-clip-path: ${clipValue};`;
}

function generatePolygon(count) {
  const points = [];
  const angleStep = (2 * Math.PI) / count;
  const radius = 50;
  const center = 50;

  for (let i = 0; i < count; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    points.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }

  return `polygon(${points.join(", ")})`;
}

function copyCSS() {
  cssOutput.select();
  document.execCommand("copy");
}

function downloadCSS() {
  const blob = new Blob([cssOutput.value], { type: "text/css" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "clip-path.css";
  link.click();
}

function resetAll() {
  shapeType.value = "circle";
  radius.value = 25;
  sides.value = 5;
  updateShape();
}

updateShape();