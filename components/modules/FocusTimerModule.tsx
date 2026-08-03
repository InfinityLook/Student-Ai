"use client";

import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import { FOCUS_SESSION_REWARD } from "@/lib/gamification";

const BREAK_SECONDS = 5 * 60;
const FOCUS_PRESETS = [15, 25, 45];

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function FocusTimerModule() {
  const { addNotification, completeFocusSession, focusSessionsCompleted } = useStore();

  const [focusMinutes, setFocusMinutes] = useState(25);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const durationSeconds = mode === "focus" ? focusMinutes * 60 : BREAK_SECONDS;

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft !== 0 || !isRunning) return;

    if (mode === "focus") {
      completeFocusSession();
      addNotification(`Skvělá práce! Session dokončena (+${FOCUS_SESSION_REWARD} 🪙)`, "success");
      setMode("break");
      setSecondsLeft(BREAK_SECONDS);
    } else {
      addNotification("Přestávka skončila, čas vrátit se ke studiu! 📚", "info");
      setMode("focus");
      setSecondsLeft(focusMinutes * 60);
      setIsRunning(false);
    }
  }, [secondsLeft, isRunning, mode, focusMinutes, completeFocusSession, addNotification]);

  const handleToggle = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(mode === "focus" ? focusMinutes * 60 : BREAK_SECONDS);
  };

  const handlePresetChange = (minutes: number) => {
    if (isRunning) return;
    setFocusMinutes(minutes);
    if (mode === "focus") setSecondsLeft(minutes * 60);
  };

  const progress = secondsLeft / durationSeconds;
  const size = 240;
  const stroke = 10;
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const ringColor = mode === "focus" ? "#7C6CFF" : "#3ECF8E";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">⏱️ Study Timer</h2>
          <p className="text-muted text-sm mt-1">Soustřeď se v blocích a sbírej odměny.</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted">Dokončené session</div>
          <div className="text-xl font-mono font-bold text-gold">{focusSessionsCompleted}</div>
        </div>
      </div>

      <div className="bg-surface p-8 rounded-2xl border border-edge shadow-sm flex flex-col items-center gap-6">
        <div
          className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
            mode === "focus" ? "bg-violet/10 text-violet" : "bg-mint/10 text-mint"
          }`}
        >
          {mode === "focus" ? "Fokus" : "Přestávka"}
        </div>

        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90 absolute inset-0">
            <circle cx={size / 2} cy={size / 2} r={radius} stroke="#332C54" strokeWidth={stroke} fill="none" />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={ringColor}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <span className="font-mono font-bold text-4xl text-ink">{formatTime(secondsLeft)}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className="px-8 py-3 bg-violet hover:brightness-110 text-ink font-semibold rounded-xl text-sm transition-all shadow-lg shadow-violet/20"
          >
            {isRunning ? "Pauza" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-3 bg-surface-hover hover:bg-edge text-ink font-medium rounded-xl text-sm transition-colors border border-edge"
          >
            Reset
          </button>
        </div>

        {mode === "focus" && (
          <div className="flex items-center gap-2">
            {FOCUS_PRESETS.map((m) => (
              <button
                key={m}
                onClick={() => handlePresetChange(m)}
                disabled={isRunning}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors disabled:opacity-40 ${
                  focusMinutes === m
                    ? "bg-violet text-ink"
                    : "bg-surface-hover text-muted hover:text-ink border border-edge"
                }`}
              >
                {m} min
              </button>
            ))}
          </div>
        )}

        <p className="text-xs text-muted text-center max-w-sm">
          Dokonči celou fokus session bez přerušení a získáš {FOCUS_SESSION_REWARD} 🪙. Přestávka se spustí automaticky.
        </p>
      </div>
    </div>
  );
}
