"use client";

import React from "react";
import { useStore } from "@/store/useStore";

export default function ProfileModule() {
  const { credits, setActiveModule } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Uvítací karta */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Vítej zpět, Studente! 🎓</h2>
          <p className="text-indigo-100 text-sm mt-1">
            Tvůj virtuální akademický prostor je připraven. Co dnes prozkoumáš?
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 flex items-center gap-3">
          <span className="text-2xl">🪙</span>
          <div>
            <div className="text-xs text-indigo-100">Zůstatek kreditů</div>
            <div className="text-lg font-bold">{credits} kreditů</div>
          </div>
        </div>
      </div>

      {/* Rychlé statistiky / Grid widgetů */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-zinc-400 text-sm mb-1">Aktivní úkoly</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">3</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">Vše pod kontrolou</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-zinc-400 text-sm mb-1">AI Řešení</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">12</div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">Využito tento týden</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-zinc-400 text-sm mb-1">Uložené práce</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">5</div>
          <div className="text-xs text-purple-600 dark:text-purple-400 mt-2">Sync aktivní</div>
        </div>
      </div>

      {/* Rychlé akce */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">⚡ Rychlé akce</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setActiveModule("solver")}
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-left group"
          >
            <span className="text-2xl p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 group-hover:scale-110 transition-transform">🤖</span>
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">Spustit AI Solver</div>
              <div className="text-xs text-zinc-500">Vyřešit příklad nebo domácí úkol</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModule("editor")}
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all text-left group"
          >
            <span className="text-2xl p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 group-hover:scale-110 transition-transform">📄</span>
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">Nová seminární práce</div>
              <div className="text-xs text-zinc-500">Otevřít textový editor</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
