import { Colors } from "@/lib/theme";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="flex-1 px-4 py-3">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
          Step {current} of {total}
        </span>
        <span className="text-xs font-bold" style={{ color: Colors.primary }}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: Colors.primary }}
        />
      </div>
    </div>
  );
}
