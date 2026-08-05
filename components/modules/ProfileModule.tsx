"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";

export default function ProfileModule() {
  const { totalCreditsEarned } = useStore();
  const { level, progress, currentXp, xpNeeded } = getLevelInfo(totalCreditsEarned);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg text-center space-y-4">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-4xl shadow-xl">
          🤖
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Kairo Study AI</h2>
          <p className="text-gray-400 text-sm mt-1">Tvůj osobní studijní profil</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Aktuální level</span>
          <span className="text-cyan-400 font-bold">Úroveň {level}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Celkové kredity</span>
          <span className="text-amber-400 font-bold">✨ {totalCreditsEarned}</span>
        </div>
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progres levelu</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
