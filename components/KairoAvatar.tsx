"use client";

import { useEffect, useState } from "react";
import KairoVoice from "./kairo/KairoVoice";

const messages = [
  "Ahoj! Jsem Kairo, tvůj studijní parťák. Pomůžu ti zvládnout dnešní učení 🚀",
  "Vítej zpět! Podíváme se spolu, co dnes potřebuješ udělat?",
  "Jsem připravený ti pomoct s učením, testy i plánováním 📚",
  "Každý malý krok tě posouvá dál. Začneme spolu?"
];

interface KairoAvatarProps {
  size?: "sm" | "lg";
  showDetails?: boolean;
}

export default function KairoAvatar({ size = "lg", showDetails = false }: KairoAvatarProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const random = messages[Math.floor(Math.random() * messages.length)];
    setMessage(random);
  }, []);

  // Pokud chceme jen samotnou ikonku (např. do hlavičky)
  if (!showDetails) {
    const dimensionClass = size === "sm" ? "w-8 h-8 text-xl" : "w-24 h-24 text-5xl";
    return (
      <div
        className={`relative ${dimensionClass} rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-xl animate-pulse select-none`}
      >
        <span>🤖</span>
      </div>
    );
  }

  // Plná verze s chatem a tlačítkem (pokud bys ji někde chtěl)
  return (
    <div className="flex items-center gap-5">
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-xl animate-pulse select-none">
        <span className="text-5xl">🤖</span>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-cyan-400">Kairo</h3>
        <div className="mt-2 bg-white/10 border border-white/10 rounded-2xl p-4 text-gray-200">
          {message}
        </div>
        <button className="mt-3 px-5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 transition">
          🎙️ Mluvit s Kairem
        </button>
        <KairoVoice />
      </div>
    </div>
  );
}
