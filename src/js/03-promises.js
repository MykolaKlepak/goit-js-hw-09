import Notiflix from "notiflix";

const formEl = document.querySelector('.form');
const btnSubmit = document.querySelector('[type="submit"]');
const amountRef = document.querySelector('[name="amount"]');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

const amount = Number(amountRef.value);
let delay = Number(delayRef.value);
const step = Number(stepRef.value);

for (let position = 1; position <= amount; position += 1) {
  createPromise({ position, delay })
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  
    delay += step;
  }
};

function createPromise({ position, delay }) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
};
