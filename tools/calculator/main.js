const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");

let memory = 0;
let expression = "";

function updateScreen(value) {
  screen.textContent = value || "0";
}

function factorial(n) {
  n = Math.floor(n);
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) result *= i;
  return result;
}

function evaluateExpression(expr) {
  expr = expr
    .replace(/π/g, Math.PI)
    .replace(/e/g, Math.E)
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/√/g, "Math.sqrt")
    .replace(/sin/g, "Math.sin")
    .replace(/cos/g, "Math.cos")
    .replace(/tan/g, "Math.tan")
    .replace(/asin/g, "Math.asin")
    .replace(/acos/g, "Math.acos")
    .replace(/atan/g, "Math.atan")
    .replace(/log/g, "Math.log10")
    .replace(/ln/g, "Math.log")
    .replace(/(\d+)!/g, (_, n) => factorial(n));

  return Function(`"use strict"; return (${expr})`)();
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "C") {
      expression = "";
      updateScreen(expression);
      return;
    }

    if (action === "=") {
      try {
        expression = evaluateExpression(expression).toString();
      } catch {
        expression = "Error";
      }
      updateScreen(expression);
      return;
    }

    if (action === "MC") {
      memory = 0;
      return;
    }

    if (action === "MR") {
      expression += memory;
      updateScreen(expression);
      return;
    }

    if (action === "M+") {
      memory += Number(expression) || 0;
      return;
    }

    if (action === "M-") {
      memory -= Number(expression) || 0;
      return;
    }

    expression += action;
    updateScreen(expression);
  });
});
