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
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">📇 Kartičky & Flashcards</h2>
          <p className="text-muted text-sm mt-1">Metoda aktivního vzpomínání pro efektivní učení.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-violet hover:brightness-110 text-ink rounded-xl text-sm font-medium transition-all shadow-lg shadow-violet/20"
        >
          {isAdding ? "Zavřít" : "+ Přidat kartičku"}
        </button>
      </div>

      {isAdding && (
        <div className="bg-surface p-6 rounded-2xl border border-violet shadow-sm space-y-4">
          <h3 className="font-semibold text-ink text-sm">Nová studijní kartička</h3>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Otázka (např. Hlavní město Austrálie?)"
            className="w-full p-3 rounded-xl border border-edge bg-canvas text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet text-sm"
          />
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Odpověď (např. Canberra)"
            className="w-full p-3 rounded-xl border border-edge bg-canvas text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet text-sm"
          />
          <button
            onClick={handleAddCard}
            className="w-full py-2.5 bg-violet hover:brightness-110 text-ink font-medium rounded-xl text-sm transition-all"
          >
            Uložit kartičku
          </button>
        </div>
      )}

      {cards.length === 0 ? (
        <div className="bg-surface p-12 rounded-2xl border border-edge text-center text-muted text-sm">
          Zatím nemáš žádné kartičky. Přidej první výše.
        </div>
      ) : (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="bg-surface h-64 rounded-2xl border border-edge shadow-sm flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-violet transition-all select-none relative"
          >
            <span className="absolute top-4 left-4 text-xs font-mono font-semibold px-2.5 py-1 bg-canvas text-muted rounded-lg border border-edge">
              Kartička {currentIndex + 1} / {cards.length}
            </span>
            <span className="absolute top-4 right-4 text-xs text-muted">Kliknutím otočíš 🔄</span>

            <div className="text-muted text-xs uppercase tracking-wider mb-2">
              {isFlipped ? "Odpověď" : "Otázka"}
            </div>
            <div className="text-xl md:text-2xl font-display font-bold text-ink">
              {isFlipped ? cards[currentIndex].answer : cards[currentIndex].question}
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-violet hover:brightness-110 text-ink font-medium rounded-xl text-sm transition-all shadow-lg shadow-violet/20"
            >
              Další kartička →
            </button>
          </div>
        </div>
      )}
    </div>
  );
      }
