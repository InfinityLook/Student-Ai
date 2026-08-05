"use client";
import React from "react";

interface DashboardShellProps {
  activeModule: string;
  setActiveModule: (id: string) => void;
  children: React.ReactNode;
}

export default function DashboardShell({
  activeModule,
  setActiveModule,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">
      {/* Navigační lišta */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModule("menu")}
            className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition cursor-pointer"
          >
            🎓 Student AI
          </button>
        </div>
        {activeModule !== "menu" && (
          <button
            onClick={() => setActiveModule("menu")}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>←</span> Zpět do menu
          </button>
        )}
      </header>

      {/* Hlavní obsah */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
