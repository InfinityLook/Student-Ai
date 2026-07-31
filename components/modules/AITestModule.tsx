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
  const { addNotification, credits, subCredits } = useStore();
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
    
    // Simulace AI generování testu a odečtení kreditů
    setTimeout(() => {
      subCredits(10);
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
      {/* Hlavička */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">📝 AI Test Generator</h2>
          <p className="text-zinc-500 text-sm mt-1">Vygeneruj si cvičné kvízy na míru z libovolného tématu.</p>
        </div>
      </div>

      {/* Vstup pro zadání tématu */}
      {!test && (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
              Zadej téma nebo vlož text (stojí 10 🪙):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="např. Kvantová fyzika, Základy SQL, Dějepis..."
              className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <button
            onClick={handleGenerateTest}
            disabled={generating}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            {generating ? "Generuji AI test..." : "Vygenerovat test (10 🪙)"}
          </button>
        </div>
      )}

      {/* Probíhající test */}
      {test && (
        <div className="space-y-6">
          {test.map((q, index) => (
            <div key={q.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Otázka {index + 1}</div>
              <div className="font-bold text-zinc-900 dark:text-white text-base">{q.question}</div>
              <div className="space-y-2 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[q.id] === optIdx;
                  let optionStyle = "border-zinc-200 dark:border-zinc-800 hover:border-indigo-500";
                  
                  if (submitted) {
                    if (optIdx === q.correct) optionStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200";
                    else if (isSelected) optionStyle = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200";
                  } else if (isSelected) {
                    optionStyle = "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200";
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
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-emerald-500/20"
            >
              Vyhodnotit test
            </button>
          ) : (
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
              <div className="text-xl font-bold text-zinc-900 dark:text-white">
                Výsledek: {score} / {test.length} správně
              </div>
              <button
                onClick={() => setTest(null)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors"
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
