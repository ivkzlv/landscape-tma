import { Flame, Thermometer, Snowflake } from "lucide-react";
import type { LeadStatus } from "@/lib/types";

const CONFIG: Record<LeadStatus, { bg: string; text: string; Icon: React.ElementType }> = {
  Hot:  { bg: "#FFEBEE", text: "#C62828", Icon: Flame },
  Warm: { bg: "#FFFDE7", text: "#F57F17", Icon: Thermometer },
  Cold: { bg: "#F5F5F5", text: "#616161", Icon: Snowflake },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const { bg, text, Icon } = CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
      style={{ backgroundColor: bg, color: text }}
    >
      <Icon size={11} color={text} />
      {status}
    </span>
  );
}
