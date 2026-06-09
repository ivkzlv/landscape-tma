import { Clock, Phone, Navigation, Briefcase, ChevronRight } from "lucide-react";
import { calendarEvents } from "@/lib/data";
import type { EventType } from "@/lib/types";
import { Colors } from "@/lib/theme";

const EVENT_ICONS: Record<EventType, React.ElementType> = {
  visit: Navigation, call: Phone, review: Briefcase, meeting: Briefcase,
};

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = 3;

export default function CalendarScreen() {
  return (
    <div className="flex-1 overflow-y-auto bg-app-bg">
      <div className="px-4 pt-12 pb-8 flex flex-col gap-5">
        <h1 className="text-2xl font-extrabold text-gray-900">Calendar</h1>

        {/* Week strip */}
        <div className="flex justify-between">
          {DAY_LABELS.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400">{day}</span>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={i === TODAY ? { backgroundColor: Colors.primary } : {}}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: i === TODAY ? "#fff" : "#111827" }}
                >
                  {i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Events */}
        <div className="flex flex-col gap-3">
          {calendarEvents.map((ev) => {
            const Icon = EVENT_ICONS[ev.type];
            return (
              <div key={ev.id} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: ev.color + "18" }}
                >
                  <Icon size={20} color={ev.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {ev.title} — {ev.client}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={11} color="#9CA3AF" />
                    <span className="text-xs text-gray-400">{ev.time}</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#D1D5DB" />
              </div>
            );
          })}
        </div>

        <button
          className="h-13 rounded-2xl text-white font-bold text-sm flex items-center justify-center"
          style={{ backgroundColor: Colors.primary, height: 52 }}
        >
          + Add Event
        </button>
      </div>
    </div>
  );
}
