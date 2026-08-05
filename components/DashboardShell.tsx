"use client";
import React from "react";

interface DashboardShellProps {
  activeModule: string;
  setActiveModule: (id: string) => void;
  onOpenKairo?: () => void;
  children: React.ReactNode;
}

export default function DashboardShell({
  activeModule,
  setActiveModule,
  onOpenKairo,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col pb-28">
      {/* Horní navigační lišta */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModule("menu")}
            className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition cursor-pointer flex items-center gap-2"
          >
            <span>🎓</span> Student AI
          </button>
        </div>

        {activeModule !== "menu" && (
          <button
            onClick={() => setActiveModule("menu")}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <span>←</span> Zpět do menu
          </button>
        )}
      </header>

      {/* Hlavní obsah */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        {children}
      </main>

      {/* Spodní plovoucí navigační panel */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-black/85 backdrop-blur-2xl border border-white/15 px-3 py-2.5 rounded-2xl shadow-2xl flex items-center gap-1.5 md:gap-3">
        {/* 1. Profil (Hlavní stránka s Kairo) */}
        <button
          onClick={() => {
            setActiveModule("profile");
            if (onOpenKairo) onOpenKairo();
          }}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition cursor-pointer ${
            activeModule === "profile"
              ? "bg-cyan-500/20 text-cyan-400"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span className="text-lg">✨</span>
          <span className="text-[10px] font-medium">Profil</span>
        </button>

        {/* 2. Menu */}
        <button
          onClick={() => setActiveModule("menu")}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition cursor-pointer ${
            activeModule === "menu"
              ? "bg-cyan-500/20 text-cyan-400"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">Menu</span>
        </button>

        {/* 3. Obchod */}
        <button
          onClick={() => setActiveModule("shop")}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition cursor-pointer ${
            activeModule === "shop"
              ? "bg-cyan-500/20 text-cyan-400"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span className="text-lg">🛒</span>
          <span className="text-[10px] font-medium">Obchod</span>
        </button>

        {/* 4. Chat */}
        <button
          onClick={() => {
            if (onOpenKairo) onOpenKairo();
          }}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition cursor-pointer text-gray-400 hover:text-cyan-400 hover:bg-white/5"
        >
          <span className="text-lg">💬</span>
          <span className="text-[10px] font-medium">Chat</span>
        </button>

        {/* 5. Nastavení */}
        <button
          onClick={() => setActiveModule("profile")}
          className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition cursor-pointer text-gray-400 hover:text-white hover:bg-white/5"
        >
          <span className="text-lg">⚙️</span>
          <span className="text-[10px] font-medium">Nastavení</span>
        </button>
      </nav>
    </div>
  );
}
