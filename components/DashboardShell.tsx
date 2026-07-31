"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import NotificationSystem from "@/components/NotificationSystem";

// Importy všech modulů
import ProfileModule from "@/components/modules/ProfileModule";
import ShopModule from "@/components/modules/ShopModule";
import FileSystemModule from "@/components/modules/FileSystemModule";
import FlashcardsModule from "@/components/modules/FlashcardsModule";
import AITestModule from "@/components/modules/AITestModule";
import AISolver from "@/components/modules/AISolver";

export default function DashboardShell() {
  const { activeModule, setActiveModule, credits } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "profile", label: "Profil & Přehled", icon: "🏠" },
    { id: "shop", label: "Obchod & Kredity", icon: "🛒" },
    { id: "files", label: "Předměty & Složky", icon: "📚" },
    { id: "flashcards", label: "Kartičky", icon: "📇" },
    { id: "test", label: "AI Test Generator", icon: "📝" },
    { id: "solver", label: "AI Solver", icon: "🤖" },
    { id: "settings", label: "Nastavení", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* Sidebar pro PC */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4">
        <div className="flex items-center justify-between mb-8 px-2">
          <h1 className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            School IDE
          </h1>
          <span className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded-full font-semibold">
            {credits} 🪙
          </span>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeModule === item.id
                  ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Hlavní obsahová část */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobilní header */}
        <header className="md:hidden flex items-center justify-between bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4">
          <h1 className="font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            School IDE
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded-full font-semibold">
              {credits} 🪙
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            >
              ☰
            </button>
          </div>
        </header>

        {/* Mobilní rozbalovací menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 space-y-1 shadow-lg z-20 max-h-80 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  activeModule === item.id
                    ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Dynamický render aktivního modulu */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeModule === "profile" && <ProfileModule />}
          {activeModule === "shop" && <ShopModule />}
          {activeModule === "files" && <FileSystemModule />}
          {activeModule === "flashcards" && <FlashcardsModule />}
          {activeModule === "test" && <AITestModule />}
          {activeModule === "solver" && <AISolver />}
          {activeModule === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">⚙️ Nastavení aplikací</h2>
                <p className="text-zinc-500 text-sm mb-6">Konfigurace předvoleb a výběr AI modelů.</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-white">Výchozí AI Model</div>
                      <div className="text-xs text-zinc-500">Gemini 1.5 Pro (Doporučeno pro komplexní úkoly)</div>
                    </div>
                    <span className="text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded-lg font-semibold">Aktivní</span>
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
