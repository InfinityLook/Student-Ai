'use client';

import React, { useState } from 'react';
import { BrainCircuit, ArrowLeft, Save, Check, RefreshCw, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface TestResult {
  date: string;
  topic: string;
  score: number;
  totalQuestions: number;
}

export default function AITestModule({ onBack }: { onBack?: () => void }) {
  const [step, setStep] = useState<'setup' | 'testing' | 'result'>('setup');
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<number | null>(null);

  const startTest = () => {
    // Simulace generování otázek
    const mockQuestions: Question[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      question: `Otázka číslo ${i + 1} k tématu: ${topic}`,
      options: ['Možnost A', 'Možnost B', 'Možnost C', 'Možnost D'],
      correct: 0,
    }));
    setQuestions(mockQuestions);
    setAnswers({});
    setStep('testing');
  };

  const finishTest = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) score++;
    });
    const percentage = Math.round((score / count) * 100);
    setResult(percentage);
    setStep('result');
  };

  const saveResult = () => {
    const history = JSON.parse(localStorage.getItem('student_ai_tests') || '[]');
    const newTest: TestResult = {
      date: new Date().toLocaleDateString('cs-CZ'),
      topic,
      score: result || 0,
      totalQuestions: count,
    };
    localStorage.setItem('student_ai_tests', JSON.stringify([newTest, ...history]));
    alert('Výsledek testu uložen!');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {onBack && (
        <button onClick={onBack} className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-2 transition">
          <ArrowLeft className="w-4 h-4" /> Zpět
        </button>
      )}

      {step === 'setup' && (
        <div className="rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-8 shadow-2xl">
          <h1 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <BrainCircuit className="text-purple-400" /> AI Test
          </h1>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Zadej téma testu (např. Dějepis, Biologie...)"
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-500 mb-6"
          />
          <div className="space-y-3 mb-8">
            <label className="text-xs font-bold text-slate-400 uppercase">Počet otázek</label>
            <div className="grid grid-cols-3 gap-3">
              {[10, 20, 30].map((num) => (
                <button
                  key={num}
                  onClick={() => setCount(num)}
                  className={`p-4 rounded-2xl border ${count === num ? 'bg-purple-500/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                >
                  {num} otázek
                </button>
              ))}
            </div>
          </div>
          <button onClick={startTest} className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl font-bold text-white cursor-pointer">
            Generovat test
          </button>
        </div>
      )}

      {step === 'testing' && (
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <p className="font-bold mb-4">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAnswers({ ...answers, [q.id]: idx })}
                    className={`w-full text-left p-3 rounded-xl border ${answers[q.id] === idx ? 'bg-purple-500/30 border-purple-500' : 'bg-black/20 border-white/5'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={finishTest} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-bold text-white cursor-pointer">
            Odevzdat test
          </button>
        </div>
      )}

      {step === 'result' && (
        <div className="text-center rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-12 shadow-2xl">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white mb-2">{result}%</h2>
          <p className="text-slate-400 mb-8">Tvůj výsledek z testu: {topic}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={saveResult} className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl font-bold cursor-pointer hover:bg-white/20">
              <Save className="w-4 h-4" /> Uložit
            </button>
            <button onClick={() => setStep('setup')} className="px-6 py-3 bg-white/5 rounded-xl font-bold cursor-pointer">
              Zpět na menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
      }
                      
