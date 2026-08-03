"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";
import NotificationSystem from "@/components/NotificationSystem";
import LevelBadge from "@/components/LevelBadge";

import ProfileModule from "@/components/modules/ProfileModule";
import ShopModule from "@/components/modules/ShopModule";
import FileSystemModule from "@/components/modules/FileSystemModule";
import FlashcardsModule from "@/components/modules/FlashcardsModule";
import AITestModule from "@/components/modules/AITestModule";
import AISolver from "@/components/modules/AISolver";
import FocusTimerModule from "@/components/modules/FocusTimerModule";

export default function DashboardShell() {
  const { activeModule, setActiveModule, credits, totalCreditsEarned } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { level } = getLevelInfo(totalCreditsEarned);

  const menuItems = [
    { id: "profile", label: "Přehled", icon: "🏠" },
    { id: "shop", label: "Obchod & Kredity", icon: "🛒" },
    { id: "timer", label: "Study Timer", icon: "⏱️" },
    { id: "files", label: "Předměty & Složky", icon: "📚" },
    { id: "flashcards", label: "Kartičky", icon: "📇" },
    { id: "test", label: "AI Test Generator", icon: "📝" },
    { id: "solver", label: "AI Solver", icon: "🤖" },
    { id: "settings", label: "Nastavení", icon: "⚙️" },
  ];

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

        <nav className="space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-l-2 ${
                activeModule === item.id
                  ? "bg-surface-hover border-gold text-ink"
                  : "border-transparent text-muted hover:bg-surface-hover hover:text-ink"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-2 text-[11px] font-mono text-muted">Level {level} student</div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between bg-surface border-b border-edge p-4">
          <div className="flex items-center gap-3 min-w-0">
            <LevelBadge size={36} />
            <h1 className="font-display font-bold text-base text-ink truncate">Student AI</h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-xs font-mono font-semibold px-2.5 py-1.5 bg-canvas border border-edge text-gold rounded-full">
              {credits} 🪙
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-canvas border border-edge text-ink"
            >
              ☰
            </button>
          </div>
        </header>

        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-edge p-4 space-y-1 shadow-lg z-20 max-h-80 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  activeModule === item.id ? "bg-surface-hover text-ink" : "text-muted"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeModule === "profile" && <ProfileModule />}
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
      </div>

      <NotificationSystem />
    </div>
  );
}
