"use client";

import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/useStore";
import { FOCUS_SESSION_REWARD } from "@/lib/gamification";

const SHORT_BREAK_SECONDS = 5 * 60;
const LONG_BREAK_SECONDS = 15 * 60;
const SESSIONS_PER_CYCLE = 4;
const FOCUS_PRESETS = [15, 25, 45];
const MIN_CUSTOM_MINUTES = 5;
const MAX_CUSTOM_MINUTES = 120;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function FocusTimerModule() {
  const { addNotification, completeFocusSession, focusSessionsCompleted } = useStore();

  const [focusMinutes, setFocusMinutes] = useState(25);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breakDuration = isLongBreak ? LONG_BREAK_SECONDS : SHORT_BREAK_SECONDS;
  const durationSeconds = mode === "focus" ? focusMinutes * 60 : breakDuration;
  const cyclePosition = focusSessionsCompleted % SESSIONS_PER_CYCLE;

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
      const sessionNumber = focusSessionsCompleted + 1;
      const nextIsLongBreak = sessionNumber % SESSIONS_PER_CYCLE === 0;

      completeFocusSession();
      addNotification(`Skvělá práce! Session dokončena (+${FOCUS_SESSION_REWARD} 🪙)`, "success");

      setIsLongBreak(nextIsLongBreak);
      setMode("break");
      setSecondsLeft(nextIsLongBreak ? LONG_BREAK_SECONDS : SHORT_BREAK_SECONDS);
    } else {
      addNotification("Přestávka skončila, čas vrátit se ke studiu! 📚", "info");
      setMode("focus");
      setSecondsLeft(focusMinutes * 60);
      setIsRunning(false);
    }
  }, [secondsLeft, isRunning, mode, focusMinutes, focusSessionsCompleted, completeFocusSession, addNotification]);

  const handleToggle = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(mode === "focus" ? focusMinutes * 60 : breakDuration);
  };

  const handleSkipBreak = () => {
    setIsRunning(false);
    setMode("focus");
    setSecondsLeft(focusMinutes * 60);
  };

  const handlePresetChange = (minutes: number) => {
    if (isRunning) return;
    setShowCustom(false);
    setFocusMinutes(minutes);
    if (mode === "focus") setSecondsLeft(minutes * 60);
  };

  const handleCustomApply = () => {
    const value = Math.round(Number(customValue));
    if (!value || Number.isNaN(value)) return;
    const clamped = Math.min(MAX_CUSTOM_MINUTES, Math.max(MIN_CUSTOM_MINUTES, value));
    setFocusMinutes(clamped);
    if (mode === "focus") setSecondsLeft(clamped * 60);
    setCustomValue(String(clamped));
  };

  const progress = secondsLeft / durationSeconds;
  const size = 240;
  const stroke = 10;
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const ringColor = mode === "focus" ? "#22D3EE" : isLongBreak ? "#A78BFA" : "#34D399";
  const isPreset = FOCUS_PRESETS.includes(focusMinutes) && !showCustom;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>⏱️</span> Study Timer
          </h2>
          <p className="text-gray-400 text-sm mt-1">Soustřeď se v blocích a sbírej odměny.</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Session</div>
          <div className="text-xl font-bold text-amber-400">{focusSessionsCompleted}</div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-xl flex flex-col items-center gap-6">
        <div
          className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
            mode === "focus"
              ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
              : isLongBreak
              ? "bg-purple-500/20 border-purple-500/30 text-purple-400"
              : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
          }`}
        >
          {mode === "focus" ? "Fokus" : isLongBreak ? "Dlouhá přestávka" : "Přestávka"}
        </div>

        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90 absolute inset-0">
            <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
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
          <span className="font-bold text-4xl text-white tabular-nums">{formatTime(secondsLeft)}</span>
        </div>

        {/* Ukazatel pomodoro cyklu */}
        <div className="flex items-center gap-2">
          {Array.from({ length: SESSIONS_PER_CYCLE }).map((_, i) => {
            const filled = mode === "focus" ? i < cyclePosition : i < cyclePosition + 1;
            return (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  filled ? "bg-cyan-400" : "bg-white/10"
                }`}
              />
            );
          })}
          <span className="text-[11px] text-gray-500 ml-1">do dlouhé přestávky</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white font-semibold rounded-2xl text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            {isRunning ? "Pauza" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl text-sm transition-colors border border-white/10 active:scale-95"
          >
            Reset
          </button>
          {mode === "break" && (
            <button
              onClick={handleSkipBreak}
              className="px-5 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-medium rounded-2xl text-sm transition-colors border border-white/10 active:scale-95"
            >
              Přeskočit
            </button>
          )}
        </div>

        {mode === "focus" && (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {FOCUS_PRESETS.map((m) => (
                <button
                  key={m}
                  onClick={() => handlePresetChange(m)}
                  disabled={isRunning}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-40 ${
                    isPreset && focusMinutes === m
                      ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                >
                  {m} min
                </button>
              ))}
              <button
                onClick={() => {
                  if (isRunning) return;
                  setShowCustom((prev) => !prev);
                  setCustomValue(String(focusMinutes));
                }}
                disabled={isRunning}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-40 ${
                  showCustom || !isPreset
                    ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                }`}
              >
                Vlastní{!isPreset ? ` (${focusMinutes} min)` : ""}
              </button>
            </div>

            {showCustom && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={MIN_CUSTOM_MINUTES}
                  max={MAX_CUSTOM_MINUTES}
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="minuty"
                  className="w-24 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm text-center focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  onClick={handleCustomApply}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 font-medium text-xs transition active:scale-95"
                >
                  Nastavit
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center max-w-sm">
          Dokonči celou fokus session bez přerušení a získáš {FOCUS_SESSION_REWARD} 🪙. Po každé 4. session tě čeká
          dlouhá přestávka.
        </p>
      </div>
    </div>
  );
          }
