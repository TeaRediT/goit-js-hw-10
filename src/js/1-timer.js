import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//refs
const refs = {
  date: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hrs: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

//padStart
const pad = num => num.toString().padStart(2, '0');

//convertMs
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

//flatpickr
let userSelectedDate;

const datePick = flatpickr(refs.date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    //pastDate
    if (userSelectedDate < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        class: 'toast',
        position: 'topRight',
      });
      refs.btn.setAttribute('disabled', '');
      return;
    }
    refs.btn.removeAttribute('disabled', '');
  },
});

//timer
const timer = date => {
  const interval = setInterval(() => {
    const timeDiff = date - new Date();
    const time = convertMs(timeDiff);

    const { days, hours, minutes, seconds } = time;
    refs.days.textContent = pad(days);
    refs.hrs.textContent = pad(hours);
    refs.min.textContent = pad(minutes);
    refs.sec.textContent = pad(seconds);

    //stop
    if (timeDiff < 1000) {
      clearInterval(interval);
      refs.date.removeAttribute('disabled', '');
    }
  }, 1000);
};

//start
refs.btn.setAttribute('disabled', '');

refs.btn.addEventListener('click', () => {
  timer(userSelectedDate);
  refs.btn.setAttribute('disabled', '');
  refs.date.setAttribute('disabled', '');
});
