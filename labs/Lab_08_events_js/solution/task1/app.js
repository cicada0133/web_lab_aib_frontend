const redBtn = document.getElementById('red-btn');
const greenBtn = document.getElementById('green-btn');
const blueBtn = document.getElementById('blue-btn');

redBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'red';
  });
  
  greenBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'green';
  });
  
  blueBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'blue';
  });