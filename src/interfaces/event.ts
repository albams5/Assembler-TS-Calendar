export interface Event {
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
