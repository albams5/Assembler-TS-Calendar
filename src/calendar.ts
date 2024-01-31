import { elements } from "./domElements.js";
import * as type from "./interfaces/module.js";
import { printEvents } from "./printingEvents.js";
import { paintDomDay } from './modal.js';

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
    .map((dayName) => `<div class="text-center h-full"><p class='list-none h-6'>${dayName}</p></div>`)
    .join("");

  const days: number[] = Array.from({ length: month.days }, (_, index) => {
    return index + 1;
  });
  const firstDayAttributes: string = `class='col-start-${
    month.start === 0 ? 7 : month.start
  } text-right relative bg-white px-2 border-solid border-2 rounded border-grey-400 group cursor-pointer fade-in-right hover:bg-red-50 overflow-auto w-full'`;
  const dayAttributes = `class='text-right relative bg-white px-2 border-solid border-2 rounded border-grey-400 group cursor-pointer fade-in-right hover:bg-red-50 overflow-auto w-full'`;
  const htmlDays: string = days
    .map(
      (day, index) =>
        `<li ${index === 0 ? firstDayAttributes : dayAttributes}>
                <button class="add absolute left-2 top-1 invisible group-hover:visible" date="${month.year}-${month.id}-${day}">
                    <svg class="pointer-events-none" text-red-400" width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g  stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                            <path d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#450a0a"></path>
                            <path  fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#450a0a"></path>
                        </g>
                    </svg>
                </button>
                <span>${day}</span>
                <ul class="text-xs text-left" id="day-${
                  month.id + 1
                }-${day}-${month.year}"></ul>
            </li>`
    )
    .join("");
    monthDays.insertAdjacentHTML('beforebegin', `<div class="grid grid-cols-7 gap-2">${htmlDaysName}</div>`);
  monthDays.innerHTML = `${htmlDays}`;

  const btnAddArray = document.querySelectorAll(".add");

  btnAddArray.forEach((btn) => {
    btn.addEventListener("click", paintDomDay);
  });
  setToday();
  printEvents();
}
