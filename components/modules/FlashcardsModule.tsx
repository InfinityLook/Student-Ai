"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";

export default function FlashcardsModule() {
  const { totalCreditsEarned } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = [
    { question: "Co je to Next.js?", answer: "React framework pro produkční webové aplikace." },
    { question: "Co je to Tailwind CSS?", answer: "Utility-first CSS framework pro rychlý vývoj." },
    { question: "K čemu slouží Zustand?", answer: "Jednoduchý a rychlý stavový manažer pro React." },
  ];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>📇</span> Kartičky
          </h2>
          <p className="text-gray-400 text-sm mt-1">Chytré opakování a zkoušení.</p>
        </div>
        <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl text-amber-400 font-bold flex items-center gap-1.5 shadow-inner">
          <span>✨</span> {totalCreditsEarned}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-lg space-y-6 text-center">
        <div className="text-xs text-gray-400 uppercase tracking-wider">
          Kartička {currentIndex + 1} z {flashcards.length}
        </div>

        <div 
          onClick={() => setShowAnswer(!showAnswer)}
          className="min-h-[160px] bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center cursor-pointer hover:bg-white/10 transition shadow-inner"
        >
          <p className="text-lg font-medium text-white">
            {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
          </p>
        </div>

        <p className="text-xs text-gray-400">
          (Kliknutím na kartičku otočíš otázku/odpověď)
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 font-semibold text-sm transition active:scale-95"
          >
            Otočit
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 font-semibold text-sm transition active:scale-95"
          >
            Další kartička
          </button>
        </div>
      </div>
    </div>
  );
}
