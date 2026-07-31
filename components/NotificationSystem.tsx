"use client";

import React from "react";
import { useStore } from "@/store/useStore";

const STYLES: Record<string, { bar: string; icon: string }> = {
  success: { bar: "bg-mint", icon: "🏆" },
  error: { bar: "bg-coral", icon: "⚠️" },
  info: { bar: "bg-violet", icon: "✨" },
};

export default function NotificationSystem() {
  const { notifications, removeNotification } = useStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        const style = STYLES[n.type] ?? STYLES.info;
        return (
          <div
            key={n.id}
            className="pointer-events-auto bg-surface border border-edge rounded-xl shadow-2xl shadow-black/40 overflow-hidden flex items-stretch animate-toast-in"
          >
            <div className={`w-1.5 ${style.bar}`} />
            <div className="flex items-center gap-3 p-3.5 flex-1 min-w-0">
              <span className="text-lg shrink-0">{style.icon}</span>
              <span className="text-sm text-ink flex-1">{n.message}</span>
              <button onClick={() => removeNotification(n.id)} className="text-muted hover:text-ink font-bold shrink-0">
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
