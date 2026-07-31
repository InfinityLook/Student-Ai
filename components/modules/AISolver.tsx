"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AISolver() {
  const { addNotification, credits, subCredits } = useStore();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ahoj! Jsem tvůj AI Solver. Zadej zadání příkladu, otázku z předmětu nebo kód, se kterým potřebuješ pomoci.",
    },
  ]);

  const handleSend = () => {
    if (!prompt.trim()) {
      addNotification("Zadej text dotazu!", "error");
      return;
    }

    if (credits < 5) {
      addNotification("Nemáš dostatek kreditů (vyžadováno 5 🪙). Navštiv Obchod!", "error");
      return;
    }

    const userMsg = prompt.trim();
    setPrompt("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    setTimeout(() => {
      subCredits(5);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Zde je analýza tvého zadání: "${userMsg}". \n\n1. Krok: Identifikace klíčových proměnných.\n2. Krok: Aplikace odpovídajícího vzorce nebo postupu.\n3. Výsledek: Úkol byl úspěšně vyřešen podle akademických standardů. (-5 🪙)`,
        },
      ]);
      setLoading(false);
      addNotification("AI úkol úspěšně zpracován! (-5 🪙)", "success");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col justify-between space-y-4">
      {/* Hlavička */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">🤖 AI Solver</h2>
          <p className="text-zinc-500 text-sm mt-1">Pokročilý asistent pro domácí úkoly a výpočty.</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-400">Cena za dotaz</div>
          <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">5 🪙</div>
        </div>
      </div>

      {/* Chat okno / Konverzace */}
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 overflow-y-auto space-y-4 shadow-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-700"
              }`}
            >
              <div className="font-semibold text-xs mb-1 opacity-75">
                {msg.role === "user" ? "Ty" : "AI Solver"}
              </div>
              <div className="whitespace-pre-line">{msg.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 p-4 rounded-2xl text-sm rounded-bl-none animate-pulse">
              AI přemýšlí nad řešením...
            </div>
          </div>
        )}
      </div>

      {/* Vstupní pole */}
      <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Napiš zadání příkladu nebo otázku..."
          className="flex-1 p-3 bg-transparent text-zinc-900 dark:text-white focus:outline-none text-sm"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
        >
          Odeslat
        </button>
      </div>
    </div>
  );
}
