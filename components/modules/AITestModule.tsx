"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export default function AITestModule() {
  const { addNotification, credits, deductCredits } = useStore();
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  const [test, setTest] = useState<Question[] | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleGenerateTest = () => {
    if (!topic.trim()) {
      addNotification("Zadej téma pro vygenerování testu!", "error");
      return;
    }

    if (credits < 10) {
      addNotification("Nemáš dostatek kreditů (vyžadováno 10 🪙). Navštiv Obchod!", "error");
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      deductCredits(10);
      setTest([
        {
          id: 1,
          question: `Co je hlavním principem v tématice: ${topic}?`,
          options: ["Efektivní modularita", "Náhodná exekuce", "Statická struktura", "Žádná z možností"],
          correct: 0,
        },
        {
          id: 2,
          question: "Která technologie se nejčastěji používá pro tento účel?",
          options: ["JQuery", "Next.js & React", "MS-DOS", "Turbo Pascal"],
          correct: 1,
        },
      ]);
      setAnswers({});
      setSubmitted(false);
      setGenerating(false);
      addNotification("Test úspěšně vygenerován! (-10 🪙)", "success");
    }, 1500);
  };

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [qId]: optIndex });
  };

  const handleSubmitTest = () => {
    if (!test) return;
    let correctCount = 0;
    test.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
    addNotification(`Test vyhodnocen! Získal jsi ${correctCount} z ${test.length} bodů.`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">📝 AI Test Generator</h2>
          <p className="text-muted text-sm mt-1">Vygeneruj si cvičné kvízy na míru z libovolného tématu.</p>
        </div>
      </div>

      {!test && (
        <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Zadej téma nebo vlož text (stojí 10 🪙):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="např. Kvantová fyzika, Základy SQL, Dějepis..."
              className="w-full p-3 rounded-xl border border-edge bg-canvas text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet text-sm"
            />
          </div>
          <button
            onClick={handleGenerateTest}
            disabled={generating}
            className="w-full py-3 bg-violet hover:brightness-110 text-ink font-medium rounded-xl text-sm transition-all shadow-lg shadow-violet/20 disabled:opacity-50"
          >
            {generating ? "Generuji AI test..." : "Vygenerovat test (10 🪙)"}
          </button>
        </div>
      )}

      {test && (
        <div className="space-y-6">
          {test.map((q, index) => (
            <div key={q.id} className="bg-surface p-6 rounded-2xl border border-edge shadow-sm space-y-3">
              <div className="text-xs font-mono font-semibold text-violet">Otázka {index + 1}</div>
              <div className="font-bold text-ink text-base">{q.question}</div>
              <div className="space-y-2 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[q.id] === optIdx;
                  let optionStyle = "border-edge hover:border-violet text-ink";

                  if (submitted) {
                    if (optIdx === q.correct) optionStyle = "bg-mint/10 border-mint text-mint";
                    else if (isSelected) optionStyle = "bg-coral/10 border-coral text-coral";
                  } else if (isSelected) {
                    optionStyle = "bg-violet/10 border-violet text-violet";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${optionStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmitTest}
              className="w-full py-3.5 bg-mint hover:brightness-110 text-canvas font-semibold rounded-xl text-sm transition-all shadow-lg shadow-mint/20"
            >
              Vyhodnotit test
            </button>
          ) : (
            <div className="bg-surface p-6 rounded-2xl border border-edge text-center space-y-4">
              <div className="text-xl font-display font-bold text-ink">
                Výsledek: {score} / {test.length} správně
              </div>
              <button
                onClick={() => setTest(null)}
                className="px-6 py-2.5 bg-violet hover:brightness-110 text-ink font-medium rounded-xl text-sm transition-all"
              >
                Vytvořit nový test
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
              }
