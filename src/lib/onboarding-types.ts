export type AreaOption     = "up-to-6" | "6-to-15" | "more-than-15" | "not-sure";
export type NeedOption     = "turnkey" | "design-only" | "planting" | "lawn-care";
export type BudgetOption   = "under-500k" | "500k-1.5m" | "over-1.5m" | "need-consultation";
export type TimelineOption = "within-1-month" | "this-season" | "next-year";

export type WizardScreen =
  | "welcome" | "qualification" | "disqualified"
  | "area" | "needs" | "budget-timeline"
  | "booking" | "success";

export interface WizardState {
  ownsPlot:     boolean | null;
  area:         AreaOption | null;
  needs:        NeedOption[];
  budget:       BudgetOption | null;
  timeline:     TimelineOption | null;
  selectedSlot: string | null;
  name:         string;
  phone:        string;
}

export interface CaseStudy {
  id: number;
  title: string;
  location: string;
  tags: NeedOption[];
  gradientStart: string;
  gradientEnd: string;
  area: string;
  budget: string;
}

export interface TimeSlot {
  id: string;
  label: string;
  time: string;
  available: boolean;
}

export interface PriceRange {
  low: string;
  high: string;
}
