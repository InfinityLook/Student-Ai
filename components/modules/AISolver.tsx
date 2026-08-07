'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  RefreshCw, 
  BookOpen, 
  ArrowRight,
  HelpCircle,
  FileCode2,
  Lightbulb
} from 'lucide-react';

export interface SolutionStep {
  stepNumber: number;
  title: string;
  explanation: string;
  formula?: string;
}

export interface SolutionResult {
  title: string;
  subject: string;
  finalAnswer: string;
  steps: SolutionStep[];
  explanationSummary: string;
}

interface AiSolverModuleProps {
  onBack?: () => void;
}

export default function AiSolverModule({ onBack }: AiSolverModuleProps) {
  const [problemText, setProblemText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('matematika');
  const [isSolving, setIsSolving] = useState(false);
  const [solvingProgress, setSolvingProgress] = useState('Připravuje se AI model...');
  const [solution, setSolution] = useState<SolutionResult | null>(null);

  const handleSolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) return;

    setIsSolving(true);
    setSolution(null);

    // Simulace kroků přípravy řešení
    setSolvingProgress('Připravuje se AI model...');
    
    setTimeout(() => {
      setSolvingProgress('Analýza zadání a rozpoznávání vzorců...');
    }, 1000);

    setTimeout(() => {
      setSolvingProgress('Generování postupu krok za krokem...');
    }, 2200);

    setTimeout(() => {
      // Vygenerované ukázkové řešení
      setSolution({
        title: 'Řešení kvadratické rovnice',
        subject: selectedSubject.toUpperCase(),
        finalAnswer: 'x₁ = 2,  x₂ = -3',
        explanationSummary: 'Rovnici jsme vyřešili pomocí diskriminantu D = b² - 4ac a následného dosazení do vzorce pro kořeny.',
        steps: [
          {
            stepNumber: 1,
            title: 'Úprava rovnice do základního tvaru',
            explanation: 'Převedeme všechny členy na levou stranu, aby rovnice byla ve tvaru ax² + bx + c = 0.',
            formula: 'x² + x - 6 = 0  ⇒  a = 1, b = 1, c = -6'
          },
          {
            stepNumber: 2,
            title: 'Výpočet diskriminantu (D)',
            explanation: 'Použijeme vzorec D = b² - 4ac. Jelikož D > 0, rovnice má 2 reálné kořeny.',
            formula: 'D = 1² - 4 · 1 · (-6) = 1 + 24 = 25'
          },
          {
            stepNumber: 3,
            title: 'Výpočet kořenů x₁ a x₂',
            explanation: 'Dosadíme do vzorce x = (-b ± √D) / 2a.',
            formula: 'x₁ = (-1 + 5) / 2 = 2  |  x₂ = (-1 - 5) / 2 = -3'
          }
        ]
      });
      setIsSolving(false);
    }, 3500);
  };

  const handleReset = () => {
    setSolution(null);
    setProblemText('');
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 text-slate-100">
      
      {/* HLAVIČKA */}
      <div className="border-b border-slate-800 pb-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Calculator className="w-7 h-7 text-indigo-400" />
            <span>AI Řešitel úloh</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Vložte matematický příklad, fyzikální úlohu nebo textový dotaz. AI připraví postup krok za krokem.
          </p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold transition flex items-center gap-2 cursor-pointer text-slate-300"
          >
            Zpět
          </button>
        )}
      </div>

      {!solution && !isSolving ? (
        /* VSTUPNÍ FORMULÁŘ */
        <form onSubmit={handleSolve} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-2">Předmět / Okruh</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-medium cursor-pointer"
              >
                <option value="matematika">Matematika (Algebra, Geometrie, Integrály)</option>
                <option value="fyzika">Fyzika (Mechanika, Elektřina, Termodynamika)</option>
                <option value="chemie">Chemie (Rovnice, Stechiometrie)</option>
                <option value="obecne">Obecný logický / vědecký dotaz</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="button"
                className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 py-3 rounded-2xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Nahrát fotku příkladu</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Zadání úlohy</label>
            <textarea
              rows={5}
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Vložte zadání (např. Vyřeš kvadratickou rovnici x^2 + x - 6 = 0 nebo Spočítej rychlost automobilu...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none font-mono"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!problemText.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-3.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/25 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Spočítat a vysvětlit</span>
            </button>
          </div>
        </form>
      ) : isSolving ? (
        
        /* STAV: PŘIPRAVUJE SE ŘEŠENÍ */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-6 shadow-2xl max-w-xl mx-auto my-8">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Připravuje se řešení...</h3>
            <p className="text-xs text-indigo-300 font-medium animate-pulse">{solvingProgress}</p>
          </div>

          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-indigo-600 h-full rounded-full animate-pulse w-3/4" />
          </div>
        </div>

      ) : (

        /* ZOBRAZENÍ VÝSLEDKU A POSTUPU */
        solution && (
          <div className="space-y-6">
            
            {/* Karta s výsledkem */}
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 md:p-8 space-y-4 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {solution.subject}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2">{solution.title}</h2>
                </div>
                <button
                  onClick={handleReset}
                  className="text-slate-400 hover:text-white p-2 bg-slate-950 rounded-xl border border-slate-800 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Nová úloha</span>
                </button>
              </div>

              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Výsledek</div>
                  <div className="text-xl font-extrabold text-white font-mono mt-0.5">{solution.finalAnswer}</div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {solution.explanationSummary}
              </p>
            </div>

            {/* Postup krok za krokem */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Postup řešení krok za krokem</span>
              </h3>

              <div className="space-y-4">
                {solution.steps.map((step) => (
                  <div key={step.stepNumber} className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-bold">
                        {step.stepNumber}
                      </span>
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed pl-9">
                      {step.explanation}
                    </p>

                    {step.formula && (
                      <div className="pl-9 pt-1">
                        <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl font-mono text-xs text-indigo-300 inline-block">
                          {step.formula}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )
      )}

    </div>
  );
}
