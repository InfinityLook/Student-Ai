"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";

interface Card {
  id: string;
  question: string;
  answer: string;
}

export default function FlashcardsModule() {
  const { addNotification } = useStore();
  const [cards, setCards] = useState<Card[]>([
    { id: "1", question: "Co je to rekurze v programování?", answer: "Funkce, která volá sama sebe." },
    { id: "2", question: "Co vyjadřuje derivace funkce?", answer: "Okamžitou změnu hodnoty funkce (směrnici tečny)." },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCard = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      addNotification("Vyplň otázku i odpověď!", "error");
      return;
    }

    const newCard: Card = {
      id: Math.random().toString(36).substring(2, 9),
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
    };

    setCards([...cards, newCard]);
    setNewQuestion("");
    setNewAnswer("");
    setIsAdding(false);
    addNotification("Nová kartička byla úspěšně přidána!", "success");
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hlavička */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">📇 Kartičky & Flashcards</h2>
          <p className="text-zinc-500 text-sm mt-1">Metoda aktivního vzpomínání pro efektivní učení.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
        >
          {isAdding ? "Zavřít" : "+ Přidat kartičku"}
        </button>
      </div>

      {/* Formulář pro přidání kartičky */}
      {isAdding && (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-indigo-500 shadow-sm space-y-4">
          <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">Nová studijní kartička</h3>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Otázka (např. Hlavní město Austrálie?)"
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Odpověď (např. Canberra)"
            className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <button
            onClick={handleAddCard}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors"
          >
            Uložit kartičku
          </button>
        </div>
      )}

      {/* Interaktivní plocha kartičky */}
      {cards.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 p-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center text-zinc-400 text-sm">
          Zatím nemáš žádné kartičké. Přidej první výše.
        </div>
      ) : (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="bg-white dark:bg-zinc-900 h-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-indigo-500 transition-all select-none relative"
          >
            <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-lg">
              Kartička {currentIndex + 1} / {cards.length}
            </span>
            <span className="absolute top-4 right-4 text-xs text-zinc-400">
              Kliknutím otočíš 🔄
            </span>

            <div className="text-zinc-400 text-xs uppercase tracking-wider mb-2">
              {isFlipped ? "Odpověď" : "Otázka"}
            </div>
            <div className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
              {isFlipped ? cards[currentIndex].answer : cards[currentIndex].question}
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors shadow-lg shadow-indigo-500/20"
            >
              Další kartička →
            </button>
          </div>
        </div>
      )}
    </div>
  );
          }
          
