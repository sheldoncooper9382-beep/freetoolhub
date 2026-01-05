let stops = [
  { color: "#6366f1", pos: 0 },
  { color: "#4ade80", pos: 100 }
];

const preview = document.getElementById("preview");
const type = document.getElementById("type");
const angle = document.getElementById("angle");
const stopsContainer = document.getElementById("stops");
const cssOutput = document.getElementById("cssOutput");

function renderStops() {
  stopsContainer.innerHTML = "";
  stops.forEach((stop, index) => {
    const div = document.createElement("div");
    div.className = "stop";

    div.innerHTML = `
      <input type="color" value="${stop.color}" onchange="updateColor(${index}, this.value)">
      <input type="range" min="0" max="100" value="${stop.pos}" onchange="updatePos(${index}, this.value)">
      <span>${stop.pos}%</span>
      <button onclick="removeStop(${index})">×</button>
    `;

    stopsContainer.appendChild(div);
  });
}

function updateColor(index, value) {
  stops[index].color = value;
  updateGradient();
}

function updatePos(index, value) {
  stops[index].pos = value;
  renderStops();
  updateGradient();
}

function addStop() {
  stops.push({ color: "#ffffff", pos: 50 });
  renderStops();
  updateGradient();
}

function removeStop(index) {
  if (stops.length <= 2) return;
  stops.splice(index, 1);
  renderStops();
  updateGradient();
}

function reverseStops() {
  stops.reverse();
  renderStops();
  updateGradient();
}

function randomGradient() {
  stops = [
    { color: randomColor(), pos: 0 },
    { color: randomColor(), pos: 100 }
  ];
  renderStops();
  updateGradient();
}

function randomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
}

function updateGradient() {
  const sorted = [...stops].sort((a, b) => a.pos - b.pos);
  let gradient;

  if (type.value === "linear") {
    gradient = `linear-gradient(${angle.value}deg, ${sorted.map(s => `${s.color} ${s.pos}%`).join(", ")})`;
  } else {
    gradient = `radial-gradient(circle, ${sorted.map(s => `${s.color} ${s.pos}%`).join(", ")})`;
  }

  preview.style.background = gradient;
  cssOutput.value = `background: ${gradient};`;
}

type.addEventListener("change", updateGradient);
angle.addEventListener("input", updateGradient);

renderStops();
updateGradient();
