"use client";

import React from "react";

interface KairoChatProps {
  onClose: () => void;
}

export default function KairoChat({ onClose }: KairoChatProps) {
  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0a0a0f] border-l border-white/10 shadow-2xl flex flex-col">
      {/* Hlavička chatu */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <h3 className="font-bold text-white">Kairo AI Asistent</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
          aria-label="Zavřít"
        >
          ✕
        </button>
      </div>

      {/* Obsah chatu */}
      <div className="flex-1 p-4 overflow-y-auto text-gray-300">
        <p>Jak vám mohu dnes pomoci?</p>
      </div>
    </div>
  );
}
