"use client";

import React from "react";

interface KairoFloatingProps {
  onClick: () => void;
}

export default function KairoFloating({ onClick }: KairoFloatingProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold rounded-2xl shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 cursor-pointer"
      aria-label="Otevřít Kairo asistenta"
    >
      <span className="text-xl">✨</span>
      <span className="hidden sm:inline">Kairo AI</span>
    </button>
  );
}
