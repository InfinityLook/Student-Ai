"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AISolver() {
  const { addNotification, credits, deductCredits } = useStore();
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
      deductCredits(5);
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
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">🤖 AI Solver</h2>
          <p className="text-muted text-sm mt-1">Pokročilý asistent pro domácí úkoly a výpočty.</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted">Cena za dotaz</div>
          <div className="text-sm font-mono font-bold text-gold">5 🪙</div>
        </div>
      </div>

      <div className="flex-1 bg-surface rounded-2xl border border-edge p-4 md:p-6 overflow-y-auto space-y-4 shadow-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-violet text-ink rounded-br-none"
                  : "bg-surface-hover text-ink rounded-bl-none border border-edge"
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
            <div className="bg-surface-hover text-muted p-4 rounded-2xl text-sm rounded-bl-none animate-pulse border border-edge">
              AI přemýšlí nad řešením...
            </div>
          </div>
        )}
      </div>

      <div className="bg-surface p-3 rounded-2xl border border-edge shadow-sm flex items-center gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Napiš zadání příkladu nebo otázku..."
          className="flex-1 p-3 bg-transparent text-ink placeholder:text-muted focus:outline-none text-sm"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-6 py-3 bg-violet hover:brightness-110 text-ink font-medium rounded-xl text-sm transition-all shadow-lg shadow-violet/20 disabled:opacity-50"
        >
          Odeslat
        </button>
      </div>
    </div>
  );
}
