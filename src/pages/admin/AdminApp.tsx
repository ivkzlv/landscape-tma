import { useState } from "react";
import { Users, Calendar, Briefcase, User } from "lucide-react";
import LeadsScreen    from "./LeadsScreen";
import CalendarScreen from "./CalendarScreen";
import ProjectsScreen from "./ProjectsScreen";
import ProfileScreen  from "./ProfileScreen";
import { Colors } from "@/lib/theme";

type Tab = "leads" | "calendar" | "projects" | "profile";

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "leads",    label: "Leads",    Icon: Users },
  { id: "calendar", label: "Calendar", Icon: Calendar },
  { id: "projects", label: "Projects", Icon: Briefcase },
  { id: "profile",  label: "Profile",  Icon: User },
];

export default function AdminApp() {
  const [active, setActive] = useState<Tab>("leads");

  const Screen = {
    leads:    LeadsScreen,
    calendar: CalendarScreen,
    projects: ProjectsScreen,
    profile:  ProfileScreen,
  }[active];

  return (
    <div className="flex flex-col h-screen bg-app-bg overflow-hidden">
      {/* Active screen */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <Screen />
      </div>

      {/* Bottom tab bar */}
      <nav className="flex bg-white/97 border-t border-gray-200 pb-safe">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="flex-1 flex flex-col items-center pt-2.5 pb-1 gap-0.5"
            >
              <Icon
                size={22}
                color={isActive ? Colors.primary : "#9CA3AF"}
                strokeWidth={isActive ? 2.2 : 1.6}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: isActive ? Colors.primary : "#9CA3AF" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
