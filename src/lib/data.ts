import type { Lead, CalendarEvent, ProjectCard, Stat, SettingItem } from "./types";

export const leads: Lead[] = [
  { id: 1, status: "Hot",  name: "Aleksey Voronov",   location: "New Riga, 15 acres",   budget: "1–1.5M RUB",   summary: "English garden with pond, gazebo, and full illumination system.", createdAt: "2024-05-20" },
  { id: 2, status: "Warm", name: "Maria Sorokina",    location: "Rublyovka, 8 acres",   budget: "600–800K RUB", summary: "Lawn renovation, automated irrigation, seasonal planting plan.",   createdAt: "2024-05-24" },
  { id: 3, status: "Cold", name: "Dmitry Fadeev",     location: "Skolkovo, 5 acres",    budget: "250–350K RUB", summary: "Minimalist terrace design with gravel beds and native shrubs.",   createdAt: "2024-05-28" },
  { id: 4, status: "Hot",  name: "Ekaterina Blinova", location: "Ilyinskoye, 20 acres", budget: "2–3M RUB",     summary: "Full estate landscaping: forest zone, orchard, and guest area.",  createdAt: "2024-06-01" },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 1, time: "09:00", title: "Site Visit",    client: "Ivan P.",  type: "visit",  color: "#2D5A3D" },
  { id: 2, time: "12:30", title: "Design Review", client: "Team",     type: "review", color: "#7C4DFF" },
  { id: 3, time: "14:00", title: "Call",          client: "Maria S.", type: "call",   color: "#FF6D00" },
];

export const projectCards: ProjectCard[] = [
  { id: 1, title: "Blinova Estate — Concept Draft", tag: "Design",       column: "To Do"       },
  { id: 2, title: "Fadeev Terrace — Cost Estimate", tag: "Finance",      column: "To Do"       },
  { id: 3, title: "Voronov Garden — Phase 2",       tag: "On-site",      column: "In Progress" },
  { id: 4, title: "Sorokina Lawn — Irrigation",     tag: "Installation", column: "In Progress" },
  { id: 5, title: "Petrov Dacha — Client Handover", tag: "Completed",    column: "Done"        },
  { id: 6, title: "LLC GreenPark — Proposal Sent",  tag: "Sales",        column: "Done"        },
];

export const profileStats: Stat[] = [
  { label: "Total Leads", value: "24",     delta: "+4 this month"   },
  { label: "Conversion",  value: "38%",    delta: "+5% vs last mo." },
  { label: "Revenue",     value: "4.2M ₽", delta: "YTD"             },
];

export const settingItems: SettingItem[] = [
  { label: "Push Notifications", key: "notifications", defaultOn: true  },
  { label: "Dark Mode",          key: "darkMode",       defaultOn: false },
  { label: "Privacy & Security", key: "privacy",        defaultOn: false },
  { label: "Help & Support",     key: "help",           defaultOn: false },
];
