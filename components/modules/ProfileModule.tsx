"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";

const QUICK_ACTIONS = [
  { id: "flashcards", emoji: "🃏", label: "Flashcards" },
  { id: "test", emoji: "📝", label: "AI Test" },
  { id: "timer", emoji: "⏱️", label: "Focus Timer" },
  { id: "files", emoji: "📁", label: "Soubory" },
  { id: "shop", emoji: "🛒", label: "Obchod" },
  { id: "knihovna", emoji: "📚", label: "Knihovna" },
];

export default function ProfileModule() {
  const { credits, totalCreditsEarned, setActiveModule } = useStore();
  const { level, progress } = getLevelInfo(totalCreditsEarned);
  const [showStats, setShowStats] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 10) setGreeting("Dobré ráno");
    else if (h < 18) setGreeting("Dobré odpoledne");
    else setGreeting("Dobrý večer");
  }, []);

  const progressPct = Math.min(100, Math.round(progress * 100));

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <style>{`
        @keyframes kairoFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes kairoPulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.18); opacity: 0.3; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(18deg); }
          75% { transform: rotate(-12deg); }
        }
        .kairo-float { animation: kairoFloat 4s ease-in-out infinite; }
        .kairo-pulse { animation: kairoPulse 3s ease-in-out infinite; }
        .kairo-blink { animation: blink 5s infinite; transform-origin: center; }
        .kairo-wave { animation: wave 2.5s ease-in-out infinite; transform-origin: bottom center; }
        .title-shimmer {
          background: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4, #2563eb);
          
