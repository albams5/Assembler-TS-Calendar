const events = [
    {
        id: 1,
        title: ' Evento 1',
        initialDate: '1-2-2024',
        endDate: '1-5-2024',
        time: '18:30',
        description: null,
        eventype: 'Meeting',
    },
    {
        id: 2,
        title: ' Evento 2',
        initialDate: '1-10-2024',
        endDate: '1-15-2024',
        time: '18:30',
        description: null,
        eventype: 'Personal',
    },
    {
        id: 2,
        title: ' Evento 96',
        initialDate: '1-12-2024',
        endDate: '1-12-2024',
        time: '12:30',
        description: null,
        eventype: 'Meeting',
    },
    {
        id: 3,
        title: ' Evento 3',
        initialDate: '1-11-2024',
        endDate: '1-11-2024',
        time: '18:30',
        description: null,
        eventype: 'Study',
    },
    {
        id: 4,
        title: ' Evento 4',
        initialDate: '1-22-2024',
        endDate: '1-22-2024',
        time: '18:30',
        description: null,
        eventype: 'Other',
    },
    {
        id: 5,
        title: ' Evento 5',
        initialDate: '1-25-2024',
        endDate: '1-26-2024',
        time: '18:30',
        description: null,
        eventype: 'Study',
    },
    {
        id: 6,
        title: ' Evento 6',
        initialDate: '2-25-2024',
        endDate: '2-26-2024',
        time: '18:30',
        description: null,
        eventype: 'Study',
    },
    {
        id: 7,
        title: ' Evento 7',
        initialDate: '2-25-2024',
        endDate: '2-26-2024',
        time: '18:30',
        description: null,
        eventype: 'Study',
    },
    {
        id: 8,
        title: ' Evento 8',
        initialDate: '2-25-2024',
        endDate: '2-26-2024',
        time: '18:30',
        description: null,
        eventype: 'Study',
    },
    {
        id: 9,
        title: ' Evento 9',
        initialDate: '2-25-2024',
        endDate: '2-26-2024',
        time: '18:30',
        description: null,
        eventype: 'Study',
    },
    {
        id: 10,
        title: ' Evento 10',
        initialDate: '1-31-2024',
        endDate: '1-31-2024',
        time: '18:30',
        description: null,
        eventype: 'Study',
    },
];
// TODO: hay que ordenar el array de evento por fecha de inicio, en caso de ser igual la fecha de inicio ordenar por duración, de esta manera
// los evento que duran más de un día quedarán en el top del día
const getListOfDaysBetweenTwoDates = (startDate, endDate) => {
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const listOfDays = [];
    for (let date = firstDate; date <= secondDate; date.setDate(date.getDate() + 1)) {
        // Añadir la fecha al array de días (clonando para evitar referencia)
        listOfDays.push(`${new Date(date).getMonth() + 1}-${new Date(date).getDate()}-${new Date(date).getFullYear()}`);
    }
    return listOfDays;
};
const getCircleColor = (eventType) => {
    if (eventType === 'Meeting')
        return 'bg-lime-300';
    else if (eventType === 'Personal')
        return 'bg-red-300';
    else if (eventType === 'Study')
        return 'bg-blue-300';
    else if (eventType === 'Other')
        return 'bg-yellow-300';
    else {
        return '';
    }
};
export const printEvents = () => {
    //pendiente: 
    //gestionar bien formato fechas, 
    //crear div para contener cada evento con su texto y bolita, 
    // cambiar color bolita segun tipo evento, cambiar color gris si el evento esta pasado.
    // scroll y scale en recuadro del mes (funcion printMonth)
    events.forEach(event => {
        const { initialDate, endDate, eventype, description, time, title, id } = event;
        const circleColor = getCircleColor(eventype);
        if (initialDate === endDate) {
            const initialDateString = `${new Date(initialDate).getMonth() + 1}-${new Date(initialDate).getDate()}-${new Date(initialDate).getFullYear()}`;
            const ulHtml = document.getElementById(`day-${initialDateString}`);
            if (!ulHtml)
                return;
            const newLi = document.createElement('li');
            newLi.classList.add('px-1', 'rounded-sm', 'mb-1', 'event', 'z-10');
            newLi.setAttribute('event-id', id.toString());
            const circleDiv = document.createElement('div');
            circleDiv.classList.add('rounded-full', 'inline-block', 'w-2', 'h-2', 'mr-1', circleColor);
            const newSpan = document.createElement('span');
            newSpan.textContent = title;
            newSpan.classList.add('z-0');
            newLi.appendChild(circleDiv);
            newLi.appendChild(newSpan);
            const miniModal = document.createElement('article');
            miniModal.classList.add('absolute', 'hidden', 'bg-red-200', 'left-24', 'w-52');
            const titleP = document.createElement('p');
            titleP.textContent = `title: ${title}`;
            miniModal.appendChild(titleP);
            newLi.addEventListener('mouseover', showMiniModal);
            newSpan.addEventListener('mouseover', showMiniModal);
            newLi.addEventListener('mouseout', hideMiniModal);
            newSpan.addEventListener('mouseout', hideMiniModal);
            newLi.insertAdjacentElement('beforeend', miniModal);
            if (new Date(initialDate).getTime() - Date.now() < 0)
                newLi.classList.add('line-through', 'text-gray-400');
            ulHtml.appendChild(newLi);
        }
        if (initialDate !== endDate) {
            const listOfDays = getListOfDaysBetweenTwoDates(initialDate, endDate);
            listOfDays.forEach(day => {
                const ulHtml = document.getElementById(`day-${day}`);
                if (!ulHtml)
                    return;
                const newLi = document.createElement('li');
                newLi.classList.add('px-1', 'rounded-sm', 'mb-1');
                newLi.setAttribute('event-id', id.toString());
                const circleDiv = document.createElement('div');
                circleDiv.classList.add('rounded-full', 'inline-block', 'w-2', 'h-2', 'mr-1', circleColor);
                const newSpan = document.createElement('span');
                newSpan.textContent = title;
                newLi.appendChild(circleDiv);
                newLi.appendChild(newSpan);
                if (new Date(initialDate).getTime() - Date.now() < 0)
                    newLi.classList.add('line-through', 'text-gray-400');
                ulHtml.appendChild(newLi);
            });
        }
    });
};
function showMiniModal(e) {
    const target = e.target;
    if (target instanceof HTMLLIElement) {
        const child = target.lastChild;
        child === null || child === void 0 ? void 0 : child.classList.remove('hidden');
    }
    else if (target instanceof HTMLSpanElement) {
        const next = target.nextElementSibling;
        next === null || next === void 0 ? void 0 : next.classList.remove('hidden');
    }
    else {
        return;
    }
}
function hideMiniModal(e) {
    const target = e.target;
    if (target instanceof HTMLLIElement) {
        const child = target.lastChild;
        child === null || child === void 0 ? void 0 : child.classList.add('hidden');
    }
    else if (target instanceof HTMLSpanElement) {
        const next = target.nextElementSibling;
        next === null || next === void 0 ? void 0 : next.classList.add('hidden');
    }
    else {
        return;
    }
}
