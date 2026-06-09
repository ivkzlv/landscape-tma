import { Check } from "lucide-react";
import { Colors } from "@/lib/theme";

interface OptionButtonProps {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  variant?: "radio" | "checkbox";
}

export function OptionButton({
  label, description, selected, onPress, icon, variant = "radio",
}: OptionButtonProps) {
  const borderColor = selected ? Colors.primary : "#E5E7EB";
  const bgColor     = selected ? `${Colors.primary}0F` : "#fff";

  return (
    <button
      onClick={onPress}
      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-colors min-h-[52px]"
      style={{ borderColor, backgroundColor: bgColor }}
    >
      {/* Left indicator */}
      {variant === "checkbox" ? (
        <span
          className="flex items-center justify-center w-5 h-5 rounded-md border-2 shrink-0 transition-colors"
          style={{
            borderColor: selected ? Colors.primary : "#D1D5DB",
            backgroundColor: selected ? Colors.primary : "transparent",
          }}
        >
          {selected && <Check size={12} color="white" strokeWidth={3} />}
        </span>
      ) : icon ? (
        <span className="opacity-50 shrink-0">{icon}</span>
      ) : null}

      {/* Text */}
      <span className="flex-1 min-w-0">
        <span
          className="block text-sm font-semibold"
          style={{ color: selected ? Colors.primary : "#111827" }}
        >
          {label}
        </span>
        {description && (
          <span className="block text-xs text-gray-400 mt-0.5">{description}</span>
        )}
      </span>

      {/* Radio indicator */}
      {variant === "radio" && (
        <span
          className="flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-colors"
          style={{ borderColor: selected ? Colors.primary : "#D1D5DB" }}
        >
          {selected && (
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: Colors.primary }}
            />
          )}
        </span>
      )}
    </button>
  );
}
