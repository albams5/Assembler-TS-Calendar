import { Event } from './event.js';
import { Month } from "./month.js";

export interface Calendar {
    eventList: Event[];
    currentMonth: Month;
}
