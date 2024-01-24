import { elements } from './domElements.js';
import * as type from './interfaces/module.js'

const actualYear = new Date(Date.now()).getFullYear();

const { languageSelect } = elements
let locale = languageSelect?.value;
languageSelect.addEventListener('change', changeLocale);

function changeLocale(e: Event) {
    const target = e.target as HTMLSelectElement;
    locale = target?.value;
    // TODO: recargar la página
    printMonth(0);
}


function getWeekDays():string[] {
    const formatWeekday = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    const weekdayName:string[] = Array.from({length: 7}, (_, weekdayIndex) => {
        const date:Date = new Date(2021, 10, weekdayIndex + 1);
        const formatedDate:string = formatWeekday.format(date);
        formatedDate[0].toUpperCase();
        return formatedDate;
    });
    
    return weekdayName;
}



function getMonth (): type.Month[]{
    const formatMonth = new Intl.DateTimeFormat(locale, { month: 'long' });
    const monthName = Array.from({length: 12}, (_, monthIndex) => {
        const date: Date = new Date(actualYear, monthIndex);
        const daysOfMonth: number = new Date(actualYear, monthIndex + 1, 0).getDate();
        const startsOn: number =  new Date(actualYear, monthIndex, 1).getDay();

        const month: type.Month = {
            name: formatMonth.format(date),
            days: daysOfMonth,
            start: startsOn
        }
        
        return month;
    });
    return monthName;
}

function printMonth (numberMonth:number):type.Month {
    const month:type.Month = getMonth()[numberMonth];
    const { monthTitle, monthDays } = elements;

    monthTitle.innerHTML = `${month.name} ${actualYear}`;
    
    const htmlDaysName = getWeekDays()
        .map((dayName) => `<li class='list-none'>${dayName}</li>`)
        .join('');
        
    const days:number[] = Array.from({length: month.days}, (_, index) => {
        return index + 1;
    });
    const firstDayAttributes: string = `class='col-start-${month.start} text-right pr-2 border-solid border-2 border-grey-400 h-16 w-24'`
    const dayAttributes = `class='text-right pr-2 border-solid border-2 border-grey-400 h-16 w-24'`
    const htmlDays: string = days
        .map(
          (day, index) =>
            `<li ${index === 0 ? firstDayAttributes : dayAttributes}>${day}</li>`
        )
        .join('');
            monthDays.innerHTML = `${htmlDaysName}${htmlDays}`
    return month;
}


    console.log('mes: ', printMonth(3));

    const {btnPrev} = elements;
    btnPrev.addEventListener("click", showPrevMonth)
    

    function showPrevMonth(){
        console.log("dentro de showprevmonth")
    }


