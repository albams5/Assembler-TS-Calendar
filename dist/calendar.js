import { elements } from "./domElements.js";
import { printEvents } from "./printingEvents.js";
export function setPage() {
    const { languageSelect, btnPrev, btnNext, btnToday } = elements;
    languageSelect.addEventListener("change", changeLocale);
    btnPrev.addEventListener("click", showPrevMonth);
    btnNext.addEventListener("click", showNextMonth);
    btnToday.addEventListener("click", showToday);
    printToday();
}
function printToday() {
    const actualYear = new Date(Date.now()).getFullYear();
    const actualMonth = new Date(Date.now()).getMonth();
    printMonth(actualYear, actualMonth);
}
function setToday() {
    const actualYear = new Date(Date.now()).getFullYear();
    const actualMonth = new Date(Date.now()).getMonth();
    const actualDay = new Date(Date.now()).getDate();
    let calendar = localStorage.getItem("calendar") || '{"eventList":[], "currentMonth":{}}';
    const month = JSON.parse(calendar).currentMonth;
    if (actualYear === month.year && actualMonth === month.id) {
        const days = Array.from(document.querySelectorAll(".group"));
        const today = days.find((day) => day.children[1].textContent === actualDay.toString());
        today === null || today === void 0 ? void 0 : today.classList.add("border-2", "border-red-500", "border-solid");
        today === null || today === void 0 ? void 0 : today.children[1].classList.add("text-white", "rounded-full", "bg-red-500", "px-2");
    }
}
function getLocale() {
    const { languageSelect } = elements;
    return languageSelect.value;
}
function changeLocale() {
    printToday();
}
function showPrevMonth() {
    let calendar = localStorage.getItem("calendar") || '{"eventList":[], "currentMonth":{}}';
    const month = JSON.parse(calendar).currentMonth;
    printMonth(month.id === 0 ? month.year - 1 : month.year, (month.id - 1) % 12);
}
function showNextMonth() {
    let calendar = localStorage.getItem("calendar") || '{"eventList":[], "currentMonth":{}}';
    const month = JSON.parse(calendar).currentMonth;
    printMonth(month.id === 11 || month.id % 11 === -1 ? month.year + 1 : month.year, (month.id + 1) % 12);
}
function showToday() {
    const actualYear = new Date(Date.now()).getFullYear();
    const actualMonth = new Date(Date.now()).getMonth();
    printMonth(actualYear, actualMonth);
}
function getWeekDays() {
    const formatWeekday = new Intl.DateTimeFormat(getLocale(), {
        weekday: "long",
    });
    const weekdayName = Array.from({ length: 7 }, (_, weekdayIndex) => {
        const date = new Date(2021, 10, weekdayIndex + 1);
        const formatedDate = formatWeekday.format(date);
        return formatedDate;
    });
    return weekdayName;
}
function getMonth(year, monthIndex) {
    const formatMonth = new Intl.DateTimeFormat(getLocale(), { month: "long" });
    const date = new Date(year, monthIndex);
    const daysOfMonth = new Date(year, monthIndex + 1, 0).getDate();
    const startsOn = new Date(year, monthIndex, 1).getDay();
    const month = {
        id: monthIndex,
        name: formatMonth.format(date),
        days: daysOfMonth,
        start: startsOn,
        year: year,
    };
    let calendar = localStorage.getItem("calendar") || '{"eventList":[], "currentMonth":{}}';
    let JSONcalendar = JSON.parse(calendar);
    JSONcalendar.currentMonth = month;
    localStorage.setItem("calendar", JSON.stringify(JSONcalendar));
    return month;
}
function printMonth(year, numberMonth) {
    const month = getMonth(year, numberMonth);
    const { monthTitle, monthDays } = elements;
    monthTitle.innerHTML = `${month.name.toUpperCase()} ${month.year}`;
    const htmlDaysName = getWeekDays()
        .map((dayName) => `<li class='list-none'>${dayName}</li>`)
        .join("");
    const days = Array.from({ length: month.days }, (_, index) => {
        return index + 1;
    });
    const firstDayAttributes = `class='col-start-${month.start === 0 ? 7 : month.start} text-right bg-white px-2 border-solid border-2 rounded border-grey-400 h-[5.5rem] w-32 group relative cursor-pointer fade-in-right hover:bg-red-100 overflow-auto'`;
    const dayAttributes = `class='text-right bg-white px-2 border-solid border-2 rounded border-grey-400 h-[5.5rem] w-32 group relative cursor-pointer fade-in-right hover:bg-red-100 overflow-auto'`;
    const htmlDays = days
        .map((day, index) => `<li ${index === 0 ? firstDayAttributes : dayAttributes}>
                <button class="add invisible group-hover:visible border-solid border-2 border-violet-300 absolute left-0 px-1 bg-violet-100 text-violet-300" id="${day} ${month.name}" class="add">add</button>
                <span>${day}</span>
                <ul class="text-xs text-left truncate" id="day-${month.id + 1}-${day}-${month.year}"></ul>
            </li>`)
        .join("");
    monthDays.innerHTML = `${htmlDaysName}${htmlDays}`;
    const btnAddArray = document.querySelectorAll(".add");
    btnAddArray.forEach((btn) => {
        btn.addEventListener("click", addEvent);
    });
    setToday();
    printEvents();
}
function addEvent(e) {
    const target = e.target;
    const value = target === null || target === void 0 ? void 0 : target.id;
    console.log("aquí se debería abrir la modal para añadir un evento en el día seleccionado: ", value);
}
