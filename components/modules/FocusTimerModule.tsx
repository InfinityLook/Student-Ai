'use client';

import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, ArrowLeft, Sparkles } from 'lucide-react';

interface FocusTimerModuleProps {
  onBack?: () => void;
}

export default function FocusTimerModule({ onBack }: FocusTimerModuleProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'work') setTimeLeft(25 * 60);
    if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    if (newMode === 'longBreak') setTimeLeft(15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      {onBack && (
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition flex items-center gap-2 cursor-pointer w-fit text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Workspace
        </button>
      )}

      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-8 backdrop-blur-xl shadow-2xl text-center space-y-8">
        <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Timer className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-black text-white">Focus Timer</h1>
            <p className="text-xs text-pink-400">Pomodoro režim pro maximální produktivitu ⚡</p>
          </div>
        </div>

        {/* Přepínač módů */}
        <div className="flex justify-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 max-w-md mx-auto">
          <button
            onClick={() => switchMode('work')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              mode === 'work' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Práce (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              mode === 'shortBreak' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Krátká pauza (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              mode === 'longBreak' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dlouhá pauza (15m)
          </button>
        </div>

        {/* Časomíra */}
        <div className="py-8">
          <div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 font-mono tracking-wider drop-shadow-lg">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Ovládací tlačítka */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-black text-sm transition shadow-xl shadow-pink-500/30 flex items-center gap-2 cursor-pointer scale-105"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{isRunning ? 'Pozastavit' : 'Spustit Focus'}</span>
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              if (mode === 'work') setTimeLeft(25 * 60);
              if (mode === 'shortBreak') setTimeLeft(5 * 60);
              if (mode === 'longBreak') setTimeLeft(15 * 60);
            }}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition cursor-pointer"
            title="Resetovat"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
