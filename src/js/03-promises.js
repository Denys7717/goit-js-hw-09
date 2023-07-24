import Notiflix from 'notiflix';

const button = document.querySelector('button');

const onClick = e => {
  const firstDelayInput = document.querySelector('[name="delay"]');
  const stepDelayInput = document.querySelector('[name="step"]');
  const amountInput = document.querySelector('[name="amount"]');
  let firstDelay = parseInt(firstDelayInput.value);
  const stepDelay = parseInt(stepDelayInput.value);
  const amount = parseInt(amountInput.value);
  e.preventDefault();
  if (
    firstDelayInput.value === '' ||
    stepDelayInput.value === '' ||
    amountInput.value === ''
  ) {
    Notiflix.Notify.warning('Fill in all the fields');
  } else {
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, firstDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      firstDelay += stepDelay;
    }
  }
  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, firstDelay);
    });
  }
};
button.addEventListener('click', onClick);
