'use client';

import React, { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

interface CalendarModuleProps {
  onBack?: () => void;
}

export default function CalendarModule({ onBack }: CalendarModuleProps) {
  const [selectedDate, setSelectedDate] = useState(15);
  
  const exams = [
    { id: 1, title: 'Matematická analýza II', date: '15. června', time: '09:00', room: 'A12', type: 'Zkouška', urgent: true },
    { id: 2, title: 'Fyzika - Zápočet', date: '18. června', time: '11:00', room: 'E4', type: 'Zápočet', urgent: false },
    { id: 3, title: 'Databázové systémy', date: '22. června', time: '14:00', room: 'Online', type: 'Projekt', urgent: false },
  ];

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kalendář (2 sloupce) */}
        <div className="lg:col-span-2 rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-pink-400" /> Červen 2026 - Kalendář zkoušek
              </h3>
              <div className="flex gap-1">
                <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition text-slate-300 cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition text-slate-300 cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dny v týdnu */}
            <div className="grid grid-cols-7 gap-2 mb-3 text-center text-xs font-bold text-slate-400">
              <span>Po</span><span>Út</span><span>St</span><span>Čt</span><span>Pá</span><span>So</span><span>Ne</span>
            </div>

            {/* Mřížka dnů */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const hasExam = [15, 18, 22].includes(day);
                const isSelected = selectedDate === day;
                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-bold cursor-pointer transition-all relative ${
                      isSelected 
                        ? 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 scale-105' 
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <span>{day}</span>
                    {hasExam && (
                      <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-400" /> Den se zkouškou</span>
            <span>Kliknutím zobrazíš detaily</span>
          </div>
        </div>

        {/* Seznam zkoušek (1 sloupec) */}
        <div className="rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" /> Nadcházející zkoušky
              </h3>
            </div>

            <div className="space-y-3">
              {exams.map((exam) => (
                <div 
                  key={exam.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all space-y-2 group cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {exam.type}
                    </span>
                    {exam.urgent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Brzy
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                    {exam.title}
                  </h4>
                  <div className="flex justify-between text-xs text-slate-400 pt-1 border-t border-white/5">
                    <span>📅 {exam.date}</span>
                    <span>⏰ {exam.time} ({exam.room})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer">
            <span>+ Přidat nový termín</span>
          </button>
        </div>
      </div>
    </div>
  );
          }
