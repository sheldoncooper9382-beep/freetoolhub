let screen = document.getElementById('screen');
let memory = 0;
let currentInput = '';

const functions = {
  'pi': Math.PI,
  'e': Math.E,
  'sin': (x) => Math.sin(x),
  'cos': (x) => Math.cos(x),
  'tan': (x) => Math.tan(x),
  'asin': (x) => Math.asin(x),
  'acos': (x) => Math.acos(x),
  'atan': (x) => Math.atan(x),
  'log': (x) => Math.log10(x),
  'ln': (x) => Math.log(x),
  'exp': (x) => Math.exp(x),
  'sqrt': (x) => Math.sqrt(x),
  'pow': (x, y) => Math.pow(x, y),
  '!': factorial
};

function factorial(n) {
  n = Math.floor(n);
  if(n < 0) return NaN;
  if(n === 0) return 1;
  let res = 1;
  for(let i = 1; i <= n; i++) res *= i;
  return res;
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => handleInput(btn.dataset.action));
});

function handleInput(value) {
  if(value === 'C') {
    currentInput = '';
  } else if(value === '=') {
    try {
      currentInput = evaluate(currentInput).toString();
    } catch {
      currentInput = 'Error';
    }
  } else if(value === 'MC') {
    memory = 0;
  } else if(value === 'MR') {
    currentInput += memory;
  } else if(value === 'M+') {
    memory += parseFloat(currentInput) || 0;
  } else if(value === 'M-') {
    memory -= parseFloat(currentInput) || 0;
  } else {
    currentInput += value;
  }
  screen.textContent = currentInput || '0';
}

// Basic evaluation function
function evaluate(expr) {
  expr = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/π/g, Math.PI).replace(/e/g, Math.E);
  // handle factorial
  expr = expr.replace(/(\d+)!/g, (_, n) => factorial(n));
  return Function('"use strict";return (' + expr + ')')();
}

