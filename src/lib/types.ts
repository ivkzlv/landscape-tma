export type LeadStatus = "Hot" | "Warm" | "Cold";

export interface Lead {
  id: number;
  status: LeadStatus;
  name: string;
  location: string;
  budget: string;
  summary: string;
  createdAt: string;
}

export type EventType = "visit" | "call" | "review" | "meeting";

export interface CalendarEvent {
  id: number;
  time: string;
  title: string;
  client: string;
  type: EventType;
  color: string;
}

export type KanbanColumn = "To Do" | "In Progress" | "Done";

export type ProjectTag =
  | "Design" | "Finance" | "On-site"
  | "Installation" | "Completed" | "Sales";

export interface ProjectCard {
  id: number;
  title: string;
  tag: ProjectTag;
  column: KanbanColumn;
}

export interface Stat {
  label: string;
  value: string;
  delta: string;
}

export interface SettingItem {
  label: string;
  key: string;
  defaultOn: boolean;
}
