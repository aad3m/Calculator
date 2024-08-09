
const display = document.getElementById("display");


// Shows Value
function appendToDisplay(value) {
  if (value === '.') {
    const currentInput = display.value.split(/[\+\-\*\÷]/).pop();
    if (currentInput.includes('.')) {
      return;
    }
  }
  if (display.value === "Error") {
    clearDisplay()
  }
  display.value += value;
  updateClearButton();
}

function clearDisplay() {
  display.value = "";
}

function toggleSign() {
  if (display.value) {
    if (display.value.startsWith('-')){
      display.value = display.value.substring(1);
    } else {
      display.value = '-' + display.value;
    }
  }
}

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
  } catch (error) {
    display.value = "Error"
  }
  updateClearButton();
}

function clearOrDelete() {
  if (display.value.length > 1) {

    display.value = display.value.slice(0, -1);
  } else {
    display.value = "";
  }
  updateClearButton();
}

function updateClearButton() {
  if (display.value.length > 0) {
    clearButton.innerText = '⌫';
  } else {
    clearButton.innerText = 'C';
  }
}
