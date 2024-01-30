export interface Calendar {
  eventList: FormData[];
  currentMonth: number;
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
