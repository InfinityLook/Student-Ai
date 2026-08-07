'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  RefreshCw, 
  BookOpen, 
  ArrowLeft,
  Copy,
  Check
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
  const [solvingProgress, setSolvingProgress] = useState('Inicializace AI modelu...');
  const [solution, setSolution] = useState<SolutionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const subjects = [
    { id: 'matematika', label: 'Matematika', icon: '📐' },
    { id: 'fyzika', label: 'Fyzika', icon: '⚡' },
    { id: 'chemie', label: 'Chemie', icon: '🧪' },
    { id: 'programovani', label: 'Programování', icon: '💻' },
    { id: 'obecne', label: 'Logika & Věda', icon: '🧠' }
  ];

  const handleSolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) return;

    setIsSolving(true);
    setSolution(null);
    setSolvingProgress('Inicializace AI modelu...');
    
    setTimeout(() => {
      setSolvingProgress('Analýza zadání a rozpoznávání vzorců...');
    }, 900);

    setTimeout(() => {
      setSolvingProgress('Generování detailního postupu krok za krokem...');
    }, 2000);

    setTimeout(() => {
      setSolution({
        title: 'Řešení kvadratické rovnice',
        subject: selectedSubject.toUpperCase(),
        finalAnswer: 'x₁ = 2,  x₂ = -3',
        explanationSummary: 'Příklad jsme úspěšně rozebrali, převedli do základního tvaru a vyřešili pomocí diskriminantu.',
        steps: [
          {
            stepNumber: 1,
            title: 'Úprava do standardního tvaru',
            explanation: 'Převedeme všechny členy na levou stranu, aby rovnice splňovala tvar ax² + bx + c = 0.',
            formula: 'x² + x - 6 = 0  (kde a = 1, b = 1, c = -6)'
          },
          {
            stepNumber: 2,
            title: 'Výpočet diskriminantu',
            explanation: 'Aplikujeme vzorec D = b² - 4ac. Protože je D větší než nula, rovnice má dva reálné kořeny.',
            formula: 'D = 1² - 4 · 1 · (-6) = 1 + 24 = 25'
          },
          {
            stepNumber: 3,
            title: 'Výpočet výsledných kořenů',
            explanation: 'Dosadíme hodnoty do vzorce pro kořeny kvadratické rovnice x = (-b ± √D) / 2a.',
            formula: 'x₁ = (-1 + 5) / 2 = 2  |  x₂ = (-1 - 5) / 2 = -3'
          }
        ]
      });
      setIsSolving(false);
    }, 3200);
  };

  const handleReset = () => {
    setSolution(null);
    setProblemText('');
  };

  const handleCopy = () => {
    if (!solution) return;
    const textToCopy = `${solution.title}\nVýsledek: ${solution.finalAnswer}\n\nPostup:\n` + 
      solution.steps.map(s => `${s.stepNumber}. ${s.title}\n${s.explanation}\n${s.formula || ''}`).join('\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {onBack && (
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition flex items-center gap-2 cursor-pointer w-fit text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Workspace
        </button>
      )}

      {!solution && !isSolving ? (
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">AI Řešitel Úloh</h1>
              <p className="text-xs text-cyan-400">Zadej příklad a získej okamžitý postup s vysvětlením ⚡</p>
            </div>
          </div>

          <form onSubmit={handleSolve} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Vyber předmět</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {subjects.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      selectedSubject === sub.id 
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 border-transparent text-white shadow-lg shadow-cyan-500/25 scale-[1.02]' 
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Zadání příkladu</label>
                <button
                  type="button"
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer transition"
                >
                  <Upload className="w-3.5 h-3.5" /> Nahrát fotku
                </button>
              </div>
              <textarea
                rows={5}
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Napiš zadání příkladu (např. Vyřeš rovnici x^2 + x - 6 = 0)..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition font-mono resize-none shadow-inner"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!problemText.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 disabled:opacity-40 text-black font-extrabold px-8 py-4 rounded-2xl text-xs transition shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Spočítat a vysvětlit krok za krokem</span>
              </button>
            </div>
          </form>
        </div>
      ) : isSolving ? (
        <div className="rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-12 backdrop-blur-xl text-center space-y-6 shadow-2xl max-w-lg mx-auto my-12">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white">AI analyzuje zadání...</h3>
            <p className="text-xs text-cyan-300 font-semibold animate-pulse">{solvingProgress}</p>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      ) : (
        solution && (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-500/10 via-white/[0.05] to-white/[0.02] border border-emerald-500/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {solution.subject}
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white pt-1">{solution.title}</h2>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopy}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Skopírováno' : 'Kopírovat'}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Nová úloha</span>
                  </button>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 flex items-center justify-between shadow-inner">
                <div>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Konečný výsledek</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">{solution.finalAnswer}</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {solution.explanationSummary}
              </p>
            </div>

            <div className="rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Postup řešení krok za krokem</span>
              </h3>

              <div className="space-y-4">
                {solution.steps.map((step) => (
                  <div key={step.stepNumber} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:bg-white/[0.07] transition">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center text-xs font-bold shadow-sm">
                        {step.stepNumber}
                      </span>
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pl-10">
                      {step.explanation}
                    </p>

                    {step.formula && (
                      <div className="pl-10 pt-1">
                        <div className="bg-black/40 border border-white/10 px-4 py-2.5 rounded-xl font-mono text-xs text-cyan-300 inline-block shadow-inner">
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
