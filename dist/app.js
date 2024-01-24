import { elements } from './domElements.js';
const actualYear = new Date(Date.now()).getFullYear();
const { languageSelect } = elements;
let locale = languageSelect === null || languageSelect === void 0 ? void 0 : languageSelect.value;
languageSelect.addEventListener('change', changeLocale);
function changeLocale(e) {
    const target = e.target;
    locale = target === null || target === void 0 ? void 0 : target.value;
    // TODO: recargar la página
    printMonth(0);
}
function getWeekDays() {
    const formatWeekday = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    const weekdayName = Array.from({ length: 7 }, (_, weekdayIndex) => {
        const date = new Date(2021, 10, weekdayIndex + 1);
        const formatedDate = formatWeekday.format(date);
        formatedDate[0].toUpperCase();
        return formatedDate;
    });
    return weekdayName;
}
function getMonth() {
    const formatMonth = new Intl.DateTimeFormat(locale, { month: 'long' });
    const monthName = Array.from({ length: 12 }, (_, monthIndex) => {
        const date = new Date(actualYear, monthIndex);
        const daysOfMonth = new Date(actualYear, monthIndex + 1, 0).getDate();
        const startsOn = new Date(actualYear, monthIndex, 1).getDay();
        const month = {
            name: formatMonth.format(date),
            days: daysOfMonth,
            start: startsOn
        };
        return month;
    });
    return monthName;
}
function printMonth(numberMonth) {
    const month = getMonth()[numberMonth];
    const { calendarContainer } = elements;
    calendarContainer.innerHTML = '';
    const btnStyle = 'border-solid border-2 border-red-300 px-2';
    const htmlHeaderMonth = `<section class="flex flex-row space-x-40"><button class="${btnStyle}">prev</button><h2>${month.name} ${actualYear}</h2><button class="${btnStyle}">next</button></section>`;
    const htmlDaysName = getWeekDays()
        .map((dayName) => `<li class='list-none'>${dayName}</li>`)
        .join('');
    const days = Array.from({ length: month.days }, (_, index) => {
        return index + 1;
    });
    const firstDayAttributes = `class='col-start-${month.start} text-right pr-2 border-solid border-2 border-grey-400 h-16 w-24'`;
    const dayAttributes = `class='text-right pr-2 border-solid border-2 border-grey-400 h-16 w-24'`;
    const htmlDays = days
        .map((day, index) => `<li ${index === 0 ? firstDayAttributes : dayAttributes}>${day}</li>`)
        .join('');
    const listStyle = 'list-none grid grid-cols-7 gap-1 text-center';
    const htmlElements = `${htmlHeaderMonth} <ol class="${listStyle}">${htmlDaysName}${htmlDays}</ol>`;
    calendarContainer.insertAdjacentHTML('beforeend', htmlElements);
    return month;
}
console.log('mes: ', printMonth(3));
