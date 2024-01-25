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
    const { monthTitle, monthDays } = elements;
    monthTitle.innerHTML = `${month.name} ${actualYear}`;
    const htmlDaysName = getWeekDays()
        .map((dayName) => `<li class='list-none'>${dayName}</li>`)
        .join('');
    const days = Array.from({ length: month.days }, (_, index) => {
        return index + 1;
    });
    const firstDayAttributes = `class='col-start-${(month.start === 0) ? 7 : month.start} text-right pr-2 border-solid border-2 border-grey-400 h-16 w-24 group relative'`;
    const dayAttributes = `class='text-right pr-2 border-solid border-2 border-grey-400 h-16 w-24 group relative'`;
    const htmlDays = days
        .map((day, index) => `<li ${index === 0 ? firstDayAttributes : dayAttributes}><button class="add invisible group-hover:visible border-solid border-2 border-violet-300 absolute left-0 px-1 bg-violet-100 text-violet-300" id="${day} ${month.name}" class="add">add</button>${day}</li>`)
        .join('');
    monthDays.innerHTML = `${htmlDaysName}${htmlDays}`;
    const btnAddArray = document.querySelectorAll('.add');
    btnAddArray.forEach(btn => {
        btn.addEventListener('click', addEvent);
    });
    return month;
}
function addEvent(e) {
    const target = e.target;
    const value = target === null || target === void 0 ? void 0 : target.id;
    console.log('aquí se debería abrir la modal para añadir un evento en el día seleccionado: ', value);
}
console.log('mes: ', printMonth(11));
const { btnPrev } = elements;
btnPrev.addEventListener("click", showPrevMonth);
function showPrevMonth() {
    console.log("dentro de showprevmonth");
}
