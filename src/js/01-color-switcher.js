const startElement = document.querySelector('[data-start]');
const stopElement = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

start.addEventListener(
  'click',
  (onClick = () => {
    startElement.setAttribute('disabled', '');
    stopElement.removeAttribute('disabled');
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  })
);

stopElement.addEventListener(
  'click',
  (stopChange = () => {
    startElement.removeAttribute('disabled');
    stopElement.setAttribute('disabled', '');
    clearInterval(timerId);
  })
);
