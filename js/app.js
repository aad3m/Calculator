
const display = document.getElementById("display");

function appendToDisplay(value) {
  if (value === '.') {

    // Ensure only one decimal point per number
    const currentInput = display.value.split(/[\+\-\*\/]/).pop();
    if (currentInput.includes('.')) {
      return;
    }
  }
  display.value += value;
}

function clearDisplay(){
  display.value = "";

}

function calculate(){
  try {
    display.value = eval(display.value);
  }
  catch(error){
    display.value = "Error";
  }

}

