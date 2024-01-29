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
];
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
            newLi.classList.add('px-1', 'rounded-sm', 'mb-1');
            newLi.setAttribute('event-id', id.toString());
            const circleDiv = document.createElement('div');
            circleDiv.classList.add('rounded-full', 'inline-block', 'w-2', 'h-2', 'mr-1', circleColor);
            const newSpan = document.createElement('span');
            newSpan.textContent = title;
            newLi.appendChild(circleDiv);
            newLi.appendChild(newSpan);
            if (new Date(initialDate).getTime() - Date.now() < 0)
                newLi.classList.add('bg-gray-400');
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
                    newLi.classList.add('bg-gray-400');
                ulHtml.appendChild(newLi);
            });
        }
    });
};
