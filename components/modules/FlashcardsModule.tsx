"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import { scheduleNextReview, todayISO, ReviewQuality } from "@/lib/spacedRepetition";
import { FLASHCARD_REVIEW_REWARD } from "@/lib/gamification";

const RATING_BUTTONS: { quality: ReviewQuality; label: string; classes: string }[] = [
  { quality: "again", label: "Neznal jsem", classes: "bg-coral/10 border-coral text-coral hover:bg-coral/20" },
  { quality: "hard", label: "Těžké", classes: "bg-gold/10 border-gold text-gold hover:bg-gold/20" },
  { quality: "good", label: "Dobré", classes: "bg-violet/10 border-violet text-violet hover:bg-violet/20" },
  { quality: "easy", label: "Snadné", classes: "bg-mint/10 border-mint text-mint hover:bg-mint/20" },
];

export default function FlashcardsModule() {
  const { addNotification, flashcards, addFlashcard, reviewFlashcard } = useStore();

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const today = todayISO();
  const dueCards = flashcards.filter((c) => c.dueDate <= today);
  const currentCard = dueCards[0] ?? null;

  const upcomingDueDate = flashcards
    .map((c) => c.dueDate)
    .filter((d) => d > today)
    .sort()[0];

  const handleAddCard = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      addNotification("Vyplň otázku i odpověď!", "error");
      return;
    }
    addFlashcard(newQuestion.trim(), newAnswer.trim());
    setNewQuestion("");
    setNewAnswer("");
    setIsAdding(false);
    addNotification("Nová kartička byla úspěšně přidána!", "success");
  };

  const handleRate = (quality: ReviewQuality) => {
    if (!currentCard) return;
    reviewFlashcard(currentCard.id, quality);
    setIsFlipped(false);
    addNotification(`Zaznamenáno (+${FLASHCARD_REVIEW_REWARD} 🪙)`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">📇 Kartičky & Flashcards</h2>
          <p className="text-muted text-sm mt-1">
            Chytré opakování (SM-2) — appka ti kartičku připomene přesně ve chvíli, kdy ji začínáš zapomínat.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs text-muted">K opakování dnes</div>
            <div className="text-xl font-mono font-bold text-gold">{dueCards.length}</div>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 bg-violet hover:brightness-110 text-ink rounded-xl text-sm font-medium transition-all shadow-lg shadow-violet/20"
          >
            {isAdding ? "Zavřít" : "+ Přidat"}
          </button>
        </div>
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

      {flashcards.length === 0 ? (
        <div className="bg-surface p-12 rounded-2xl border border-edge text-center text-muted text-sm">
          Zatím nemáš žádné kartičky. Přidej první výše.
        </div>
      ) : !currentCard ? (
        <div className="bg-mint/10 border border-mint/30 p-12 rounded-2xl text-center space-y-2">
          <div className="text-3xl">🎉</div>
          <div className="text-lg font-display font-bold text-ink">Vše probráno!</div>
          <p className="text-sm text-muted">
            {upcomingDueDate
              ? `Další kartička je naplánovaná na ${upcomingDueDate}.`
              : "Přidej další kartičky a appka je zařadí do plánu opakování."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="bg-surface h-64 rounded-2xl border border-edge shadow-sm flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-violet transition-all select-none relative"
          >
            <span className="absolute top-4 left-4 text-xs font-mono font-semibold px-2.5 py-1 bg-canvas text-muted rounded-lg border border-edge">
              {dueCards.length} k opakování
            </span>
            <span className="absolute top-4 right-4 text-xs text-muted">Kliknutím otočíš 🔄</span>

            <div className="text-muted text-xs uppercase tracking-wider mb-2">
              {isFlipped ? "Odpověď" : "Otázka"}
            </div>
            <div className="text-xl md:text-2xl font-display font-bold text-ink">
              {isFlipped ? currentCard.answer : currentCard.question}
            </div>
          </div>

          {!isFlipped ? (
            <button
              onClick={() => setIsFlipped(true)}
              className="w-full py-3.5 bg-violet hover:brightness-110 text-ink font-semibold rounded-xl text-sm transition-all shadow-lg shadow-violet/20"
            >
              Zobrazit odpověď
            </button>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RATING_BUTTONS.map(({ quality, label, classes }) => {
                const preview = scheduleNextReview(currentCard, quality).interval;
                return (
                  <button
                    key={quality}
                    onClick={() => handleRate(quality)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-sm font-semibold transition-colors ${classes}`}
                  >
                    <span>{label}</span>
                    <span className="text-[11px] font-mono opacity-75">
                      za {preview} {preview === 1 ? "den" : preview < 5 ? "dny" : "dní"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
