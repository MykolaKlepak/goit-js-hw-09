import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true);
btnStart.classList.add('btn-start');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        console.log(selectedDates[0])
        clicedData = selectedDates[0];

        if (clicedData <= new Date) {
            Notiflix.Notify.warning('Please choose a date in the future');
            // window.alert("Please choose a date in the future");
        } else {
            clicedData = selectedDates[0];
            btnStart.removeAttribute('disabled');
        }
    },

    onStart() {
        if (btnStart.hasAttribute('disabled')) {
            return;
        }
        const intervalId = setInterval(() => {
            btnStart.setAttribute('disabled', true);
            const now = new Date;
            const difference = clicedData - now;
            console.log(difference);
            if (difference <= 0) {
                clearInterval(intervalId);
                return;
            }
            const timeComponents = convertMs(difference);
            seconds.textContent = `${timeComponents.seconds}`;
            minutes.textContent = `${timeComponents.minutes}`;
            hours.textContent = `${timeComponents.hours}`;
            days.textContent = `${timeComponents.days}`;
            console.log(timeComponents);
        }, 1000);
    }
};

flatpickr(inputEl, options);
let clicedData = null;

btnStart.addEventListener('click', () => {
    options.onStart();
});

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
    return { days, hours, minutes, seconds };
};

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
