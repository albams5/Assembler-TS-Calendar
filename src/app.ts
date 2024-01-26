import { elements } from './domElements.js';
import * as type from './interfaces/module.js';

document.addEventListener('DOMContentLoaded', setPage);

function setPage() {
    const { languageSelect, btnPrev, btnNext, btnToday } = elements;
    languageSelect.addEventListener('change', changeLocale);
    btnPrev.addEventListener("click", showPrevMonth)
    btnNext.addEventListener("click", showNextMonth);
    btnToday.addEventListener("click", showToday);
    printToday();
}

function printToday() {
    const actualYear = new Date(Date.now()).getFullYear();
    const actualMonth = new Date(Date.now()).getMonth();
    printMonth(actualYear, actualMonth);
}

function setToday(){
    const actualYear = new Date(Date.now()).getFullYear();
    const actualMonth = new Date(Date.now()).getMonth();
    const actualDay = new Date(Date.now()).getDate();
    const monthNumber = localStorage.getItem("month") || "Error";
    const jsonMonthNumber = JSON.parse(monthNumber);
    if(actualYear === jsonMonthNumber.year && actualMonth === jsonMonthNumber.id){
        const days = Array.from(document.querySelectorAll(".group"));
        const today = days.find((day)=>day.childNodes[1].textContent === actualDay.toString());
        today?.classList.add("border-2", "border-red-500", "border-solid");
        today?.children[1].classList.add("text-white", "rounded-full", "bg-red-500", "px-2")
    }
}

function getLocale() {
    const { languageSelect } = elements;
    return languageSelect.value; 
}

function changeLocale() {
    printToday();
}

function showPrevMonth(){
    const month = localStorage.getItem("month") || 'error';
    const JSONmonth = JSON.parse(month);
    printMonth(JSONmonth.id === 0?JSONmonth.year-1:JSONmonth.year, (JSONmonth.id - 1)%12);
}

function showNextMonth(){
    const month = localStorage.getItem("month") || 'error';
    const JSONmonth = JSON.parse(month);
    printMonth(JSONmonth.id === 11 || JSONmonth.id%11 === -1?JSONmonth.year+1:JSONmonth.year, (JSONmonth.id + 1)%12);
    console.log(JSONmonth.id, JSONmonth.year)
}

function showToday(){
    const actualYear = new Date(Date.now()).getFullYear();
    const actualMonth = new Date(Date.now()).getMonth();
    printMonth(actualYear, actualMonth);
}

function getWeekDays():string[] {
    
    const formatWeekday = new Intl.DateTimeFormat(getLocale(), { weekday: 'long' });
    const weekdayName:string[] = Array.from({length: 7}, (_, weekdayIndex) => {
        const date:Date = new Date(2021, 10, weekdayIndex + 1);
        const formatedDate:string = formatWeekday.format(date);
        return formatedDate;
    });
    
    return weekdayName;
}

function getMonth (year: number, monthIndex: number): type.Month{
    const formatMonth = new Intl.DateTimeFormat(getLocale(), { month: 'long' });
    const date: Date = new Date(year, monthIndex);
    const daysOfMonth: number = new Date(year, monthIndex + 1, 0).getDate();
    const startsOn: number =  new Date(year, monthIndex, 1).getDay();

    const month: type.Month = {
        id: monthIndex,
        name: formatMonth.format(date),
        days: daysOfMonth,
        start: startsOn,
        year: year
    }
    
    localStorage.setItem('month', JSON.stringify(month));

    return month;
}

function printMonth (year: number, numberMonth:number):type.Month {
    const month:type.Month = getMonth(year, numberMonth);
    const { monthTitle, monthDays } = elements;

    monthTitle.innerHTML = `${month.name.toUpperCase()} ${month.year}`;

    const htmlDaysName = getWeekDays()
        .map((dayName) => `<li class='list-none'>${dayName}</li>`)
        .join('');
        
    const days:number[] = Array.from({length: month.days}, (_, index) => {
        return index + 1;
    });
    const firstDayAttributes: string = `class='col-start-${(month.start === 0) ? 7 : month.start} text-right bg-white pr-2 border-solid border-2 rounded border-grey-400 h-20 w-32 group relative cursor-pointer'`
    const dayAttributes = `class='text-right bg-white pr-2 border-solid border-2 rounded border-grey-400 h-20 w-32 group relative cursor-pointer'`
    const htmlDays: string = days
        .map(
            (day, index) =>
            `<li ${index === 0 ? firstDayAttributes : dayAttributes}><button class="add invisible group-hover:visible border-solid border-2 border-violet-300 absolute left-0 px-1 bg-violet-100 text-violet-300" id="${day} ${month.name}" class="add">add</button><span>${day}</span></li>`
            )
        .join('');
    monthDays.innerHTML = `${htmlDaysName}${htmlDays}`
    
    const btnAddArray = document.querySelectorAll('.add');

    btnAddArray.forEach(btn => {
        btn.addEventListener('click', addEvent);
    });
    setToday();
    return month;
}
    
function addEvent (e: Event) {
    const target = e.target as HTMLButtonElement;
    const value = target?.id;
    console.log('aquí se debería abrir la modal para añadir un evento en el día seleccionado: ', value);
}
