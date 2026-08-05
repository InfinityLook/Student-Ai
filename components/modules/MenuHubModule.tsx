"use client";

import React, { useState } from "react";
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
  { id: "flashcards", label: "Kartičky", description: "Chytré opakování", icon: "📇", accent: "from-yellow-500/20 to-orange-500/20 text-yellow-400" },
];

const EDITOR_TILES: Tile[] = [
  { id: "notes", label: "Poznámky", description: "Zatím ve vývoji", icon: "🗒️", accent: "from-sky-500/20 to-blue-500/20 text-sky-400" },
];

const MANAGER_TILES: Tile[] = [
  { id: "files", label: "Předměty & Složky", description: "Studijní materiály", icon: "📚", accent: "from-blue-500/20 to-cyan-500/20 text-blue-400" },
  { id: "knihovna", label: "Knihovna", description: "Studijní knihy", icon: "📖", accent: "from-pink-500/20 to-rose-500/20 text-pink-400" },
];

const STANDARD_TILES: Tile[] = [
  { id: "planner", label: "Plánovač", description: "Úkoly a termíny", icon: "📋", accent: "from-purple-500/20 to-indigo-500/20 text-purple-400" },
  { id: "timer", label: "Study Timer", description: "Soustřeď se a získej odměnu", icon: "⏱️", accent: "from-emerald-500/20 to-teal-500/20 text-emerald-400" },
];

const ALL_TILES: Tile[] = [...AI_TILES, ...EDITOR_TILES, ...MANAGER_TILES, ...STANDARD_TILES];

function TileButton({ tile, onSelect, onRemove }: { tile: Tile; onSelect: (id: string) => void; onRemove?: () => void }) {
  return (
    <div className="relative group">
      <button
        onClick={() => onSelect(tile.id)}
        className="
          w-full h-full
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
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 border border-white/10 text-gray-300 hover:text-white hover:bg-black/70 flex items-center justify-center text-xs transition"
          aria-label="Odebrat z oblíbených"
        >
          ×
        </button>
      )}
    </div>
  );
}

function TileGrid({ tiles, onSelect }: { tiles: Tile[]; onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {tiles.map((tile) => (
        <TileButton key={tile.id} tile={tile} onSelect={onSelect} />
      ))}
    </div>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <span className="text-sm">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function MenuHubModule() {
  const { favorites, setFavorite, setActiveModule } = useStore();
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);

  const handlePick = (slot: number, moduleId: string) => {
    setFavorite(slot, moduleId);
    setPickerSlot(null);
  };

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

      {/* Oblíbené */}
      <Section icon="⭐" title="Oblíbené">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {favorites.map((favId, slot) => {
            const tile = favId ? ALL_TILES.find((t) => t.id === favId) : null;

            if (tile) {
              return (
                <TileButton
                  key={slot}
                  tile={tile}
                  onSelect={setActiveModule}
                  onRemove={() => setFavorite(slot, null)}
                />
              );
            }

            return (
              <div key={slot} className="relative">
                <button
                  onClick={() => setPickerSlot(pickerSlot === slot ? null : slot)}
                  className="w-full h-full min-h-[112px] border-2 border-dashed border-white/15 rounded-3xl flex flex-col items-center justify-center gap-1.5 text-gray-500 hover:text-cyan-400 hover:border-cyan-400/40 transition"
                >
                  <span className="text-2xl">+</span>
                  <span className="text-xs">Přidat oblíbené</span>
                </button>

                {pickerSlot === slot && (
                  <div className="absolute z-30 top-full mt-2 left-0 right-0 bg-[#12131a] border border-white/10 rounded-2xl shadow-2xl p-2 max-h-64 overflow-y-auto space-y-1">
                    {ALL_TILES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handlePick(slot, t.id)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 transition text-left"
                      >
                        <span className="text-base">{t.icon}</span>
                        <span className="text-sm text-white">{t.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* AI moduly */}
      <Section icon="✨" title="AI moduly">
        <TileGrid tiles={AI_TILES} onSelect={setActiveModule} />
      </Section>

      {/* Editory */}
      <Section icon="✏️" title="Editory">
        <TileGrid tiles={EDITOR_TILES} onSelect={setActiveModule} />
      </Section>

      {/* Správce */}
      <Section icon="🗄️" title="Správce">
        <TileGrid tiles={MANAGER_TILES} onSelect={setActiveModule} />
      </Section>

      {/* Studijní nástroje */}
      <Section icon="🧩" title="Studijní nástroje">
        <TileGrid tiles={STANDARD_TILES} onSelect={setActiveModule} />
      </Section>
    </div>
  );
          }
