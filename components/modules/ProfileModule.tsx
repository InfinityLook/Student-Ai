"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";

const QUICK_ACTIONS = [
  { id: "flashcards", emoji: "🃏", label: "Flashcards" },
  { id: "test", emoji: "📝", label: "AI Test" },
  { id: "timer", emoji: "⏱️", label: "Focus Timer" },
  { id: "files", emoji: "📁", label: "Soubory" },
  { id: "shop", emoji: "🛒", label: "Obchod" },
  { id: "knihovna", emoji: "📚", label: "Knihovna" },
];

export default function ProfileModule() {
  const { credits, totalCreditsEarned, setActiveModule } = useStore();
  const { level, progress } = getLevelInfo(totalCreditsEarned);
  const [showStats, setShowStats] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 10) setGreeting("Dobré ráno");
    else if (h < 18) setGreeting("Dobré odpoledne");
    else setGreeting("Dobrý večer");
  }, []);

  const progressPct = Math.min(100, Math.round(progress * 100));

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kairoFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes kairoPulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.18); opacity: 0.3; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(18deg); }
          75% { transform: rotate(-12deg); }
        }
        .kairo-float { animation: kairoFloat 4s ease-in-out infinite; }
        .kairo-pulse { animation: kairoPulse 3s ease-in-out infinite; }
        .kairo-blink { animation: blink 5s infinite; transform-origin: center; }
        .kairo-wave { animation: wave 2.5s ease-in-out infinite; transform-origin: bottom center; }
        .title-shimmer {
          background: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4, #2563eb);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .fade-up { animation: fadeUp 0.6s ease-out both; }
      ` }} />

      {/* Dekorativní glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-blue-300/30 dark:bg-blue-500/10 blur-3xl kairo-pulse" />

      <div className="relative z-10 flex flex-col items-center px-6 pt-14 pb-40 max-w-md mx-auto">
        {/* Kairo maskot */}
        <div className="relative mb-2 fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="kairo-float">
            <KairoMascot />
          </div>
        </div>

        {/* Pozdrav */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 fade-up" style={{ animationDelay: "0.15s" }}>
          {greeting}! 👋
        </p>

        {/* Nadpis */}
        <h1 className="text-4xl font-extrabold tracking-tight fade-up mb-1" style={{ animationDelay: "0.2s" }}>
          <span className="title-shimmer">Kairo Study AI</span>
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 fade-up" style={{ animationDelay: "0.28s" }}>
          Tvůj AI studijní parťák
        </p>

        {/* Level + kredity karta */}
        <div className="w-full fade-up" style={{ animationDelay: "0.35s" }}>
          <div className="rounded-3xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/60 dark:border-gray-800 shadow-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                  {level}
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Level</p>
                  <p className="font-bold text-sm">Úroveň {level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 dark:text-gray-500">Kredity</p>
                <p className="font-bold text-lg flex items-center gap-1">
                  <span className="text-amber-500">✦</span>
                  <span className="tabular-nums">{credits.toLocaleString("cs-CZ")}</span>
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-2">
              <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-1.5">
                {progressPct}% do dalšího levelu
              </p>
            </div>
          </div>
        </div>

        {/* Řada ikonek nad menu: Info (statistiky) vlevo | Rychlé akce vpravo */}
        <div className="w-full flex items-center justify-between mt-6 fade-up" style={{ animationDelay: "0.45s" }}>
          <button
            onClick={() => { setShowStats(true); setShowQuick(false); }}
            className="flex flex-col items-center gap-1 group"
            aria-label="Statistiky"
          >
            <span className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md flex items-center justify-center text-2xl group-hover:scale-110 group-active:scale-95 transition-transform">
              📊
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">Statistiky</span>
          </button>
          <button
            onClick={() => { setShowQuick(true); setShowStats(false); }}
            className="flex flex-col items-center gap-1 group"
            aria-label="Rychlé akce"
          >
            <span className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md flex items-center justify-center text-2xl group-hover:scale-110 group-active:scale-95 transition-transform">
              ⚡
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">Rychlé akce</span>
          </button>
        </div>
      </div>

      {/* Statistiky panel */}
      {showStats && (
        <StatsPanel credits={credits} totalCreditsEarned={totalCreditsEarned} level={level} onClose={() => setShowStats(false)} />
      )}

      {/* Rychlé akce panel */}
      {showQuick && (
        <QuickPanel
          actions={QUICK_ACTIONS}
          onPick={(id) => { setShowQuick(false); setActiveModule(id); }}
          onClose={() => setShowQuick(false)}
        />
      )}
    </div>
  );
}

/* ---------- Kairo maskot ---------- */
function KairoMascot() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kairoBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="kairoFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
        <radialGradient id="kairoCheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Stín */}
      <ellipse cx="70" cy="128" rx="34" ry="6" fill="#000" opacity="0.08" />
      {/* Tělo */}
      <path d="M70 18 C 100 18 116 44 116 74 C 116 104 96 124 70 124 C 44 124 24 104 24 74 C 24 44 40 18 70 18 Z" fill="url(#kairoBody)" />
      {/* Obličej */}
      <ellipse cx="70" cy="78" rx="38" ry="34" fill="url(#kairoFace)" />
      {/* Anténka */}
      <line x1="70" y1="20" x2="70" y2="6" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
      <circle cx="70" cy="5" r="4" fill="#fbbf24" />
      {/* Oči */}
      <g className="kairo-blink">
        <circle cx="56" cy="72" r="7" fill="#1e293b" />
        <circle cx="58" cy="70" r="2.4" fill="#fff" />
      </g>
      <g className="kairo-blink" style={{ animationDelay: "0.05s" }}>
        <circle cx="84" cy="72" r="7" fill="#1e293b" />
        <circle cx="86" cy="70" r="2.4" fill="#fff" />
      </g>
      {/* Tváře */}
      <circle cx="48" cy="86" r="7" fill="url(#kairoCheek)" />
      <circle cx="92" cy="86" r="7" fill="url(#kairoCheek)" />
      {/* Úsměv */}
      <path d="M58 90 Q 70 100 82 90" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Ruka mávající */}
      <g className="kairo-wave" style={{ transformOrigin: "108px 86px" }}>
        <ellipse cx="112" cy="86" rx="9" ry="7" fill="url(#kairoBody)" />
      </g>
    </svg>
  );
}

/* ---------- Statistiky panel ---------- */
function StatsPanel({ credits, totalCreditsEarned, level, onClose }: { credits: number; totalCreditsEarned: number; level: number; onClose: () => void; }) {
  const stats = [
    { label: "Celkem vyděláno", value: `${totalCreditsEarned.toLocaleString("cs-CZ")} ✦`, emoji: "🏅" },
    { label: "Aktuální kredity", value: `${credits.toLocaleString("cs-CZ")} ✦`, emoji: "💰" },
    { label: "Dosavadní level", value: `Lv ${level}`, emoji: "📈" },
    { label: "Otevřeno dnes", value: "1", emoji: "📅" },
  ];
  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center sm:justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">📊 Statistiky</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-gray-50 dark:bg-gray-800/60 p-4 border border-gray-100 dark:border-gray-800">
              <div className="text-2xl mb-1">{s.emoji}</div>
              <p className="text-xs text-gray-400 dark:text-gray-500">{s.label}</p>
              <p className="font-bold text-sm">{s.value}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">Více statistik brzy…</p>
      </div>
    </div>
  );
}

/* ---------- Rychlé akce panel ---------- */
function QuickPanel({ actions, onPick, onClose }: { actions: { id: string; emoji: string; label: string }[]; onPick: (id: string) => void; onClose: () => void; }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center sm:justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">⚡ Rychlé akce</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            ✕
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {actions.map((a) => (
            <button
              key={a.id}
              onClick={() => onPick(a.id)}
              className="flex flex-col items-center gap-2 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 p-4 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-700 active:scale-95 transition"
            >
              <span className="text-3xl">{a.emoji}</span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
