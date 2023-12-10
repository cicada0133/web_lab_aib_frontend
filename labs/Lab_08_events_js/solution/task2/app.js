const redInput = document.getElementById('red-input');
const greenInput = document.getElementById('green-input');
const blueInput = document.getElementById('blue-input');
const applyBtn = document.getElementById('apply-btn');
const colorBox = document.getElementById('color-box');


function validateInput(input) {
  if (isNaN(input.value) || input.value < 0 || input.value > 255) {
    input.classList.add('error');
    return false;
  } else {
    input.classList.remove('error');
    return true;
  }
}

function applyColor() {
  if (validateInput(redInput) && validateInput(greenInput) && validateInput(blueInput)) {
    const redValue = parseInt(redInput.value);
    const greenValue = parseInt(greenInput.value);
    const blueValue = parseInt(blueInput.value);
    colorBox.style.backgroundColor = "rgb("+ redValue +", "+ greenValue +","+ blueValue +")";
    
  }
}


redInput.addEventListener("input", applyColor);
greenInput.addEventListener("input", applyColor);
blueInput.addEventListener("input", applyColor);

applyBtn.addEventListener('click', applyColor);
redInput.addEventListener('input', validateInput.bind(null, redInput));
greenInput.addEventListener('input', validateInput.bind(null, greenInput));
blueInput.addEventListener('input', validateInput.bind(null, blueInput));