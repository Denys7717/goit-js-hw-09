import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

let dataForm = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
const { email, message } = form.elements;
reset();

function onInputData(event) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem('feedback-form-state', JSON.stringify(dataForm));
}

function reset() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}
//
function onFormSubmit(event) {
  event.preventDefault();
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
  dataForm = {};
}
