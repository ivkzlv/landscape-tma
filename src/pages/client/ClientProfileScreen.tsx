import { User, Calendar, MapPin, CheckCircle, Clock, Leaf, LogOut } from "lucide-react";
import { useSession } from "@/lib/session-context";
import { Colors } from "@/lib/theme";

const NEXT_STEPS = [
  { Icon: Clock,  text: "Manager calls within 30 min to confirm" },
  { Icon: MapPin, text: "Architect visits your plot on the agreed date" },
  { Icon: Leaf,   text: "You receive a free detailed project proposal" },
];

export default function ClientProfileScreen() {
  const { session, setSession } = useSession();

  return (
    <div className="flex-1 overflow-y-auto bg-app-bg pb-8">
      {/* Hero */}
      <div
        className="flex flex-col items-center pt-14 pb-7"
        style={{ backgroundColor: Colors.primary }}
      >
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <User size={30} color="white" />
        </div>
        <p className="text-white font-bold text-lg">{session?.displayName ?? "Client"}</p>
        <p className="text-white/65 text-sm mt-0.5">Client · New Riga</p>
      </div>

      <div className="px-4 pt-4 flex flex-col gap-4">
        {/* Mini stats */}
        <div className="flex gap-3">
          {[
            { label: "Consultations", value: "1", Icon: Calendar },
            { label: "Projects",      value: "0", Icon: Leaf },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="flex-1 bg-white rounded-2xl p-4 flex flex-col items-center gap-1.5 shadow-sm">
              <Icon size={18} color={Colors.primary} />
              <span className="text-2xl font-extrabold text-gray-900">{value}</span>
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Upcoming booking */}
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Upcoming Booking</p>
        <div className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow-sm">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${Colors.primary}18` }}
          >
            <Calendar size={20} color={Colors.primary} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-sm font-bold text-gray-900">Tomorrow · 10:00 AM</span>
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: `${Colors.primary}18`, color: Colors.primary }}
              >
                <CheckCircle size={10} color={Colors.primary} />
                Confirmed
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={11} color="#9CA3AF" />
              <span className="text-xs text-gray-400">Your plot · On-site visit</span>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">What Happens Next</p>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {NEXT_STEPS.map(({ Icon, text }, i) => (
            <div
              key={text}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < NEXT_STEPS.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <Icon size={17} color={Colors.primary} />
              <span className="flex-1 text-sm text-gray-700">{text}</span>
            </div>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={() => setSession(null)}
          className="flex items-center justify-center gap-2 bg-white rounded-2xl shadow-sm"
          style={{ height: 52 }}
        >
          <LogOut size={16} color={Colors.danger} />
          <span className="text-sm font-semibold" style={{ color: Colors.danger }}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
