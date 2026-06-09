import { useState } from "react";
import {
  TreePine, Target, TrendingUp, Banknote,
  Bell, Moon, Shield, HelpCircle, LogOut,
} from "lucide-react";
import { Toggle } from "@/components/ui/Toggle";
import { profileStats, settingItems } from "@/lib/data";
import { useSession } from "@/lib/session-context";
import { Colors } from "@/lib/theme";

const STAT_ICONS: Record<string, React.ElementType> = {
  "Total Leads": Target,
  Conversion:    TrendingUp,
  Revenue:       Banknote,
};
const SETTING_ICONS: Record<string, React.ElementType> = {
  notifications: Bell,
  darkMode:      Moon,
  privacy:       Shield,
  help:          HelpCircle,
};

export default function AdminProfileScreen() {
  const { setSession } = useSession();
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(settingItems.map((s) => [s.key, s.defaultOn]))
  );

  return (
    <div className="flex-1 overflow-y-auto bg-app-bg pb-8">
      {/* Hero */}
      <div
        className="flex flex-col items-center pt-14 pb-7"
        style={{ backgroundColor: Colors.primary }}
      >
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <TreePine size={36} color="white" />
        </div>
        <p className="text-white font-bold text-lg">Ivan Kozlov</p>
        <p className="text-white/65 text-sm mt-0.5">Landscape Designer · Moscow</p>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-4">
        {/* Stats */}
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">This Month</p>
        <div className="flex gap-2.5">
          {profileStats.map((stat) => {
            const Icon = STAT_ICONS[stat.label] ?? Target;
            return (
              <div
                key={stat.label}
                className="flex-1 bg-white rounded-2xl p-3 flex flex-col items-center gap-1 shadow-sm"
              >
                <Icon size={18} color={Colors.primary} />
                <span className="text-xl font-extrabold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-400 text-center">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Settings */}
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Settings</p>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {settingItems.map((item, i) => {
            const Icon = SETTING_ICONS[item.key] ?? Bell;
            return (
              <div
                key={item.key}
                className={`flex items-center gap-3 px-4 py-3.5 ${i < settingItems.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <Icon size={18} color="#6B7280" />
                <span className="flex-1 text-sm text-gray-800">{item.label}</span>
                <Toggle
                  value={toggles[item.key]}
                  onValueChange={(v) => setToggles((p) => ({ ...p, [item.key]: v }))}
                />
              </div>
            );
          })}
        </div>

        {/* Sign out */}
        <button
          onClick={() => setSession(null)}
          className="flex items-center justify-center gap-2 bg-white rounded-2xl h-13 shadow-sm"
          style={{ height: 52 }}
        >
          <LogOut size={16} color={Colors.danger} />
          <span className="text-sm font-semibold" style={{ color: Colors.danger }}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
