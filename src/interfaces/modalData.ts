import { Month } from "./month.js";

export interface Calendar {
  eventList: FormData[];
  currentMonth: Month;
}

export interface FormData {
  title: string;
  initialDate: string;
  endDate: string | number;
  time: number | string;
  description: string | null;
  eventype: Category | string;
}

enum Category {
  Meeting = "Meeting",
  Personal = "Personal",
  Study = "Study",
}
