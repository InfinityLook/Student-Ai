"use client";
import React from "react";

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  group: string;
}

const modulesList: ModuleItem[] = [
  {
    id: "notes",
    title: "Poznámky",
    description: "Rychlé poznámky a zápisky ze předmětů.",
    icon: "📝",
    group: "Studium",
  },
  {
    id: "tasks",
    title: "Úkoly a plánovač",
    description: "Správa úkolů, deadlinů a harmonogramu.",
    icon: "✅",
    group: "Studium",
  },
  {
    id: "flashcards",
    title: "Kartičky na učení",
    description: "Efektivní opakování metodou aktivního vzpomínání.",
    icon: "🎴",
    group: "Studium",
  },
  {
    id: "ai-solver",
    title: "AI Asistent & Solver",
    description: "Inteligentní řešení příkladů a vysvětlování látky.",
    icon: "🤖",
    group: "AI Nástroje",
  },
  {
    id: "ai-tests",
    title: "AI Testy",
    description: "Generování cvičných testů na míru podle předmětu.",
    icon: "📋",
    group: "AI Nástroje",
  },
  {
    id: "focus-timer",
    title: "Pomodoro Časovač",
    description: "Měření času na soustředěné studium a přestávky.",
    icon: "⏳",
    group: "Nástroje",
  },
  {
    id: "file-system",
    title: "Správce souborů",
    description: "Organizace studijních materiálů a dokumentů.",
    icon: "📁",
    group: "Nástroje",
  },
  // Zde je nově přidán Editor dokumentů do skupiny Editory:
  {
    id: "document-editor",
    title: "Editor dokumentů",
    description: "Pokročilý textový editor pro seminární práce, eseje a projekty.",
    icon: "📄",
    group: "Editory",
  },
];

interface MenuHubModuleProps {
  onSelectModule: (id: string) => void;
}

export default function MenuHubModule({ onSelectModule }: MenuHubModuleProps) {
  const groups = Array.from(new Set(modulesList.map((m) => m.group)));

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>🧭</span> Hlavní menu
        </h2>
        <p className="text-gray-400 text-sm mt-1">Vyberte si modul, který chcete otevřít.</p>
      </div>

      {groups.map((group) => (
        <div key={group} className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400 border-b border-white/10 pb-2">
            {group}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modulesList
              .filter((m) => m.group === group)
              .map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col justify-between group transition-all hover:bg-white/10 hover:border-cyan-500/30 cursor-pointer"
                >
                  <div>
                    <div className="text-3xl mb-3">{mod.icon}</div>
                    <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-base mb-1">
                      {mod.title}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-end items-center">
                    <span className="text-xs font-semibold text-cyan-500 group-hover:translate-x-1 transition-transform">
                      Otevřít →
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
