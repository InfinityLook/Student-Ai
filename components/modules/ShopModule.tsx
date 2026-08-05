"use client";

import React from "react";
import { useStore } from "@/store/useStore";

export default function ShopModule() {
  const { totalCreditsEarned, setTotalCreditsEarned } = useStore();

  const handleBuy = (cost: number, itemName: string) => {
    if (totalCreditsEarned < cost) {
      alert("Nemáš dostatek kreditu!");
      return;
    }
    setTotalCreditsEarned(totalCreditsEarned - cost);
    alert(`Úspěšně jsi zakoupil: ${itemName}!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>🛍️</span> Obchod & Odměny
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Utrať své těžce vydělané kredity za bonusy.
          </p>
        </div>
        <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl text-amber-400 font-bold flex items-center gap-1.5 shadow-inner">
          <span>✨</span> {totalCreditsEarned}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-white/10 flex items-center justify-center text-xl mb-4">
              ☕
            </div>
            <h3 className="text-lg font-semibold text-white">Virtuální káva pro Kaira</h3>
            <p className="text-gray-400 text-sm mt-1">Nakrm svého AI parťáka kávou a získej bleskovou motivaci.</p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-amber-400 font-bold">💎 150 kreditů</span>
            <button
              onClick={() => handleBuy(150, "Virtuální káva")}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 font-medium text-sm transition active:scale-95"
            >
              Koupit
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center text-xl mb-4">
              🎨
            </div>
            <h3 className="text-lg font-semibold text-white">Exkluzivní vzhled chatu</h3>
            <p className="text-gray-400 text-sm mt-1">Odemkni si prémiové barevné schéma pro konverzace s AI.</p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-amber-400 font-bold">💎 500 kreditů</span>
            <button
              onClick={() => handleBuy(500, "Exkluzivní vzhled chatu")}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 font-medium text-sm transition active:scale-95"
            >
              Koupit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
