'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Bell, 
  Plus, 
  Trash2, 
  X, 
  CheckCircle2, 
  Clock, 
  Tag
} from 'lucide-react';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  color: string; // Hex nebo Tailwind barva
  category: string;
  notify: boolean;
}

const COLOR_OPTIONS = [
  { name: 'Červená (Test/Zkouška)', value: '#ef4444' },
  { name: 'Modrá (Projekt/Úkol)', value: '#3b82f6' },
  { name: 'Zelená (Přednáška/Cvičení)', value: '#10b981' },
  { name: 'Fialová (Osobní/Akce)', value: '#8b5cf6' },
  { name: 'Žlutá (Důležité)', value: '#f59e0b' }
];

export default function CalendarModule() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Zkouška z Matematiky',
      date: '2026-08-15',
      time: '09:00',
      color: '#ef4444',
      category: 'Zkouška',
      notify: true
    },
    {
      id: '2',
      title: 'Odevzdání seminární práce',
      date: '2026-08-20',
      time: '23:59',
      color: '#3b82f6',
      category: 'Projekt',
      notify: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [notificationsGranted, setNotificationsGranted] = useState(false);

  // Formulářové stavy
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [color, setColor] = useState('#ef4444');
  const [category, setCategory] = useState('Test');
  const [notify, setNotify] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationsGranted(Notification.permission === 'granted');
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsGranted(true);
        new Notification('Student AI', {
          body: 'Upozornění a notifikace byly zapnuty.'
        });
      }
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title,
      date,
      time,
      color,
      category,
      notify
    };

    setEvents([...events, newEvent].sort((a, b) => a.date.localeCompare(b.date)));
    setShowModal(false);

    // Reset
    setTitle('');
    setDate('');
    setTime('09:00');

    if (notify && notificationsGranted && typeof window !== 'undefined' && 'Notification' in window) {
      new Notification('Přípomínka uložena', {
        body: `${title} - ${date} v ${time}`
      });
    }
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((ev) => ev.id !== id));
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* HLAVIČKA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <CalendarIcon className="w-7 h-7 text-indigo-400" />
            <span>Kalendář událostí</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Zapisujte testy, zkoušky a úkoly. Nastavte si barevné rozlišení a notifikace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!notificationsGranted && (
            <button
              onClick={requestNotificationPermission}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-white flex items-center gap-2 transition"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Povolit notifikace</span>
            </button>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Přidat událost</span>
          </button>
        </div>
      </div>

      {/* SEZNAM UDÁLOSTÍ */}
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs">
            Žádné naplánované události. Klikněte na tlačítko "Přidat událost".
          </div>
        ) : (
          events.map((ev) => (
            <div
              key={ev.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 transition hover:border-slate-700"
            >
              <div className="flex items-center gap-4">
                {/* Barevný indikátor */}
                <div
                  className="w-3.5 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: ev.color }}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{ev.title}</h3>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-white/90"
                      style={{ backgroundColor: `${ev.color}33`, color: ev.color }}
                    >
                      {ev.category}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {ev.date} {ev.time && `v ${ev.time}`}
                    </span>
                    {ev.notify && (
                      <span className="flex items-center gap-1 text-indigo-400 font-medium text-[11px]">
                        <Bell className="w-3 h-3" />
                        Upozornění zapnuto
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(ev.id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded-xl transition"
                title="Smazat událost"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL PRO PŘIDÁNÍ UDÁLOSTI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddEvent}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              <span>Nová událost / Test</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Název</label>
                <input
                  type="text"
                  required
                  placeholder="např. Test z Fyziky"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Datum</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Čas</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Kategorie</label>
                <input
                  type="text"
                  placeholder="např. Test, Zkouška, Úkol"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Barevné označení</label>
                <div className="flex gap-2">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`w-7 h-7 rounded-full transition border-2 ${
                        color === c.value ? 'border-white scale-110' : 'border-transparent opacity-70'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 pt-2">
                <span className="text-xs text-slate-300">Aktivovat upozornění</span>
                <input
                  type="checkbox"
                  checked={notify}
                  onChange={(e) => setNotify(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-bold border border-slate-800 transition"
              >
                Zrušit
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20"
              >
                Uložit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
      }
            
