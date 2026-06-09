import { Colors } from "@/lib/theme";

interface ToggleProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
}

export function Toggle({ value, onValueChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onValueChange(!value)}
      className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none"
      style={{ backgroundColor: value ? Colors.primary : "#D1D5DB" }}
    >
      <span
        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200"
        style={{ transform: `translateX(${value ? "20px" : "0px"})` }}
      />
    </button>
  );
}
