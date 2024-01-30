import { elements } from "./domElements.js";
import * as type from "./interfaces/module.js";
import { printEvents } from "./printingEvents.js";
import {paintDom} from './modal.js';

export function setPage(): void {
  const { languageSelect, btnPrev, btnNext, btnToday } = elements;
  languageSelect.addEventListener("change", changeLocale);
  btnPrev.addEventListener("click", showPrevMonth);
  btnNext.addEventListener("click", showNextMonth);
  btnToday.addEventListener("click", showToday);
  printToday();
}

function printToday(): void {
  const actualYear = new Date(Date.now()).getFullYear();
  const actualMonth = new Date(Date.now()).getMonth();
  printMonth(actualYear, actualMonth);
}

function setToday(): void {
  const actualYear = new Date(Date.now()).getFullYear();
  const actualMonth = new Date(Date.now()).getMonth();
  const actualDay = new Date(Date.now()).getDate();
  let calendar =
    localStorage.getItem("calendar") || '{"eventList":[], "currentMonth":{}}';
  const month = JSON.parse(calendar).currentMonth;
  if (actualYear === month.year && actualMonth === month.id) {
    const days = Array.from(document.querySelectorAll(".group"));
    const today = days.find(
      (day) => day.children[1].textContent === actualDay.toString()
    );
    today?.classList.add("border-2", "border-red-500", "border-solid");
    today?.children[1].classList.add(
      "text-white",
      "rounded-full",
      "bg-red-500",
      "px-2"
    );
  }
}

function getLocale(): string {
  const { languageSelect } = elements;
  return languageSelect.value;
}

function changeLocale(): void {
  printToday();
}

function showPrevMonth(): void {
  let calendar =
    localStorage.getItem("calendar") || '{"eventList":[], "currentMonth":{}}';
  const month = JSON.parse(calendar).currentMonth;
  printMonth(month.id === 0 ? month.year - 1 : month.year, (month.id - 1) % 12);
}

function showNextMonth(): void {
  let calendar =
    localStorage.getItem("calendar") || '{"eventList":[], "currentMonth":{}}';
  const month = JSON.parse(calendar).currentMonth;
  printMonth(
    month.id === 11 || month.id % 11 === -1 ? month.year + 1 : month.year,
    (month.id + 1) % 12
  );
}

function showToday(): void {
  const actualYear = new Date(Date.now()).getFullYear();
  const actualMonth = new Date(Date.now()).getMonth();
  printMonth(actualYear, actualMonth);
}

function getWeekDays(): string[] {
  const formatWeekday = new Intl.DateTimeFormat(getLocale(), {
    weekday: "long",
  });
  const weekdayName: string[] = Array.from({ length: 7 }, (_, weekdayIndex) => {
    const date: Date = new Date(2021, 10, weekdayIndex + 1);
    const formatedDate: string = formatWeekday.format(date);
    return formatedDate;
  });

  return weekdayName;
}

function getMonth(year: number, monthIndex: number): type.Month {
  const formatMonth = new Intl.DateTimeFormat(getLocale(), { month: "long" });
  const date: Date = new Date(year, monthIndex);
  const daysOfMonth: number = new Date(year, monthIndex + 1, 0).getDate();
  const startsOn: number = new Date(year, monthIndex, 1).getDay();

  const month: type.Month = {
    id: monthIndex,
    name: formatMonth.format(date),
    days: daysOfMonth,
    start: startsOn,
    year: year,
  };

  let calendar =
    localStorage.getItem("calendar") || '{"eventList":[], "currentMonth":{}}';
  let JSONcalendar = JSON.parse(calendar);
  JSONcalendar.currentMonth = month;
  localStorage.setItem("calendar", JSON.stringify(JSONcalendar));

  return month;
}

function printMonth(year: number, numberMonth: number): void {
  const month: type.Month = getMonth(year, numberMonth);
  const { monthTitle, monthDays } = elements;

  monthTitle.innerHTML = `${month.name.toUpperCase()} ${month.year}`;

  const htmlDaysName = getWeekDays()
    .map((dayName) => `<li class='list-none'>${dayName}</li>`)
    .join("");

  const days: number[] = Array.from({ length: month.days }, (_, index) => {
    return index + 1;
  });
  const firstDayAttributes: string = `class='col-start-${
    month.start === 0 ? 7 : month.start
  } text-right bg-white px-2 border-solid border-2 rounded border-grey-400 h-[5.5rem] w-32 group relative cursor-pointer fade-in-right hover:bg-red-100 overflow-auto'`;
  const dayAttributes = `class='text-right bg-white px-2 border-solid border-2 rounded border-grey-400 h-[5.5rem] w-32 group relative cursor-pointer fade-in-right hover:bg-red-100 overflow-auto'`;
  const htmlDays: string = days
    .map(
      (day, index) =>
        `<li ${index === 0 ? firstDayAttributes : dayAttributes}>
                <button class="add invisible group-hover:visible border-solid border-2 border-violet-300 absolute left-0 px-1 bg-violet-100 text-violet-300" date="${month.year}-${month.id}-${day}" class="add">add</button>
                <span>${day}</span>
                <ul class="text-xs text-left truncate" id="day-${
                  month.id + 1
                }-${day}-${month.year}"></ul>
            </li>`
    )
    .join("");
  monthDays.innerHTML = `${htmlDaysName}${htmlDays}`;

  const btnAddArray = document.querySelectorAll(".add");

  btnAddArray.forEach((btn) => {
    btn.addEventListener("click", paintDom);
  });
  setToday();
  printEvents();
}
