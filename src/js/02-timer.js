import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input');
const start = document.querySelector('button');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
let timerId = null;

start.setAttribute('disabled', '');

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let date = new Date().getTime();
    const selected = selectedDates[0].getTime();
    let difference = selected - date;

    start.addEventListener('click', onClick);

    if (date > selected) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      start.removeAttribute('disabled');
    }
    function onClick() {
      timerId = setInterval(() => {
        start.setAttribute('disabled', '');
        date = new Date().getTime();
        difference = selected - date;
        const { days, hours, minutes, seconds } = convertMs(difference);
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timerId);
        }
        console.log(days, hours, minutes, seconds);

        daysSpan.textContent = addLeadingZero(days);
        hoursSpan.textContent = addLeadingZero(hours);
        minutesSpan.textContent = addLeadingZero(minutes);
        secondsSpan.textContent = addLeadingZero(seconds);
      }, 1000);
    }
  },
});
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
