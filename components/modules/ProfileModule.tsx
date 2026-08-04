"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { getLevelInfo, XP_PER_LEVEL } from "@/lib/gamification";

export default function ProfileModule() {
  const { credits, totalCreditsEarned, setActiveModule, tasks } = useStore();
  const { level, xpIntoLevel, progress } = getLevelInfo(totalCreditsEarned);
  const activeTaskCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-violet to-violet-dim rounded-3xl p-6 text-ink shadow-lg shadow-violet/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-display font-bold">Vítej zpět, Studente! 🎓</h2>
            <p className="text-ink/80 text-sm mt-1">
              Sbírej kredity, řeš úkoly a levluj. Tvůj akademický prostor je připraven.
            </p>
          </div>
          <div className="bg-canvas/25 backdrop-blur-md px-4 py-3 rounded-xl border border-ink/20 flex items-center gap-3">
            <span className="text-2xl">🪙</span>
            <div>
              <div className="text-xs text-ink/70">Zůstatek kreditů</div>
              <div className="text-lg font-mono font-bold">{credits}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono text-ink/80 mb-1.5">
            <span>Level {level}</span>
            <span>{xpIntoLevel} / {XP_PER_LEVEL} XP</span>
          </div>
          <div className="h-2.5 rounded-full bg-canvas/30 overflow-hidden">
            <div className="h-full bg-gold rounded-full transition-all duration-700" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveModule("planner")}
          className="bg-surface p-5 rounded-2xl border border-edge shadow-sm cursor-pointer hover:border-violet transition-all"
        >
          <div className="text-muted text-sm mb-1">Aktivní úkoly</div>
          <div className="text-2xl font-display font-bold text-ink">{activeTaskCount}</div>
          <div className={`text-xs mt-2 ${activeTaskCount === 0 ? "text-mint" : "text-gold"}`}>
            {activeTaskCount === 0 ? "Vše pod kontrolou" : "Otevřít plánovač →"}
          </div>
        </div>
        <div className="bg-surface p-5 rounded-2xl border border-edge shadow-sm">
          <div className="text-muted text-sm mb-1">AI Řešení</div>
          <div className="text-2xl font-display font-bold text-ink">12</div>
          <div className="text-xs text-violet mt-2">Využito tento týden</div>
        </div>
        <div className="bg-surface p-5 rounded-2xl border border-edge shadow-sm">
          <div className="text-muted text-sm mb-1">Uložené práce</div>
          <div className="text-2xl font-display font-bold text-ink">5</div>
          <div className="text-xs text-gold mt-2">Sync aktivní</div>
        </div>
      </div>

      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm space-y-4">
        <h3 className="text-lg font-display font-bold text-ink">⚡ Rychlé akce</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveModule("timer")}
            className="flex items-center gap-3 p-4 rounded-xl border border-edge hover:border-mint transition-all text-left group"
          >
            <span className="text-2xl p-2 rounded-lg bg-mint/10 group-hover:scale-110 transition-transform">⏱️</span>
            <div>
              <div className="font-semibold text-ink">Spustit Study Timer</div>
              <div className="text-xs text-muted">Soustřeď se a získej kredity</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModule("solver")}
            className="flex items-center gap-3 p-4 rounded-xl border border-edge hover:border-violet transition-all text-left group"
          >
            <span className="text-2xl p-2 rounded-lg bg-violet/10 group-hover:scale-110 transition-transform">🤖</span>
            <div>
              <div className="font-semibold text-ink">Spustit AI Solver</div>
              <div className="text-xs text-muted">Vyřešit příklad nebo domácí úkol</div>
            </div>
          </button>

          <button
            onClick={() => setActiveModule("test")}
            className="flex items-center gap-3 p-4 rounded-xl border border-edge hover:border-gold transition-all text-left group"
          >
            <span className="text-2xl p-2 rounded-lg bg-gold/10 group-hover:scale-110 transition-transform">📝</span>
            <div>
              <div className="font-semibold text-ink">Vygenerovat AI test</div>
              <div className="text-xs text-muted">Procvič si libovolné téma nanečisto</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
