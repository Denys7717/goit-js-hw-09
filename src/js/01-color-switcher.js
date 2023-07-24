const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
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
    start.setAttribute('disabled', '');
    stop.removeAttribute('disabled');
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  })
);

stop.addEventListener(
  'click',
  (stopChange = () => {
    start.removeAttribute('disabled');
    stop.setAttribute('disabled', '');
    clearInterval(timerId);
  })
);
