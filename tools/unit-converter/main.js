const units = {
  length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34
  },

  area: {
    "m²": 1,
    "km²": 1e6,
    "cm²": 0.0001,
    "ft²": 0.092903,
    acre: 4046.86
  },

  volume: {
    L: 1,
    mL: 0.001,
    "m³": 1000,
    gal: 3.78541,
    qt: 0.946353
  },

  weight: {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495
  },

  temperature: {
    C: "C",
    F: "F",
    K: "K"
  },

  speed: {
    "m/s": 1,
    "km/h": 0.277778,
    mph: 0.44704,
    knot: 0.514444
  },

  time: {
    s: 1,
    min: 60,
    h: 3600,
    day: 86400
  },

  energy: {
    J: 1,
    kJ: 1000,
    cal: 4.184,
    kWh: 3600000
  },

  power: {
    W: 1,
    kW: 1000,
    hp: 745.7
  },

  pressure: {
    Pa: 1,
    kPa: 1000,
    bar: 100000,
    psi: 6894.76
  },

  data: {
    B: 1,
    KB: 1024,
    MB: 1048576,
    GB: 1073741824
  },

  angle: {
    deg: 1,
    rad: 57.2958
  },

  frequency: {
    Hz: 1,
    kHz: 1000,
    MHz: 1000000
  }
};

function updateUnits() {
  const category = document.getElementById("category").value;
  const from = document.getElementById("fromUnit");
  const to = document.getElementById("toUnit");

  from.innerHTML = "";
  to.innerHTML = "";

  for (let unit in units[category]) {
    from.innerHTML += `<option value="${unit}">${unit}</option>`;
    to.innerHTML += `<option value="${unit}">${unit}</option>`;
  }

  convert();
}

function convert() {
  const category = document.getElementById("category").value;
  const value = parseFloat(document.getElementById("inputValue").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;

  if (isNaN(value)) return;

  let result;

  if (category === "temperature") {
    result = convertTemperature(value, from, to);
  } else {
    result = value * units[category][from] / units[category][to];
  }

  document.getElementById("result").textContent = result.toFixed(6);
}

function convertTemperature(value, from, to) {
  let celsius;

  if (from === "C") celsius = value;
  if (from === "F") celsius = (value - 32) * 5/9;
  if (from === "K") celsius = value - 273.15;

  if (to === "C") return celsius;
  if (to === "F") return celsius * 9/5 + 32;
  if (to === "K") return celsius + 273.15;
}

updateUnits();
