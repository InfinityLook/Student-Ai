"use client";

import React from "react";
import { useStore } from "@/store/useStore";

export default function NotificationSystem() {
  const { notifications, removeNotification } = useStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-lg border text-sm flex items-center justify-between transition-all transform translate-y-0 opacity-100 ${
            n.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
              : n.type === "error"
              ? "bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
          }`}
        >
          <span>{n.message}</span>
          <button
            onClick={() => removeNotification(n.id)}
            className="ml-4 opacity-60 hover:opacity-100 font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
