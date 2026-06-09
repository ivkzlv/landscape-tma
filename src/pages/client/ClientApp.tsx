import { useState } from "react";
import { Home as HomeIcon, User } from "lucide-react";
import OnboardingScreen  from "./OnboardingScreen";
import ClientProfileScreen from "./ClientProfileScreen";
import { Colors } from "@/lib/theme";

type Tab = "home" | "profile";

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "home",    label: "Заявка",  Icon: HomeIcon },
  { id: "profile", label: "Профиль", Icon: User },
];

export default function ClientApp() {
  const [active, setActive] = useState<Tab>("home");

  const Screen = active === "home" ? OnboardingScreen : ClientProfileScreen;

  return (
    <div className="flex flex-col h-screen bg-app-bg overflow-hidden">
      <div className="flex-1 overflow-hidden flex flex-col">
        <Screen />
      </div>

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
