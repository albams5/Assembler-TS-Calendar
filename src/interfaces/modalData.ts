import { Month } from "./month.js";

export interface Calendar {
  eventList: FormData[];
  currentMonth: Month;
}

export interface FormData {
  id: number;
  title: string;
  initialDate: string;
  endDate: string | number;
  alertTime: number | string;
  description: string | null;
  eventType: Category | string;
  notificated: boolean;
}

export enum Category {
  Meeting = "Meeting",
  Personal = "Personal",
  Study = "Study",
  Other = "Other",
}
