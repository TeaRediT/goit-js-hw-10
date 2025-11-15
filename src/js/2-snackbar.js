import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//refs
const form = document.querySelector('form');
const inputDelay = form.elements.delay;
const inputsState = form.elements.state;

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = inputDelay.value;
  const valid = inputsState[0].checked === true;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (valid) {
        res(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(res => {
      iziToast.show({
        message: `${res}`,
        color: 'green',
        position: 'topRight',
        close: false,
        class: 'toast-width',
      });
    })
    .catch(rej => {
      iziToast.show({
        message: `${rej}`,
        color: 'red',
        position: 'topRight',
        close: false,
        class: 'toast-width',
      });
    });
});
