const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const colorBox = document.querySelector(".color-box");
const fullWidth = document.querySelector(".full-width");
const generateBtn = document.getElementById("generate-btn");
let colorBlocksCount = 0;
let maxBlocksCount = 15;

function changeColor() {
  const red = input1.value;
  const green = input2.value;
  const blue = input3.value;
  colorBox.style.backgroundColor = "rgb("+ red +", "+ green +","+ blue +")";
}

function setFullWidthColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  fullWidth.style.backgroundColor = "rgb("+ red +", "+ green +","+ blue +")"; 
}

let colorBlock = document.createElement("div")

  function generateColorBlock() {
    if (colorBlocksCount >= maxBlocksCount-1) {
      hideOverflowBlocks();     
    }
  
  const redValue = parseInt(input1.value);
  const greenValue = parseInt(input2.value);
  const blueValue = parseInt(input3.value);

  const colorBlock = document.createElement("div");
  colorBlock.classList.add("color-block");
  colorBlock.style.backgroundColor = "rgb("+ redValue +", "+ greenValue +","+ blueValue +")";
  
  //fullWidth.appendChild(colorBlock);
  fullWidth.prepend(colorBlock);
  colorBlocksCount++;

}

input1.addEventListener("input", changeColor);
input2.addEventListener("input", changeColor);
input3.addEventListener("input", changeColor);
window.addEventListener("load", setFullWidthColor);
generateBtn.addEventListener("click", generateColorBlock);

// Прятать блоки, которые не умещаются на странице
function hideOverflowBlocks() {
  const colorBlocks = document.querySelectorAll(".color-block");
  if (colorBlocksCount >= maxBlocksCount-1) {
    for (let i = 0; i < colorBlocksCount; i++) {
      if (i >= maxBlocksCount-1) {
        colorBlocks[i].style.display = "none";
      } else {
        colorBlocks[i].style.display = "block";
      }
    }
  }
}


