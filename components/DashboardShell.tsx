"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import KairoAvatar from "@/components/KairoAvatar";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { totalCreditsEarned } = useStore();
  const { level } = getLevelInfo(totalCreditsEarned);

  return (
    <div className="fixed inset-0 bg-[#090a0f] text-white flex flex-col overflow-hidden select-none">
      {/* Vrchní lišta */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02] backdrop-blur-xl z-20 shrink-0">
        <div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Student AI
          </h2>
          <p className="text-xs text-gray-400">Level {level} • Tvůj AI studijní parťák</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-inner overflow-hidden">
          <KairoAvatar size="sm" />
        </div>
      </header>

      {/* Hlavní obsah */}
      <main className={`flex-1 relative ${pathname === "/" ? "overflow-hidden" : "overflow-y-auto"} p-4 pb-24`}>
        {children}
      </main>

      {/* Fixní spodní navigace se 4 položkami */}
      <nav className="absolute bottom-0 left-0 right-0 h-16 bg-[#090a0f]/95 border-t border-white/10 backdrop-blur-2xl flex items-center justify-around px-2 z-50">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 transition ${
            pathname === "/" ? "text-cyan-400 font-semibold" : "text-gray-400 hover:text-white"
          }`}
        >
          <span className="text-lg">🏠</span>
          <span className="text-[10px]">Domů</span>
        </Link>
        <Link
          href="/menu"
          className={`flex flex-col items-center gap-1 transition ${
            pathname === "/menu" ? "text-cyan-400 font-semibold" : "text-gray-400 hover:text-white"
          }`}
        >
          <span className="text-lg">🗂️</span>
          <span className="text-[10px]">Menu</span>
        </Link>
        <Link
          href="/shop"
          className={`flex flex-col items-center gap-1 transition ${
            pathname === "/shop" ? "text-cyan-400 font-semibold" : "text-gray-400 hover:text-white"
          }`}
        >
          <span className="text-lg">🛍️</span>
          <span className="text-[10px]">Obchod</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-1 transition ${
            pathname === "/profile" ? "text-cyan-400 font-semibold" : "text-gray-400 hover:text-white"
          }`}
        >
          <span className="text-lg">⚙️</span>
          <span className="text-[10px]">Nastavení</span>
        </Link>
      </nav>
    </div>
  );
}
