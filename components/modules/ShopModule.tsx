"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";

export default function ShopModule() {
  const { credits, addCredits, addNotification } = useStore();
  const [watchingAd, setWatchingAd] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleWatchAd = () => {
    if (watchingAd) return;
    setWatchingAd(true);
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setWatchingAd(false);
          addCredits(10);
          addNotification("Úspěšně jsi sledoval reklamu! Získáváš 10 kreditů 🪙", "success");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBuyCredits = (amount: number, price: string) => {
    addCredits(amount);
    addNotification(`Úspěšně zakoupen balíček za ${price}! Připsáno ${amount} kreditů.`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">🛒 Obchod & Ekonomika</h2>
          <p className="text-zinc-500 text-sm mt-1">Doplň si kredity pro pokročilé AI funkce.</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-400">Aktuální stav</div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{credits} 🪙</div>
        </div>
      </div>

      {/* Získat zdarma (reklama) */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-900 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200">🎁 Získej kredity zdarma</h3>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm mt-1">
            Podívej se na krátkou partnerskou reklamu (5 sekund) a získej 10 kreditů zdarma.
          </p>
        </div>
        <button
          onClick={handleWatchAd}
          disabled={watchingAd}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50 whitespace-nowrap"
        >
          {watchingAd ? `Sleduji reklamu... (${countdown}s)` : "Sledovat reklamu (+10 🪙)"}
        </button>
      </div>

      {/* Balíčky kreditů */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-lg font-bold text-zinc-900 dark:text-white">Startovní balíček</div>
            <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 my-2">50 🪙</div>
            <p className="text-zinc-500 text-sm">Ideální pro občasné využití AI Solveru.</p>
          </div>
          <button
            onClick={() => handleBuyCredits(50, "49 Kč")}
            className="mt-6 w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/50 font-semibold rounded-xl text-sm transition-colors"
          >
            Koupit za 49 Kč
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border-2 border-indigo-500 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Nejpopulárnější
          </div>
          <div>
            <div className="text-lg font-bold text-zinc-900 dark:text-white">Semestrální balíček</div>
            <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 my-2">150 🪙</div>
            <p className="text-zinc-500 text-sm">Pro každodenní studium a generování prací.</p>
          </div>
          <button
            onClick={() => handleBuyCredits(150, "129 Kč")}
            className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-indigo-500/20"
          >
            Koupit za 129 Kč
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-lg font-bold text-zinc-900 dark:text-white">Akademický PRO</div>
            <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 my-2">400 🪙</div>
            <p className="text-zinc-500 text-sm">Neomezené možnosti a nejlepší AI modely.</p>
          </div>
          <button
            onClick={() => handleBuyCredits(400, "299 Kč")}
            className="mt-6 w-full py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/50 font-semibold rounded-xl text-sm transition-colors"
          >
            Koupit za 299 Kč
          </button>
        </div>
      </div>
    </div>
  );
          }
