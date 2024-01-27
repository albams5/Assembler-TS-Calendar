export interface Calendar {
  eventList: FormData[];
  currentMonth: number;
}

export interface FormData {
  title: string;
  initialDate: string;
  endDate: string | null;
  time: number | null;
  description: string | null;
  eventype: Category | null;
}

enum Category {
  Meeting = "Meeting",
  Personal = "Personal",
  Study = "Study",
}
