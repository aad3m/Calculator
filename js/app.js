
const display = document.getElementById("display");
const clearButton = document.getElementById("clearButton");

let lastActionWasCalculation = false;

// Displays Value
function appendToDisplay(value) {
  if (lastActionWasCalculation === true) {
    clearDisplay();
  }

  if (value === '.') {
    const parts = display.value.split(/[\+\-\*\÷]/);
    const currentInput = parts[parts.length - 1];
    if (currentInput.includes('.')) {
      return;
    }
  }
  // Clear if Error
  if (display.value === "Error") {
    clearDisplay()
  }
  display.value += value;
  lastActionWasCalculation = false;
  updateClearButton();
}

// Clear Display
function clearDisplay() {
  display.value = "";
  lastActionWasCalculation = false;
  updateClearButton();
}

// Toggle Between Positive/Negative
function toggleSign() {
  if (display.value) {
    if (display.value.startsWith('-')){
      display.value = display.value.substring(1);
    } else {
      display.value = '-' + display.value;
    }
  }
}

// Calculate Value
function calculate(){
  let expression = display.value;

  expression = expression.replace(/÷/g, '/');
  expression = expression.replace(/×/g, '*');
  expression = expression.replace(/(\d+(\.\d+)?)(%)/g, (match, p1) => {
    return `(${p1} * 0.01)`;
  });
  expression = expression.replace(/(\d+(\.\d+)?)\s*-\s*\((\d+(\.\d+)? \* 0\.01)\)/g, '$1 - ($1 * $3)');
  expression = expression.replace(/(\d+(\.\d+)?)[+\-*/](\d+(\.\d+)? \* 0\.01)/g, '$1$2');

  try {
    const result = eval(expression)
    display.value = result
    if (!isFinite(result)) {
      throw new Error (Infinity)
    }
    display.value = result
    lastActionWasCalculation = true;
  } catch (error) {
    display.value = "Error"
    lastActionWasCalculation = false;
  }
  updateClearButton();
}

// Clear or Single Delete Value
function clearOrDelete() {
  if (lastActionWasCalculation) {
    clearDisplay();
  }else {
    if (display.value.length > 1) {
      display.value = display.value.slice(0, -1);

    } else {
      clearDisplay();
    }
  }
  updateClearButton();
}

// Update Button
function updateClearButton() {
  if (display.value.length > 0 && lastActionWasCalculation === false) {
    clearButton.innerText = '⌫';
  } else {
    clearButton.innerText = 'AC';
  }
}

