import type { CaseStudy, TimeSlot, AreaOption, BudgetOption, NeedOption, PriceRange } from "./onboarding-types";

export const caseStudies: CaseStudy[] = [
  { id: 1, title: "Voronov Estate — English Garden",        location: "New Riga, 15 acres",   tags: ["turnkey", "planting"],               gradientStart: "#2D5A3D", gradientEnd: "#6BAE7F", area: "15 acres", budget: "1.4M RUB" },
  { id: 2, title: "Sorokina Residence — Lawn & Irrigation", location: "Rublyovka, 8 acres",   tags: ["lawn-care", "turnkey"],              gradientStart: "#3A7D5A", gradientEnd: "#82C49E", area: "8 acres",  budget: "720K RUB" },
  { id: 3, title: "Fadeev Terrace — Minimalist Design",     location: "Skolkovo, 5 acres",    tags: ["design-only", "planting"],           gradientStart: "#1A3D2B", gradientEnd: "#4A8C5C", area: "5 acres",  budget: "320K RUB" },
  { id: 4, title: "Blinova Estate — Full Landscaping",      location: "Ilyinskoye, 20 acres", tags: ["turnkey", "design-only", "planting"], gradientStart: "#4A8C5C", gradientEnd: "#1A3D2B", area: "20 acres", budget: "2.6M RUB" },
  { id: 5, title: "Petrov Dacha — Lawn Renovation",         location: "Istra, 6 acres",       tags: ["lawn-care"],                         gradientStart: "#5BA078", gradientEnd: "#2D5A3D", area: "6 acres",  budget: "480K RUB" },
];

export function getMatchingCaseStudies(needs: NeedOption[]): CaseStudy[] {
  if (needs.length === 0) return caseStudies.slice(0, 2);
  const scored = caseStudies.map((cs) => ({
    cs,
    score: cs.tags.filter((t) => needs.includes(t)).length,
  }));
  const matched = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).map((s) => s.cs).slice(0, 3);
  return matched.length >= 2 ? matched : caseStudies.slice(0, 2);
}

const PRICE_MAP: Record<AreaOption, Record<BudgetOption, PriceRange>> = {
  "up-to-6":      { "under-500k": { low: "200,000", high: "450,000" }, "500k-1.5m": { low: "450,000", high: "900,000" },     "over-1.5m": { low: "900,000",   high: "1,500,000" }, "need-consultation": { low: "300,000",   high: "800,000"   } },
  "6-to-15":      { "under-500k": { low: "400,000", high: "500,000" }, "500k-1.5m": { low: "600,000", high: "1,300,000" },   "over-1.5m": { low: "1,300,000", high: "2,500,000" }, "need-consultation": { low: "700,000",   high: "1,800,000" } },
  "more-than-15": { "under-500k": { low: "500,000", high: "800,000" }, "500k-1.5m": { low: "900,000", high: "1,500,000" },   "over-1.5m": { low: "1,800,000", high: "4,000,000" }, "need-consultation": { low: "1,200,000", high: "3,500,000" } },
  "not-sure":     { "under-500k": { low: "200,000", high: "500,000" }, "500k-1.5m": { low: "500,000", high: "1,200,000" },   "over-1.5m": { low: "1,200,000", high: "3,000,000" }, "need-consultation": { low: "400,000",   high: "2,000,000" } },
};

export function estimatePrice(area: AreaOption | null, budget: BudgetOption | null): PriceRange | null {
  if (!area || !budget) return null;
  return PRICE_MAP[area][budget];
}

function buildSlots(): TimeSlot[] {
  const now = new Date();
  const slots: TimeSlot[] = [];
  const times = ["10:00 AM", "2:00 PM", "4:30 PM"];
  const dayNames   = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const monthNames = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];

  for (let d = 1; d <= 3; d++) {
    const date = new Date(now);
    date.setDate(now.getDate() + d);
    const dayLabel = `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
    times.forEach((time, ti) => {
      slots.push({ id: `d${d}-t${ti}`, label: dayLabel, time, available: !(d === 2 && ti === 1) });
    });
  }
  return slots;
}

export const calendarSlots: TimeSlot[] = buildSlots();
