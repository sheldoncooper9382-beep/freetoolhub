let screen = document.getElementById("screen");
let modeLabel = document.getElementById("mode");

let memory = 0;
let shift = false;
let angleMode = "DEG";
let displayMode = "FIX";
let fixDigits = 4;

function toRadians(x) {
  if (angleMode === "DEG") return x * Math.PI / 180;
  if (angleMode === "GRAD") return x * Math.PI / 200;
  return x;
}

function factorial(n) {
  if (n < 0) return NaN;
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function nCr(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

function nPr(n, r) {
  return factorial(n) / factorial(n - r);
}

function formatResult(x) {
  if (displayMode === "SCI") return x.toExponential(fixDigits);
  if (displayMode === "ENG") {
    let e = Math.floor(Math.log10(Math.abs(x)) / 3) * 3;
    return (x / Math.pow(10, e)).toFixed(fixDigits) + "e" + e;
  }
  return Number(x.toFixed(fixDigits)).toString();
}

document.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => {
    const v = btn.textContent;
    const fn = btn.dataset.fn;
    const action = btn.dataset.action;
    const constant = btn.dataset.const;

    if (!isNaN(v) || v === "." || "+-*/()".includes(v)) {
      screen.value = screen.value === "0" ? v : screen.value + v;
    }

    if (constant === "pi") screen.value += Math.PI;
    if (constant === "e") screen.value += Math.E;

    if (action === "clear") screen.value = "0";
    if (action === "ce") screen.value = screen.value.slice(0, -1) || "0";
    if (action === "sign") screen.value = (-Number(screen.value)).toString();

    if (action === "shift") shift = !shift;

    if (action === "mode") {
      angleMode = angleMode === "DEG" ? "RAD" : angleMode === "RAD" ? "GRAD" : "DEG";
      modeLabel.textContent = angleMode;
    }

    if (action === "mc") memory = 0;
    if (action === "mr") screen.value = memory.toString();
    if (action === "mplus") memory += Number(screen.value);
    if (action === "mminus") memory -= Number(screen.value);

    if (fn) {
      let x = Number(screen.value);
      let r;

      switch (fn) {
        case "sin": r = shift ? Math.asin(x) : Math.sin(toRadians(x)); break;
        case "cos": r = shift ? Math.acos(x) : Math.cos(toRadians(x)); break;
        case "tan": r = shift ? Math.atan(x) : Math.tan(toRadians(x)); break;
        case "log": r = Math.log10(x); break;
        case "ln": r = Math.log(x); break;
        case "sqrt": r = Math.sqrt(x); break;
        case "square": r = x ** 2; break;
        case "inv": r = 1 / x; break;
        case "fact": r = factorial(x); break;
      }

      screen.value = formatResult(r);
      shift = false;
    }

    if (action === "equals") {
      try {
        screen.value = formatResult(eval(screen.value));
      } catch {
        screen.value = "ERROR";
      }
    }
  };
});
