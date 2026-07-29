"use client";

import React, { useState } from "react";
import { useStore } from "@/useStore";
import NotificationSystem from "@/components/NotificationSystem";

// Importy modulů (zatím placeholder nebo reálné komponenty)
import AISolver from "@/components/modules/AISolver";
import WorkEditor from "@/components/modules/WorkEditor";

export default function DashboardShell() {
  const { activeModule, setActiveModule, credits } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "profile", label: "Profil & Přehled", icon: "🏠" },
    { id: "shop", label: "Obchod & Kredity", icon: "🛒" },
    { id: "solver", label: "AI Solver", icon: "🤖" },
    { id: "editor", label: "Editor prací", icon: "📄" },
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
          <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded-full font-semibold">
            {credits} 🪙
          </span>
        </div>

        <nav className="space-y-1 flex-1">
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
          <h1 className="font-bold text-lg">School IDE</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded-full font-semibold">
              {credits} 🪙
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
            >
              ☰
            </button>
          </div>
        </header>

        {/* Mobilní rozbalovací menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 space-y-1">
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

        {/* Dynamický render modulu */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeModule === "profile" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Vítej zpět!</h2>
              <p className="text-zinc-500">Zde bude tvůj hlavní přehled, widgety a statistiky.</p>
            </div>
          )}
          {activeModule === "shop" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Obchod & Kredity</h2>
              <p className="text-zinc-500">Zde si budeš moci dobíjet kredity a sledovat reklamy.</p>
            </div>
          )}
          {activeModule === "solver" && <AISolver />}
          {activeModule === "editor" && <WorkEditor />}
          {activeModule === "settings" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Nastavení aplikací</h2>
              <p className="text-zinc-500">Konfigurace AI modelů a předvoleb.</p>
            </div>
          )}
        </main>
      </div>

      <NotificationSystem />
    </div>
  );
          }
              
