"use client";

import React from "react";
import { useStore } from "@/store/useStore";

const TILES: {
  id: string;
  label: string;
  description: string;
  icon: string;
  accent: "violet" | "gold" | "mint";
}[] = [
  { id: "planner", label: "Plánovač", description: "Úkoly a termíny", icon: "📋", accent: "violet" },
  { id: "shop", label: "Obchod & Kredity", description: "Doplň si kredity", icon: "🛒", accent: "gold" },
  { id: "timer", label: "Study Timer", description: "Soustřeď se a získej odměnu", icon: "⏱️", accent: "mint" },
  { id: "files", label: "Předměty & Složky", description: "Studijní materiály", icon: "📚", accent: "violet" },
  { id: "flashcards", label: "Kartičky", description: "Chytré opakování", icon: "📇", accent: "gold" },
  { id: "test", label: "AI Test Generator", description: "Cvičné kvízy", icon: "📝", accent: "violet" },
  { id: "solver", label: "AI Solver", description: "Pomoc s úkoly", icon: "🤖", accent: "mint" },
];

const ACCENT_CLASSES: Record<string, string> = {
  violet: "bg-violet/10 text-violet",
  gold: "bg-gold/10 text-gold",
  mint: "bg-mint/10 text-mint",
};

export default function MenuHubModule() {
  const { setActiveModule } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm">
        <h2 className="text-2xl font-display font-bold text-ink">▦ Menu</h2>
        <p className="text-muted text-sm mt-1">Všechny nástroje appky na jednom místě.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {TILES.map((tile) => (
          <button
            key={tile.id}
            onClick={() => setActiveModule(tile.id)}
            className="bg-surface p-5 rounded-2xl border border-edge shadow-sm text-left transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <span
              className={`inline-flex items-center justify-center w-11 h-11 rounded-xl text-xl mb-3 ${ACCENT_CLASSES[tile.accent]}`}
            >
              {tile.icon}
            </span>
            <div className="font-semibold text-ink text-sm">{tile.label}</div>
            <div className="text-xs text-muted mt-0.5">{tile.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
            }
