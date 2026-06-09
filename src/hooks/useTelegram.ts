import { useEffect } from "react";

// Minimal type shim so TypeScript knows about window.Telegram
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready(): void;
        expand(): void;
        close(): void;
        initData: string;
        initDataUnsafe: Record<string, unknown>;
        colorScheme: "light" | "dark";
        themeParams: Record<string, string>;
        BackButton: {
          isVisible: boolean;
          show(): void;
          hide(): void;
          onClick(cb: () => void): void;
          offClick(cb: () => void): void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          setText(text: string): void;
          onClick(cb: () => void): void;
          offClick(cb: () => void): void;
        };
        HapticFeedback: {
          impactOccurred(style: "light" | "medium" | "heavy"): void;
          notificationOccurred(type: "error" | "success" | "warning"): void;
          selectionChanged(): void;
        };
      };
    };
  }
}

/** Returns the WebApp instance (or null when running outside Telegram) */
export function useTelegram() {
  const tg = window.Telegram?.WebApp ?? null;

  useEffect(() => {
    if (!tg) return;
    tg.ready();   // Tell Telegram the app has loaded
    tg.expand();  // Request full-screen height
  }, [tg]);

  return { tg };
}
