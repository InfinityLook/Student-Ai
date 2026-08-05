"use client";

import React from "react";
import { useStore } from "@/store/useStore";

type Tile = {
  id: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
};

const AI_TILES: Tile[] = [
  { id: "solver", label: "AI Solver", description: "Pomoc s úkoly", icon: "🤖", accent: "from-teal-500/20 to-cyan-500/20 text-teal-400" },
  { id: "test", label: "AI Test Generator", description: "Cvičné kvízy", icon: "📝", accent: "from-violet-500/20 to-purple-500/20 text-violet-400" },
];

const STANDARD_TILES: Tile[] = [
  { id: "planner", label: "Plánovač", description: "Úkoly a termíny", icon: "📋", accent: "from-purple-500/20 to-indigo-500/20 text-purple-400" },
  { id: "timer", label: "Study Timer", description: "Soustřeď se a získej odměnu", icon: "⏱️", accent: "from-emerald-500/20 to-teal-500/20 text-emerald-400" },
  { id: "files", label: "Předměty & Složky", description: "Studijní materiály", icon: "📚", accent: "from-blue-500/20 to-cyan-500/20 text-blue-400" },
  { id: "flashcards", label: "Kartičky", description: "Chytré opakování", icon: "📇", accent: "from-yellow-500/20 to-orange-500/20 text-yellow-400" },
  { id: "knihovna", label: "Knihovna", description: "Studijní knihy", icon: "📖", accent: "from-pink-500/20 to-rose-500/20 text-pink-400" },
];

function TileGrid({ tiles, onSelect }: { tiles: Tile[]; onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {tiles.map((tile) => (
        <button
          key={tile.id}
          onClick={() => onSelect(tile.id)}
          className="
            bg-white/5 
            border 
            border-white/10 
            p-5 
            rounded-3xl 
            backdrop-blur-xl 
            text-left 
            transition-all 
            hover:bg-white/10 
            hover:border-white/20 
            hover:-translate-y-0.5 
            active:scale-95
            shadow-lg
          "
        >
          <span
            className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl text-xl mb-3 bg-gradient-to-br ${tile.accent} border border-white/10`}
          >
            {tile.icon}
          </span>
          <div className="font-semibold text-white text-sm">{tile.label}</div>
          <div className="text-xs text-gray-400 mt-0.5">{tile.description}</div>
        </button>
      ))}
    </div>
  );
}

export default function MenuHubModule() {
  const { setActiveModule } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header karty menu */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>▦</span> Menu
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Všechny nástroje appky na jednom místě.
        </p>
      </div>

      {/* AI moduly */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <span className="text-sm">✨</span>
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">AI moduly</h3>
        </div>
        <TileGrid tiles={AI_TILES} onSelect={setActiveModule} />
      </div>

      {/* Klasické moduly */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <span className="text-sm">🧩</span>
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Studijní nástroje</h3>
        </div>
        <TileGrid tiles={STANDARD_TILES} onSelect={setActiveModule} />
      </div>
    </div>
  );
}
