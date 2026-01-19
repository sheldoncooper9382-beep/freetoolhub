/*
 * calculator.js
 *
 * This file implements the core logic for the scientific calculator.
 * It includes a tokeniser, a shunting‑yard expression parser and
 * evaluator, as well as handlers for interactive operations such as
 * summation, product, derivative and numerical integration.  Memory
 * functions, degree/radian toggle and a simple history panel are
 * provided.  No external libraries are used; all mathematics is
 * handled via native JavaScript and carefully written helper
 * functions.  Errors during evaluation are caught and reported back
 * to the user through the display.
 */

(() => {
  'use strict';

  // DOM references
  const expressionDisplay = document.getElementById('expression');
  const resultDisplay = document.getElementById('result');
  const historyPanel = document.getElementById('history-panel');
  const historyList = document.getElementById('history-list');

  // Internal state variables
  let expression = '';
  let lastResult = 0;
  let memory = 0;
  // degMode: false = radians, true = degrees
  let degMode = false;

  /**
   * Update the expression and result areas of the display.  A
   * non‑breaking space (&nbsp;) is used when the expression is empty
   * so the layout remains stable.
   */
  function updateDisplay() {
    expressionDisplay.textContent = expression.trim() === '' ? '\u00A0' : expression;
    // Always show the last calculated result
    resultDisplay.textContent = String(lastResult);
  }

  /**
   * Append a piece of text directly to the expression string.
   * @param {string} txt
   */
  function appendToExpression(txt) {
    expression += txt;
    updateDisplay();
  }

  /**
   * Clears the entire expression and resets the result display to 0.
   */
  function clearAll() {
    expression = '';
    lastResult = 0;
    updateDisplay();
  }

  /**
   * Clears the current expression but keeps the last result.  Used
   * for the CE button.
   */
  function clearEntry() {
    expression = '';
    updateDisplay();
  }

  /**
   * Remove the last character from the expression string.
   */
  function backspace() {
    if (expression.length > 0) {
      expression = expression.slice(0, -1);
      updateDisplay();
    }
  }

  /**
   * Negate the current result.  If the expression is empty we negate
   * the last result; otherwise we evaluate the expression and
   * multiply by -1.  The expression is then replaced with that
   * negated number so further operations may continue.
   */
  function negate() {
    try {
      let val;
      if (expression.trim() !== '') {
        val = evaluateExpression(expression);
      } else {
        val = lastResult;
      }
      if (isNaN(val) || !isFinite(val)) {
        throw new Error('Cannot negate value');
      }
      val = -val;
      lastResult = val;
      expression = String(val);
      updateDisplay();
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Copy the current result to the clipboard using the Clipboard API.
   */
  function copyResultToClipboard() {
    const text = String(lastResult);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Optionally provide feedback
      })
      .catch(() => {
        showError('Clipboard copy failed');
      });
  }

  /**
   * Toggle between degree and radian modes for trigonometric
   * functions.  The button label is updated accordingly.
   */
  function toggleDegRad(button) {
    degMode = !degMode;
    button.textContent = degMode ? 'DEG' : 'RAD';
  }

  /**
   * Toggle the visibility of the history panel.  The panel slides in
   * and out via CSS transform transitions.  An aria-hidden attribute
   * is updated for accessibility.
   */
  function toggleHistoryPanel() {
    const isOpen = historyPanel.classList.toggle('open');
    historyPanel.setAttribute('aria-hidden', !isOpen);
  }

  /**
   * Record a calculation into the history panel.  A list item is
   * created with the original expression and the computed result.
   * @param {string} expr The expression string entered
   * @param {number|string} result The result of evaluating the expression
   */
  function addHistoryEntry(expr, result) {
    const li = document.createElement('li');
    const exprSpan = document.createElement('span');
    exprSpan.className = 'expr';
    exprSpan.textContent = expr;
    const resSpan = document.createElement('span');
    resSpan.className = 'res';
    resSpan.textContent = result;
    li.appendChild(exprSpan);
    li.appendChild(resSpan);
    historyList.prepend(li);
  }

  /**
   * Memory operations: clear, recall, add, subtract.  The memory
   * register persists across calculations but is reset on full clear.
   */
  function memoryClear() {
    memory = 0;
  }
  function memoryRecall() {
    appendToExpression(String(memory));
  }
  function memoryAdd() {
    memory += Number(lastResult);
  }
  function memorySubtract() {
    memory -= Number(lastResult);
  }

  /**
   * Interactive nth root handler.  This prompts the user for the
   * degree of the root and then computes (current expression or
   * result) raised to the power 1/n.  The expression is replaced
   * with the computed value.
   */
  function handleNthRoot() {
    try {
      const baseVal = expression.trim() !== '' ? evaluateExpression(expression) : lastResult;
      const nInput = prompt('Enter the degree n for the nth root (positive integer):');
      if (nInput === null) return;
      const n = Number(nInput);
      if (!Number.isInteger(n) || n <= 0) {
        throw new Error('Invalid root degree');
      }
      if (baseVal < 0 && n % 2 === 0) {
        throw new Error('Even root of negative number');
      }
      const result = Math.pow(baseVal, 1 / n);
      lastResult = result;
      expression = String(result);
      updateDisplay();
      addHistoryEntry(`${n}\u221A(${baseVal})`, result);
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Factorial handler.  Evaluates the current expression or last
   * result and computes the factorial if valid.  Only defined for
   * non‑negative integers up to a sensible limit.
   */
  function handleFactorial() {
    try {
      const val = expression.trim() !== '' ? evaluateExpression(expression) : lastResult;
      if (!Number.isInteger(val) || val < 0) {
        throw new Error('Factorial defined for non‑negative integers');
      }
      const maxN = 170; // beyond this, factorial overflows to Infinity in JS
      if (val > maxN) {
        throw new Error('Number too large');
      }
      let result = 1;
      for (let i = 2; i <= val; i++) result *= i;
      lastResult = result;
      expression = String(result);
      updateDisplay();
      addHistoryEntry(`${val}!`, result);
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Square or cube the current expression.  Immediately evaluates
   * then raises to the second or third power.  After computing,
   * updates the expression and history.
   * @param {number} power 2 for square, 3 for cube
   */
  function handlePowerImmediate(power) {
    try {
      const baseVal = expression.trim() !== '' ? evaluateExpression(expression) : lastResult;
      const result = Math.pow(baseVal, power);
      lastResult = result;
      expression = String(result);
      updateDisplay();
      const symbol = power === 2 ? '²' : '³';
      addHistoryEntry(`${baseVal}${symbol}`, result);
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Summation handler.  Prompts the user for start, end and an
   * expression in the index variable i.  Uses the evaluator to
   * compute each term.  The result is displayed and recorded.
   */
  function handleSummation() {
    try {
      const startInput = prompt('Summation: enter start index (integer):');
      if (startInput === null) return;
      const endInput = prompt('Summation: enter end index (integer):');
      if (endInput === null) return;
      const exprInput = prompt('Summation: enter the expression in terms of i (e.g., i^2 + 3*i)');
      if (exprInput === null) return;
      const start = Number(startInput);
      const end = Number(endInput);
      if (!Number.isInteger(start) || !Number.isInteger(end)) {
        throw new Error('Invalid indices');
      }
      let sum = 0;
      for (let i = start; start <= end ? i <= end : i >= end; start <= end ? i++ : i--) {
        const variables = { i: i };
        const term = evaluateExpression(exprInput, variables);
        if (!isFinite(term)) {
          throw new Error('Term is not finite');
        }
        sum += term;
      }
      lastResult = sum;
      expression = String(sum);
      updateDisplay();
      addHistoryEntry(`Σ_{i=${start}}^{${end}} (${exprInput})`, sum);
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Product handler.  Similar to the summation but multiplies terms.
   */
  function handleProduct() {
    try {
      const startInput = prompt('Product: enter start index (integer):');
      if (startInput === null) return;
      const endInput = prompt('Product: enter end index (integer):');
      if (endInput === null) return;
      const exprInput = prompt('Product: enter the expression in terms of i');
      if (exprInput === null) return;
      const start = Number(startInput);
      const end = Number(endInput);
      if (!Number.isInteger(start) || !Number.isInteger(end)) {
        throw new Error('Invalid indices');
      }
      let prod = 1;
      for (let i = start; start <= end ? i <= end : i >= end; start <= end ? i++ : i--) {
        const variables = { i: i };
        const term = evaluateExpression(exprInput, variables);
        if (!isFinite(term)) {
          throw new Error('Term is not finite');
        }
        prod *= term;
      }
      lastResult = prod;
      expression = String(prod);
      updateDisplay();
      addHistoryEntry(`Π_{i=${start}}^{${end}} (${exprInput})`, prod);
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Derivative handler.  Prompts the user for a function in x and a
   * point at which to evaluate the derivative.  A central difference
   * approximation is used with a small step size.
   */
  function handleDerivative() {
    try {
      const exprInput = prompt('Derivative: enter a function of x (e.g., x^3 + 2*x)');
      if (exprInput === null) return;
      const x0Input = prompt('Derivative: enter the point x₀ at which to evaluate');
      if (x0Input === null) return;
      const x0 = Number(x0Input);
      if (!isFinite(x0)) {
        throw new Error('Invalid point');
      }
      const h = 1e-5;
      const f = (x) => evaluateExpression(exprInput, { x: x });
      const derivative = (f(x0 + h) - f(x0 - h)) / (2 * h);
      lastResult = derivative;
      expression = String(derivative);
      updateDisplay();
      addHistoryEntry(`d/dx ${exprInput} | x=${x0}`, derivative);
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Integral handler.  Prompts the user for a function in x and the
   * lower and upper limits of integration.  Uses the composite
   * Simpson's rule when the number of intervals is even; falls back
   * to the trapezoidal rule for odd counts.  A fixed number of
   * subdivisions is used.
   */
  function handleIntegral() {
    try {
      const exprInput = prompt('Integral: enter a function of x');
      if (exprInput === null) return;
      const aInput = prompt('Integral: enter the lower limit a');
      if (aInput === null) return;
      const bInput = prompt('Integral: enter the upper limit b');
      if (bInput === null) return;
      let a = Number(aInput);
      let b = Number(bInput);
      if (!isFinite(a) || !isFinite(b)) {
        throw new Error('Invalid limits');
      }
      // Swap if needed
      const swapped = a > b;
      if (swapped) {
        [a, b] = [b, a];
      }
      const f = (x) => evaluateExpression(exprInput, { x: x });
      const n = 200; // number of intervals (even for Simpson's)
      const h = (b - a) / n;
      let sum = f(a) + f(b);
      for (let i = 1; i < n; i++) {
        const x = a + i * h;
        sum += (i % 2 === 0 ? 2 : 4) * f(x);
      }
      let result = (h / 3) * sum;
      if (swapped) result = -result;
      lastResult = result;
      expression = String(result);
      updateDisplay();
      addHistoryEntry(`∫_${aInput}^{${bInput}} (${exprInput}) dx`, result);
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Evaluate the given mathematical expression using the shunting‑yard
   * algorithm and RPN evaluation.  Optionally accepts a map of
   * variable values for substitution (e.g., {i: 5}).  Throws an
   * Error if the expression is invalid or a computation cannot be
   * performed.  Functions and operators supported are documented in
   * the readme.  Note that this evaluator does not use eval() and
   * thus is safe against arbitrary code execution.
   *
   * @param {string} expr The expression to evaluate
   * @param {Object.<string, number>} [variables] Optional variables
   * @returns {number} The numeric result
   */
  function evaluateExpression(expr, variables = {}) {
    // Tokenise the expression into an array of tokens
    const tokens = tokenize(expr);
    const rpn = toRPN(tokens);
    return evalRPN(rpn, variables);
  }

  /**
   * Tokenise an expression string into a sequence of tokens.  Each
   * token is an object with a type and a value.  Types include
   * 'number', 'operator', 'paren', 'comma', 'func', and 'variable'.
   * @param {string} expr
   * @returns {Array<{type: string, value: any}>}
   */
  function tokenize(expr) {
    const tokens = [];
    let i = 0;
    while (i < expr.length) {
      const ch = expr[i];
      if (ch === ' ') {
        i++;
        continue;
      }
      // Handle unary minus before a parenthesis or function/variable
      if (ch === '-' && (i === 0 || isOperatorOrParen(tokens[tokens.length - 1])) && expr[i + 1] && !/[0-9.]/.test(expr[i + 1])) {
        // Insert a zero and treat minus as binary subtraction
        tokens.push({ type: 'number', value: 0 });
        tokens.push({ type: 'operator', value: '-' });
        i++;
        continue;
      }
      // Numbers: digits, decimal points, optional exponent (E±digits)
      if (/[0-9.]/.test(ch) || (ch === '-' && (i === 0 || isOperatorOrParen(tokens[tokens.length - 1])) && /[0-9.]/.test(expr[i + 1]))) {
        let numStr = '';
        // handle leading minus for negative numbers
        if (ch === '-') {
          numStr += '-';
          i++;
        }
        let dotCount = 0;
        while (i < expr.length) {
          const c = expr[i];
          if (/[0-9]/.test(c)) {
            numStr += c;
            i++;
          } else if (c === '.') {
            if (dotCount > 0) break;
            dotCount++;
            numStr += c;
            i++;
          } else {
            break;
          }
        }
        // Exponent part (E notation). Accept uppercase E only to avoid confusion with constant 'e'.
        if (i < expr.length && expr[i] === 'E') {
          numStr += 'E';
          i++;
          if (i < expr.length && (expr[i] === '+' || expr[i] === '-')) {
            numStr += expr[i];
            i++;
          }
          let expDigits = '';
          while (i < expr.length && /[0-9]/.test(expr[i])) {
            expDigits += expr[i];
            i++;
          }
          if (expDigits === '') {
            throw new Error('Invalid exponent');
          }
          numStr += expDigits;
        }
        const num = parseFloat(numStr);
        if (!isFinite(num)) {
          throw new Error('Invalid number');
        }
        tokens.push({ type: 'number', value: num });
        continue;
      }
      // Functions and variables: sequences of letters (and underscores)
      if (/[a-zA-Z]/.test(ch)) {
        let ident = '';
        while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
          ident += expr[i];
          i++;
        }
        // Determine if ident is a function, constant, operator or variable
        const lower = ident.toLowerCase();
        // Special multi‑letter operators
        if (lower === 'npr') {
          tokens.push({ type: 'operator', value: 'nPr' });
        } else if (lower === 'ncr') {
          tokens.push({ type: 'operator', value: 'nCr' });
        } else if (lower === 'mod') {
          tokens.push({ type: 'operator', value: 'mod' });
        } else if (lower === 'pi') {
          tokens.push({ type: 'number', value: Math.PI });
        } else if (lower === 'e' && ident === 'e') {
          // lower case 'e' constant; we treat uppercase 'E' as exponent in number
          tokens.push({ type: 'number', value: Math.E });
        } else if (functionArgCount.hasOwnProperty(lower)) {
          tokens.push({ type: 'func', value: lower });
        } else {
          // treat unknown identifiers as variables
          tokens.push({ type: 'variable', value: ident });
        }
        continue;
      }
      // Operators and punctuation
      switch (ch) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
          tokens.push({ type: 'operator', value: ch });
          i++;
          break;
        case '!':
          tokens.push({ type: 'operator', value: '!' });
          i++;
          break;
        case '(': 
        case ')':
          tokens.push({ type: 'paren', value: ch });
          i++;
          break;
        case ',':
          tokens.push({ type: 'comma', value: ch });
          i++;
          break;
        // Multi‑character operators: nPr, nCr, mod handled above as function/variable (letters)
        default:
          throw new Error(`Unrecognised token '${ch}'`);
      }
    }
    return tokens;
  }

  /**
   * Determine if the given token is an operator or left parenthesis.  Used to
   * detect unary minus in number parsing.
   * @param {Object|undefined} token
   */
  function isOperatorOrParen(token) {
    if (!token) return true;
    return token.type === 'operator' || token.type === 'paren' || token.type === 'comma';
  }

  // Precedence and associativity of operators.  Higher number means higher precedence.
  const operatorPrecedence = {
    '!': 5,
    '^': 4,
    'nPr': 3,
    'nCr': 3,
    'mod': 3,
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2
  };
  const operatorAssociativity = {
    '!': 'right',
    '^': 'right',
    'nPr': 'left',
    'nCr': 'left',
    'mod': 'left',
    '*': 'left',
    '/': 'left',
    '+': 'left',
    '-': 'left'
  };

  // Recognised functions and their argument counts.  Lowercase names only.
  const functionArgCount = {
    sin: 1,
    cos: 1,
    tan: 1,
    asin: 1,
    acos: 1,
    atan: 1,
    ln: 1,
    log: 1, // we allow log(x) as log base 10
    log10: 1, // alias for base 10
    abs: 1,
    sqrt: 1
    // Note: square, cube, nthRoot and other interactive functions are handled separately
  };

  /**
   * Convert tokens into Reverse Polish Notation using the shunting‑yard algorithm.
   * Supports functions, parentheses and operator precedence/associativity.
   * @param {Array} tokens
   * @returns {Array} RPN output queue
   */
  function toRPN(tokens) {
    const output = [];
    const stack = [];
    for (const token of tokens) {
      switch (token.type) {
        case 'number':
        case 'variable':
          output.push(token);
          break;
        case 'func':
          stack.push(token);
          break;
        case 'comma':
          // Pop operators to output until left parenthesis is found
          while (stack.length && stack[stack.length - 1].type !== 'paren') {
            output.push(stack.pop());
          }
          if (!stack.length) {
            throw new Error('Mismatched parentheses');
          }
          break;
        case 'operator':
          let o1 = token.value;
          while (stack.length) {
            const top = stack[stack.length - 1];
            if (top.type === 'operator') {
              const o2 = top.value;
              const prec1 = operatorPrecedence[o1] || 0;
              const prec2 = operatorPrecedence[o2] || 0;
              const assoc1 = operatorAssociativity[o1] || 'left';
              if ((assoc1 === 'left' && prec1 <= prec2) || (assoc1 === 'right' && prec1 < prec2)) {
                output.push(stack.pop());
                continue;
              }
            } else if (top.type === 'func') {
              output.push(stack.pop());
              continue;
            }
            break;
          }
          stack.push(token);
          break;
        case 'paren':
          if (token.value === '(') {
            stack.push(token);
          } else if (token.value === ')') {
            // Pop until '(' encountered
            let foundLeft = false;
            while (stack.length) {
              const t = stack.pop();
              if (t.type === 'paren' && t.value === '(') {
                foundLeft = true;
                break;
              }
              output.push(t);
            }
            if (!foundLeft) {
              throw new Error('Mismatched parentheses');
            }
            // If top of stack is a function, pop it to output
            if (stack.length && stack[stack.length - 1].type === 'func') {
              output.push(stack.pop());
            }
          }
          break;
        default:
          throw new Error('Unknown token type');
      }
    }
    // Pop remaining items
    while (stack.length) {
      const t = stack.pop();
      if (t.type === 'paren') {
        throw new Error('Mismatched parentheses');
      }
      output.push(t);
    }
    return output;
  }

  /**
   * Evaluate an RPN token list with optional variable substitutions.
   * @param {Array} rpn
   * @param {Object} variables
   * @returns {number}
   */
  function evalRPN(rpn, variables) {
    const stack = [];
    for (const token of rpn) {
      if (token.type === 'number') {
        stack.push(token.value);
      } else if (token.type === 'variable') {
        const varName = token.value;
        if (!(varName in variables)) {
          throw new Error(`Unknown variable '${varName}'`);
        }
        stack.push(variables[varName]);
      } else if (token.type === 'operator') {
        const op = token.value;
        if (op === '!') {
          // factorial is unary postfix
          if (stack.length < 1) throw new Error('Missing operand for !');
          const a = stack.pop();
          if (!Number.isInteger(a) || a < 0) {
            throw new Error('Factorial defined for non‑negative integers');
          }
          let result = 1;
          if (a > 170) {
            // beyond 170, factorial overflows to Infinity
            result = Infinity;
          } else {
            for (let i = 2; i <= a; i++) result *= i;
          }
          stack.push(result);
          continue;
        }
        // binary operators
        if (stack.length < 2) throw new Error('Missing operand');
        const b = stack.pop();
        const a = stack.pop();
        let result;
        switch (op) {
          case '+':
            result = a + b;
            break;
          case '-':
            result = a - b;
            break;
          case '*':
            result = a * b;
            break;
          case '/':
            if (b === 0) throw new Error('Division by zero');
            result = a / b;
            break;
          case '^':
            result = Math.pow(a, b);
            break;
          case 'mod':
            if (b === 0) throw new Error('Division by zero');
            result = a % b;
            break;
          case 'nPr':
            if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) {
              throw new Error('nPr requires non‑negative integers');
            }
            if (b > a) {
              result = 0;
            } else {
              result = 1;
              for (let i = 0; i < b; i++) result *= (a - i);
            }
            break;
          case 'nCr':
            if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) {
              throw new Error('nCr requires non‑negative integers');
            }
            if (b > a) {
              result = 0;
            } else {
              // nCr = nPr / r!
              let numerator = 1;
              for (let i = 0; i < b; i++) numerator *= (a - i);
              let denom = 1;
              for (let i = 2; i <= b; i++) denom *= i;
              result = numerator / denom;
            }
            break;
          default:
            throw new Error(`Unknown operator ${op}`);
        }
        stack.push(result);
      } else if (token.type === 'func') {
        const funcName = token.value;
        const argCount = functionArgCount[funcName];
        if (stack.length < argCount) {
          throw new Error(`Missing argument for ${funcName}`);
        }
        const args = [];
        for (let i = 0; i < argCount; i++) {
          args.unshift(stack.pop());
        }
        let result;
        switch (funcName) {
          case 'sin':
            result = Math.sin(degMode ? args[0] * Math.PI / 180 : args[0]);
            break;
          case 'cos':
            result = Math.cos(degMode ? args[0] * Math.PI / 180 : args[0]);
            break;
          case 'tan':
            result = Math.tan(degMode ? args[0] * Math.PI / 180 : args[0]);
            break;
          case 'asin':
            if (args[0] < -1 || args[0] > 1) throw new Error('Domain error');
            result = degMode ? Math.asin(args[0]) * 180 / Math.PI : Math.asin(args[0]);
            break;
          case 'acos':
            if (args[0] < -1 || args[0] > 1) throw new Error('Domain error');
            result = degMode ? Math.acos(args[0]) * 180 / Math.PI : Math.acos(args[0]);
            break;
          case 'atan':
            result = degMode ? Math.atan(args[0]) * 180 / Math.PI : Math.atan(args[0]);
            break;
          case 'ln':
            if (args[0] <= 0) throw new Error('Domain error');
            result = Math.log(args[0]);
            break;
          case 'log':
          case 'log10':
            if (args[0] <= 0) throw new Error('Domain error');
            result = Math.log10 ? Math.log10(args[0]) : Math.log(args[0]) / Math.LN10;
            break;
          case 'abs':
            result = Math.abs(args[0]);
            break;
          case 'sqrt':
            if (args[0] < 0) throw new Error('Domain error');
            result = Math.sqrt(args[0]);
            break;
          default:
            throw new Error(`Unknown function ${funcName}`);
        }
        stack.push(result);
      } else {
        throw new Error('Unsupported token in RPN');
      }
    }
    if (stack.length !== 1) {
      throw new Error('Invalid expression');
    }
    const out = stack[0];
    if (typeof out !== 'number' || !isFinite(out)) {
      throw new Error('Computation resulted in non‑finite number');
    }
    return out;
  }

  /**
   * Show an error message on the result display and reset lastResult to 0.
   * @param {string} message
   */
  function showError(message) {
    lastResult = 'Error';
    expression = '';
    resultDisplay.textContent = 'Error';
    expressionDisplay.textContent = message;
  }

  /**
   * Evaluate the current expression when the equals button is clicked.
   */
  function handleEquals() {
    if (expression.trim() === '') {
      return;
    }
    try {
      const result = evaluateExpression(expression);
      lastResult = result;
      addHistoryEntry(expression, result);
      expression = String(result);
      updateDisplay();
    } catch (err) {
      showError(err.message);
    }
  }

  /**
   * Append an operator or custom operator (nPr, nCr, mod) into the expression.
   * Insert a space before the operator if needed to separate tokens.
   * @param {string} op
   */
  function inputOperator(op) {
    // Surround operators with whitespace to ensure token boundaries.
    // Trim any trailing spaces first to avoid accumulating multiple spaces.
    expression = expression.replace(/\s+$/, '');
    expression += ' ' + op + ' ';
    updateDisplay();
  }

  /**
   * Append a function call to the expression by adding the function
   * name followed by an opening parenthesis.  The user is expected
   * to provide the argument and closing parenthesis.
   * @param {string} func
   */
  function inputFunction(func) {
    // For unary functions we append func(
    expression += func + '(';
    updateDisplay();
  }

  /**
   * Append a parenthesis to the expression.
   * @param {string} paren
   */
  function inputParenthesis(paren) {
    expression += paren;
    updateDisplay();
  }

  /**
   * Append a digit or decimal point to the expression.
   * @param {string} value
   */
  function inputDigit(value) {
    expression += value;
    updateDisplay();
  }

  /**
   * Append a constant (pi or e) to the expression.  Constants are
   * represented by their names and interpreted by the tokenizer.
   * @param {string} name
   */
  function inputConstant(name) {
    expression += name;
    updateDisplay();
  }

  /**
   * Use the last result in the expression.  Inserts the last
   * computed result into the expression.
   */
  function useAnswer() {
    expression += String(lastResult);
    updateDisplay();
  }

  /**
   * Global click handler to delegate button actions based on
   * data‑attributes.  All buttons in the grid are targeted here.
   */
  function handleButtonClick(event) {
    const target = event.target;
    if (!target.classList.contains('btn')) return;
    const value = target.getAttribute('data-value');
    const action = target.getAttribute('data-action');
    if (value !== null) {
      if (target.classList.contains('digit-btn')) {
        inputDigit(value);
      } else if (target.classList.contains('operator-btn')) {
        inputOperator(value);
      } else if (target.classList.contains('constant-btn')) {
        inputConstant(value);
      }
      return;
    }
    if (action) {
      switch (action) {
        case 'clear':
          clearAll();
          break;
        case 'clearEntry':
          clearEntry();
          break;
        case 'backspace':
          backspace();
          break;
        case 'negate':
          negate();
          break;
        case 'copyResult':
          copyResultToClipboard();
          break;
        case 'memoryClear':
          memoryClear();
          break;
        case 'memoryRecall':
          memoryRecall();
          break;
        case 'memoryAdd':
          memoryAdd();
          break;
        case 'memorySubtract':
          memorySubtract();
          break;
        case 'toggleDegRad':
          toggleDegRad(target);
          break;
        case 'toggleHistory':
          toggleHistoryPanel();
          break;
        case 'equals':
          handleEquals();
          break;
        case 'abs':
          inputFunction('abs');
          break;
        case 'sqrt':
          inputFunction('sqrt');
          break;
        case 'square':
          handlePowerImmediate(2);
          break;
        case 'cube':
          handlePowerImmediate(3);
          break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'asin':
        case 'acos':
        case 'atan':
        case 'ln':
        case 'log10':
          // map log10 to log
          const funcName = action === 'log10' ? 'log' : action;
          inputFunction(funcName);
          break;
        case 'nthRoot':
          handleNthRoot();
          break;
        case 'summation':
          handleSummation();
          break;
        case 'product':
          handleProduct();
          break;
        case 'derivative':
          handleDerivative();
          break;
        case 'integral':
          handleIntegral();
          break;
        case 'answer':
          useAnswer();
          break;
        case 'factorial':
          handleFactorial();
          break;
        default:
          console.warn('Unknown action:', action);
      }
      return;
    }
  }

  // Attach event listener to the entire calculator element for event
  // delegation.  This ensures that dynamically added elements in
  // history will not trigger unintended actions.
  document.getElementById('calculator').addEventListener('click', handleButtonClick);

  // Initialize display
  updateDisplay();
})();
