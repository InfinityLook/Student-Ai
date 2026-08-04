"use client";

import React, { useState } from "react";

const TIPS = [
  "Ahoj! Jsem Kairo, tvůj studijní parťák. 👋",
  "Nezapomeň si mezi učením dát pauzu.",
  "Skvělá práce! Pokračuj v tom, jde ti to.",
  "Máš něco těžkého na programu? Mrkni na Plánovač.",
  "Opakování kartiček funguje nejlíp, když ho neodkládáš.",
  "AI mozek mi zatím chybí, ale brzy se ho dočkáš. 🧠",
];

export default function KairoAvatar({ size = 120 }: { size?: number }) {
  const [tipIndex, setTipIndex] = useState<number | null>(null);
  const [isTalking, setIsTalking] = useState(false);

  const handleTap = () => {
    setTipIndex(Math.floor(Math.random() * TIPS.length));
    setIsTalking(true);
    setTimeout(() => setIsTalking(false), 900);
  };

  const eyeSize = size * 0.12;

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleTap}
        className="relative animate-float focus:outline-none"
        style={{ width: size, height: size }}
        aria-label="Ťukni na Kaira pro tip"
      >
        <div className="absolute inset-0 rounded-full bg-violet/30 blur-2xl scale-90" />

        <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-violet to-violet-dim shadow-lg shadow-violet/40 flex flex-col items-center justify-center gap-2">
          <div className="flex" style={{ gap: size * 0.16 }}>
            <span
              className="block rounded-full bg-ink animate-blink"
              style={{ width: eyeSize, height: eyeSize * 1.3 }}
            />
            <span
              className="block rounded-full bg-ink animate-blink"
              style={{ width: eyeSize, height: eyeSize * 1.3 }}
            />
          </div>

          <div
            className="rounded-full bg-ink/90 transition-all duration-150"
            style={{
              width: isTalking ? size * 0.22 : size * 0.16,
              height: isTalking ? size * 0.09 : size * 0.045,
            }}
          />
        </div>
      </button>

      {tipIndex !== null && (
        <div className="bg-canvas border border-edge rounded-2xl px-4 py-3 max-w-xs text-center text-sm text-ink shadow-sm animate-toast-in">
          {TIPS[tipIndex]}
        </div>
      )}
    </div>
  );
}
