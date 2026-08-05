"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";
import NotificationSystem from "@/components/NotificationSystem";
import LevelBadge from "@/components/LevelBadge";

import ProfileModule from "@/components/modules/ProfileModule";
import MenuHubModule from "@/components/modules/MenuHubModule";
import ShopModule from "@/components/modules/ShopModule";
import FileSystemModule from "@/components/modules/FileSystemModule";
import FlashcardsModule from "@/components/modules/FlashcardsModule";
import AITestModule from "@/components/modules/AITestModule";
import AISolver from "@/components/modules/AISolver";
import FocusTimerModule from "@/components/modules/FocusTimerModule";
import TaskPlannerModule from "@/components/modules/TaskPlannerModule";
import StudyLibrary from "@/components/StudyLibrary";


const SUB_MODULE_IDS = ["planner", "shop", "timer", "files", "flashcards", "test", "solver"];

const PRIMARY_TABS = [
  { id: "profile", label: "Profil", icon: "🏠" },
  { id: "menu", label: "Menu", icon: "▦" },
  { id: "knihovna", label: "knihovna", icon: "📚" },
  { id: "settings", label: "Nastavení", icon: "⚙️" },
];

export default function DashboardShell() {
  const { activeModule, setActiveModule, credits, totalCreditsEarned } = useStore();
  const { level } = getLevelInfo(totalCreditsEarned);

  const isSubModule = SUB_MODULE_IDS.includes(activeModule);
  const activeTab = activeModule === "profile" ? "profile" : activeModule === "settings" ? "settings" : "menu";

  return (
    <div className="flex h-screen bg-canvas text-ink overflow-hidden font-sans">
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-edge p-4">
        <div className="flex items-center gap-3 mb-8 px-2">
          <LevelBadge size={44} />
          <div className="min-w-0">
            <h1 className="font-display font-bold text-lg text-ink leading-tight">Student AI</h1>
            <div className="flex items-center gap-1 text-xs font-mono font-semibold text-gold">
              <span>{credits}</span>
              <span>🪙</span>
            </div>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {PRIMARY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-l-2 ${
                activeTab === tab.id
                  ? "bg-surface-hover border-gold text-ink"
                  : "border-transparent text-muted hover:bg-surface-hover hover:text-ink"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-2 text-[11px] font-mono text-muted">Level {level} student</div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between bg-surface border-b border-edge p-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <LevelBadge size={36} />
            <h1 className="font-display font-bold text-base text-ink truncate">Student AI</h1>
          </div>
          <span className="flex items-center gap-1 text-xs font-mono font-semibold px-2.5 py-1.5 bg-canvas border border-edge text-gold rounded-full shrink-0">
            {credits} 🪙
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-24 md:pb-8">
          {isSubModule && (
            <button
              onClick={() => setActiveModule("menu")}
              className="max-w-4xl mx-auto flex items-center gap-1 text-sm text-muted hover:text-ink mb-4 transition-colors"
            >
              ← Zpět do Menu
            </button>
          )}

          {activeModule === "profile" && <ProfileModule />}
          {activeModule === "menu" && <MenuHubModule />}
          {activeModule === "planner" && <TaskPlannerModule />}
          {activeModule === "shop" && <ShopModule />}
          {activeModule === "timer" && <FocusTimerModule />}
          {activeModule === "files" && <FileSystemModule />}
          {activeModule === "flashcards" && <FlashcardsModule />}
          {activeModule === "test" && <AITestModule />}
          {activeModule === "solver" && <AISolver />}
          {activeModule === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm">
                <h2 className="text-2xl font-display font-bold mb-2 text-ink">⚙️ Nastavení aplikací</h2>
                <p className="text-muted text-sm mb-6">Konfigurace předvoleb a výběr AI modelů.</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-edge">
                    <div>
                      <div className="font-semibold text-ink">Výchozí AI Model</div>
                      <div className="text-xs text-muted">Gemini 1.5 Pro (Doporučeno pro komplexní úkoly)</div>
                    </div>
                    <span className="text-xs px-3 py-1 bg-violet/10 text-violet rounded-lg font-semibold">Aktivní</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-edge flex items-stretch z-30 pb-[env(safe-area-inset-bottom)]">
          {PRIMARY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all active:scale-95"
            >
              <span className={`text-xl transition-transform ${activeTab === tab.id ? "scale-110" : ""}`}>
                {tab.icon}
              </span>
              <span className={`text-[11px] font-medium ${activeTab === tab.id ? "text-gold" : "text-muted"}`}>
                {tab.label}
              </span>
              <span
                className={`h-0.5 w-6 rounded-full transition-all ${
                  activeTab === tab.id ? "bg-gold" : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </nav>
      </div>

      <NotificationSystem />
    </div>
  );
                }
