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
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">🛒 Obchod & Ekonomika</h2>
          <p className="text-muted text-sm mt-1">Doplň si kredity pro pokročilé AI funkce.</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted">Aktuální stav</div>
          <div className="text-xl font-mono font-bold text-gold">{credits} 🪙</div>
        </div>
      </div>

      <div className="bg-mint/10 border border-mint/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-display font-semibold text-mint">🎁 Získej kredity zdarma</h3>
          <p className="text-ink/80 text-sm mt-1">
            Podívej se na krátkou partnerskou reklamu (5 sekund) a získej 10 kreditů zdarma.
          </p>
        </div>
        <button
          onClick={handleWatchAd}
          disabled={watchingAd}
          className="px-5 py-3 bg-mint hover:brightness-110 text-canvas font-semibold rounded-xl text-sm transition-all shadow-lg shadow-mint/20 disabled:opacity-50 whitespace-nowrap"
        >
          {watchingAd ? `Sleduji reklamu... (${countdown}s)` : "Sledovat reklamu (+10 🪙)"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-lg font-display font-bold text-ink">Startovní balíček</div>
            <div className="text-3xl font-mono font-extrabold text-gold my-2">50 🪙</div>
            <p className="text-muted text-sm">Ideální pro občasné využití AI Solveru.</p>
          </div>
          <button
            onClick={() => handleBuyCredits(50, "49 Kč")}
            className="mt-6 w-full py-2.5 bg-surface-hover hover:bg-gold/10 hover:text-gold text-ink font-semibold rounded-xl text-sm transition-colors border border-edge"
          >
            Koupit za 49 Kč
          </button>
        </div>

        <div className="bg-surface p-6 rounded-2xl border-2 border-gold shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gold text-canvas text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Nejpopulárnější
          </div>
          <div>
            <div className="text-lg font-display font-bold text-ink">Semestrální balíček</div>
            <div className="text-3xl font-mono font-extrabold text-gold my-2">150 🪙</div>
            <p className="text-muted text-sm">Pro každodenní studium a generování prací.</p>
          </div>
          <button
            onClick={() => handleBuyCredits(150, "129 Kč")}
            className="mt-6 w-full py-2.5 bg-gold hover:brightness-110 text-canvas font-semibold rounded-xl text-sm transition-all shadow-lg shadow-gold/20"
          >
            Koupit za 129 Kč
          </button>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-lg font-display font-bold text-ink">Akademický PRO</div>
            <div className="text-3xl font-mono font-extrabold text-gold my-2">400 🪙</div>
            <p className="text-muted text-sm">Neomezené možnosti a nejlepší AI modely.</p>
          </div>
          <button
            onClick={() => handleBuyCredits(400, "299 Kč")}
            className="mt-6 w-full py-2.5 bg-surface-hover hover:bg-gold/10 hover:text-gold text-ink font-semibold rounded-xl text-sm transition-colors border border-edge"
          >
            Koupit za 299 Kč
          </button>
        </div>
      </div>
    </div>
  );
}
