import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//refs
const form = document.querySelector('form');
const inputDelay = form.elements.delay;
const inputsState = form.elements.state;

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = inputDelay.value;
  //radios
  const fulFilledRadio = Array.from(inputsState).find(
    el => el.checked && el.value === 'fulfilled'
  );
  const rejectedRadio = Array.from(inputsState).find(
    el => el.checked && el.value === 'rejected'
  );

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (fulFilledRadio) {
        res(delay);
      } else if (rejectedRadio) {
        rej(delay);
      }
    }, delay);
  });

  promise
    .then(res => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${res}ms`,
        color: 'green',
        position: 'topRight',
        close: false,
        class: 'toast-width',
      });
    })
    .catch(rej => {
      iziToast.show({
        message: `❌ Rejected promise in ${rej}ms`,
        color: 'red',
        position: 'topRight',
        close: false,
        class: 'toast-width',
      });
    });
});
