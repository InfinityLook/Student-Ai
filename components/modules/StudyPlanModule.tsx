'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, Calendar, CheckCircle, Plus, Trash2 } from 'lucide-react';

interface StudyPlanProps {
  onBack?: () => void;
}

interface PlanItem {
  id: string;
  subject: string;
  topic: string;
  date: string;
  completed: boolean;
}

export default function StudyPlanModule({ onBack }: StudyPlanProps) {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('student_ai_study_plans');
    if (saved) {
      try {
        setPlans(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveToStorage = (updated: PlanItem[]) => {
    setPlans(updated);
    localStorage.setItem('student_ai_study_plans', JSON.stringify(updated));
  };

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !topic) return;

    const newItem: PlanItem = {
      id: Date.now().toString(),
      subject,
      topic,
      date: date || new Date().toISOString().split('T')[0],
      completed: false,
    };

    saveToStorage([newItem, ...plans]);
    setSubject('');
    setTopic('');
    setDate('');
  };

  const toggleComplete = (id: string) => {
    const updated = plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p);
    saveToStorage(updated);
  };

  const handleDelete = (id: string) => {
    const updated = plans.filter(p => p.id !== id);
    saveToStorage(updated);
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

      <div className="rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Sparkles className="w-6 h-6 text-pink-400" />
          <div>
            <h2 className="text-xl font-black text-white">AI Studijní Plánovač</h2>
            <p className="text-xs text-slate-400">Rozvrhni si přípravu na zkoušky a testy</p>
          </div>
        </div>

        <form onSubmit={handleAddPlan} className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Předmět / Okruh</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="např. Matematika"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Co se naučit</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="např. Integrály a derivace"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-pink-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-pink-500 cursor-pointer text-slate-300"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-extrabold rounded-xl text-xs transition shadow-lg shadow-pink-500/25 cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Přidat cíl
            </button>
          </div>
        </form>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white">Tvé studijní cíle</h3>
          {plans.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              Zatím nemáš naplánované žádné úkoly. Přidej první cíl výše! 🚀
            </div>
          ) : (
            plans.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  item.completed 
                    ? 'bg-white/[0.02] border-white/5 opacity-60 line-through' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                      item.completed ? 'bg-pink-500 border-pink-500 text-white' : 'border-white/20 bg-black/40'
                    }`}
                  >
                    {item.completed && <CheckCircle className="w-3.5 h-3.5" />}
                  </button>
                  <div>
                    <span className="text-xs font-bold text-white block">{item.subject}</span>
                    <span className="text-[11px] text-slate-300">{item.topic}</span>
                    <span className="text-[10px] text-pink-400 block mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-500 hover:text-red-400 transition p-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
          }
                                            
