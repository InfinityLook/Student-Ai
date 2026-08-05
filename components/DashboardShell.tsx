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

const SUB_MODULE_IDS = ["planner", "shop", "timer", "files", "flashcards", "test", "solver", "knihovna"];

const PRIMARY_TABS = [
  { id: "profile", label: "Profil", icon: "🏠" },
  { id: "menu", label: "Menu", icon: "▦" },
  { id: "knihovna", label: "Knihovna", icon: "📚" },
  { id: "settings", label: "Nastavení", icon: "⚙️" },
];

export default function DashboardShell() {
  const { activeModule, setActiveModule, credits, totalCreditsEarned } = useStore();
  const { level } = getLevelInfo(totalCreditsEarned);

  const isSubModule = SUB_MODULE_IDS.includes(activeModule);
  const activeTab = activeModule === "profile" ? "profile" : activeModule === "settings" ? "settings" : "menu";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <NotificationSystem />

      {/* Horní lišta */}
      <header className="border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <LevelBadge level={level} />
          <h1 className="text-xl font-bold tracking-tight">Student AI</h1>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full font-medium text-sm">
          <span>🪙</span>
          <span>{credits}</span>
        </div>
      </header>

      {/* Hlavní obsah */}
      <main className="flex-1 pb-24">
        {activeModule === "profile" && <ProfileModule />}
        {activeModule === "settings" && (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">⚙️ Nastavení</h2>
            <p className="text-gray-500">Nastavení aplikace a účtu bude brzy k dispozici.</p>
          </div>
        )}

        {/* Podstránky / Moduly */}
        {activeModule === "menu" && <MenuHubModule />}
        {activeModule === "planner" && <TaskPlannerModule />}
        {activeModule === "shop" && <ShopModule />}
        {activeModule === "timer" && <FocusTimerModule />}
        {activeModule === "files" && <FileSystemModule />}
        {activeModule === "flashcards" && <FlashcardsModule />}
        {activeModule === "test" && <AITestModule />}
        {activeModule === "solver" && <AISolver />}
        {activeModule === "knihovna" && <StudyLibrary />}
      </main>

      {/* Spodní navigace */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3 px-6 flex justify-around items-center z-20 max-w-lg mx-auto rounded-t-2xl shadow-lg">
        {PRIMARY_TABS.map((tab) => {
          const isActive = activeTab === tab.id || (tab.id === "menu" && isSubModule && activeModule !== "knihovna");
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "menu") setActiveModule("menu");
                else if (tab.id === "knihovna") setActiveModule("knihovna");
                else setActiveModule(tab.id);
              }}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
