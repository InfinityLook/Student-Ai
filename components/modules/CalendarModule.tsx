'use client';

import React, { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, AlertTriangle, ArrowLeft, Plus, X, BookOpen, Trash2 } from 'lucide-react';

interface CalendarModuleProps {
  onBack?: () => void;
}

export default function CalendarModule({ onBack }: CalendarModuleProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [exams, setExams] = useState<any[]>([]); // Začíná prázdné
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({ title: '', time: '', type: 'Zkouška' });

  const addExam = () => {
    if (!formData.title) return;
    const newExam = {
      id: Date.now(),
      ...formData,
      date: `${selectedDate}. června`
    };
    setExams([...exams, newExam]);
    setFormData({ title: '', time: '', type: 'Zkouška' });
    setShowForm(false);
  };

  const removeExam = (id: number) => {
    setExams(exams.filter(e => e.id !== id));
  };

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {onBack && (
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition flex items-center gap-2 cursor-pointer w-fit text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Workspace
        </button>
      )}

      {/* Overlay formuláře */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 p-6 rounded-[32px] w-full max-w-sm space-y-4 shadow-2xl">
            <h3 className="text-xl font-black text-white">Přidat termín ({selectedDate}. 6.)</h3>
            <input 
              placeholder="Název zkoušky" 
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-pink-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <input 
              placeholder="Čas (např. 09:00)" 
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-pink-500"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
            <div className="flex gap-2">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-white/5 rounded-xl font-bold text-xs cursor-pointer">Zrušit</button>
              <button onClick={addExam} className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-xs cursor-pointer">Přidat</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kalendář */}
        <div className="lg:col-span-2 rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-pink-400" /> Červen 2026
            </h3>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-3 text-center text-xs font-bold text-slate-400">
            <span>Po</span><span>Út</span><span>St</span><span>Čt</span><span>Pá</span><span>So</span><span>Ne</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const hasExam = exams.some(e => e.date === `${day}. června`);
              const isSelected = selectedDate === day;
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-bold cursor-pointer transition-all relative ${
                    isSelected ? 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span>{day}</span>
                  {hasExam && <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Zkoušky */}
        <div className="rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" /> Zkoušky
            </h3>
          </div>

          {exams.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 space-y-2 py-10">
              <BookOpen className="w-12 h-12 text-slate-600" />
              <p className="text-sm font-medium">Žádné zkoušky – chilluj! ✌️</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[300px]">
              {exams.map((exam) => (
                <div key={exam.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center group">
                  <div>
                    <h4 className="font-bold text-white text-sm">{exam.title}</h4>
                    <p className="text-[10px] text-slate-400">{exam.date} • {exam.time}</p>
                  </div>
                  <button onClick={() => removeExam(exam.id)} className="text-slate-600 hover:text-red-400 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button 
            onClick={() => setShowForm(true)}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> <span>Přidat termín na {selectedDate}. 6.</span>
          </button>
        </div>
      </div>
    </div>
  );
            }
