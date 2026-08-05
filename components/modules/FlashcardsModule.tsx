"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";

export default function FocusTimerModule() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const { totalCreditsEarned, setTotalCreditsEarned } = useStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setTotalCreditsEarned(totalCreditsEarned + 50);
      alert("Skvělá práce! Čas vypršel a získáváš 50 kreditů.");
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, totalCreditsEarned, setTotalCreditsEarned]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center">
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <span>⏱️</span> Study Timer
        </h2>
        <p className="text-gray-400 text-sm mt-1">Soustřeď se na úkol a získej odměnu.</p>
      </div>

      <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-lg space-y-8">
        <div className="text-6xl font-mono font-bold text-cyan-400 tracking-wider">
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-3 rounded-2xl font-semibold text-sm transition shadow-lg active:scale-95 ${
              isRunning
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
            }`}
          >
            {isRunning ? "Pozastavit" : "Spustit soustředění"}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(25 * 60);
            }}
            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 font-semibold text-sm transition active:scale-95"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
