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

export default function DashboardShell() {
  const { activeModule, setActiveModule, credits, totalCreditsEarned } = useStore();
  const { level } = getLevelInfo(totalCreditsEarned);

  const isSubModule = SUB_MODULE_IDS.includes(activeModule);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <NotificationSystem />

      {/* Hlavní obsah */}
      <main className="flex-1 pb-24">
        {activeModule === "profile" && <ProfileModule />}
        {activeModule === "settings" && (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">⚙️ Nastavení</h2>
            <p className="text-gray-500">Nastavení aplikace a účtu bude brzy k dispozici.</p>
          </div>
        )}

        {/* Moduly a podstránky */}
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

      {/* Spodní navigace - vrácena do původního rozvržení */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3 px-6 flex justify-around items-center z-20 shadow-lg">
        <button
          onClick={() => setActiveModule("profile")}
          className={`flex flex-col items-center gap-1 ${
            activeModule === "profile" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-400"
          }`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs">Profil</span>
        </button>

        <button
          onClick={() => setActiveModule("menu")}
          className={`flex flex-col items-center gap-1 ${
            (activeModule === "menu" || (isSubModule && activeModule !== "knihovna")) ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-400"
          }`}
        >
          <span className="text-xl">▦</span>
          <span className="text-xs">Menu</span>
        </button>

        <button
          onClick={() => setActiveModule("knihovna")}
          className={`flex flex-col items-center gap-1 ${
            activeModule === "knihovna" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-400"
          }`}
        >
          <span className="text-xl">📚</span>
          <span className="text-xs">Knihovna</span>
        </button>

        <button
          onClick={() => setActiveModule("settings")}
          className={`flex flex-col items-center gap-1 ${
            activeModule === "settings" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-400"
          }`}
        >
          <span className="text-xl">⚙️</span>
          <span className="text-xs">Nastavení</span>
        </button>
      </nav>
    </div>
  );
}
