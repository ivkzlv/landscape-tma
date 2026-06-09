import { MapPin, DollarSign, Plus } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { leads } from "@/lib/data";
import type { Lead } from "@/lib/types";
import { Colors } from "@/lib/theme";

function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">{lead.name}</span>
        <StatusBadge status={lead.status} />
      </div>
      <div className="flex items-center gap-1">
        <MapPin size={12} color="#9CA3AF" />
        <span className="text-xs text-gray-400">{lead.location}</span>
      </div>
      <div className="flex items-center gap-1">
        <DollarSign size={12} color={Colors.primary} />
        <span className="text-xs font-bold" style={{ color: Colors.primary }}>{lead.budget}</span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{lead.summary}</p>
    </div>
  );
}

export default function LeadsScreen() {
  return (
    <div className="relative flex-1 overflow-y-auto bg-app-bg">
      <div className="px-4 pt-12 pb-28 flex flex-col gap-3">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Leads</h1>
        {leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
      </div>

      {/* FAB */}
      <button
        className="fixed right-5 bottom-24 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: Colors.primary }}
      >
        <Plus size={26} color="white" />
      </button>
    </div>
  );
}
