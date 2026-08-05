"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";
import KairoAvatar from "@/components/KairoAvatar";
import DashboardShell from "@/components/DashboardShell";
import MenuHubModule from "@/components/modules/MenuHubModule";
import ShopModule from "@/components/modules/ShopModule";
import ProfileModule from "@/components/modules/ProfileModule";
import TaskPlannerModule from "@/components/modules/TaskPlannerModule";
import FocusTimerModule from "@/components/modules/FocusTimerModule";
import FileSystemModule from "@/components/modules/FileSystemModule";
import FlashcardsModule from "@/components/modules/FlashcardsModule";
import AITestModule from "@/components/modules/AITestModule";
import AISolver from "@/components/modules/AISolver";
import StudyLibrary from "@/components/StudyLibrary";

function HomeDashboard() {
  const { totalCreditsEarned, setActiveModule } = useStore();
  const { level, progress } = getLevelInfo(totalCreditsEarned);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Dobré ráno! ☀️" : hour < 18 ? "Dobrý den! 👋" : "Dobrý večer! 👋";

  return (
    <div className="h-full flex flex-col justify-between max-w-md mx-auto py-3 px-4 select-none overflow-hidden">
      {/* Horní část s Kairem */}
      <div className="flex flex-col items-center text-center space-y-2 pt-4">
        <div className="relative flex justify-center items-center py-2">
          <KairoAvatar />
        </div>

        <div className="mt-1">
          <p className="text-sm text-gray-400 font-medium">{greeting}</p>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-0.5">
            Kairo Study AI
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Tvůj AI studijní parťák</p>
        </div>
      </div>

      {/* Hlavní karta s levelem a kredity */}
      <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl shadow-xl space-y-4 my-auto">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 block font-medium">Level</span>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm">
                {level}
              </span>
              <span>Úroveň {level}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-gray-400 block font-medium">Kredity</span>
            <span className="text-amber-400 font-bold text-lg flex items-center justify-end gap-1">
              ✨ {totalCreditsEarned}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-center text-gray-400 font-medium">
            {Math.round(progress)}% do dalšího levelu
          </p>
        </div>
      </div>

      {/* Rychlé dlaždice / akce */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <button
          onClick={() => setActiveModule("profile")}
          className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl backdrop-blur-xl transition flex flex-col items-center text-center gap-2 group shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
            📊
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Statistiky</span>
            <span className="text-[10px] text-gray-400">Přehled pokroku</span>
          </div>
        </button>

        <button
          onClick={() => setActiveModule("shop")}
          className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl backdrop-blur-xl transition flex flex-col items-center text-center gap-2 group shadow-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
            ⚡
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Rychlé akce</span>
            <span className="text-[10px] text-gray-400">Obchod & Odměny</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { activeModule } = useStore();

  const renderModule = () => {
    switch (activeModule) {
      case "menu":
        return <MenuHubModule />;
      case "shop":
        return <ShopModule />;
      case "profile":
        return <ProfileModule />;
      case "planner":
        return <TaskPlannerModule />;
      case "timer":
        return <FocusTimerModule />;
      case "files":
        return <FileSystemModule />;
      case "flashcards":
        return <FlashcardsModule />;
      case "test":
        return <AITestModule />;
      case "solver":
        return <AISolver />;
      case "knihovna":
        return <StudyLibrary />;
      case "home":
      default:
        return <HomeDashboard />;
    }
  };

  return <DashboardShell>{renderModule()}</DashboardShell>;
}
