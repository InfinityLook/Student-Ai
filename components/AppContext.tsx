'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  userCredits: number;
  addCredits: (amount: number) => void;
  streak: number;
  xp: number;
  level: number;
  addXp: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userCredits, setUserCredits] = useState<number>(250);
  const [streak, setStreak] = useState<number>(3);
  const [xp, setXp] = useState<number>(85);
  const [level, setLevel] = useState<number>(4);

  // Načtení uložených dat z localStorage při startu aplikace
  useEffect(() => {
    const savedCredits = localStorage.getItem('student_ai_credits');
    const savedStreak = localStorage.getItem('student_ai_streak');
    const savedXp = localStorage.getItem('student_ai_xp');
    const savedLevel = localStorage.getItem('student_ai_level');

    if (savedCredits !== null) setUserCredits(Number(savedCredits));
    if (savedStreak !== null) setStreak(Number(savedStreak));
    if (savedXp !== null) setXp(Number(savedXp));
    if (savedLevel !== null) setLevel(Number(savedLevel));
  }, []);

  // Automatické ukládání při jakékoliv změně stavu
  useEffect(() => {
    localStorage.setItem('student_ai_credits', userCredits.toString());
    localStorage.setItem('student_ai_streak', streak.toString());
    localStorage.setItem('student_ai_xp', xp.toString());
    localStorage.setItem('student_ai_level', level.toString());
  }, [userCredits, streak, xp, level]);

  const addCredits = (amount: number) => {
    setUserCredits(prev => Math.max(0, prev + amount));
  };

  const addXp = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (newXp >= 100) {
        setLevel(l => l + 1);
        return newXp - 100;
      }
      return newXp;
    });
  };

  return (
    <AppContext.Provider value={{ userCredits, addCredits, streak, xp, level, addXp }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp musí být použit uvnitř AppProvideru');
  }
  return context;
}
