'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Bell, 
  BellOff, 
  Plus, 
  Clock, 
  GraduationCap, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  X, 
  Sparkles,
  Bookmark,
  CalendarDays
} from 'lucide-react';

export interface CalendarEvent {
  id: string;
  title: string;
  subject: string;
  date: string; // Tvar: YYYY-MM-DD
  time?: string;
  type: 'exam' | 'deadline' | 'event';
  priority: 'high' | 'medium' | 'low';
  notify: boolean;
}

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Zkouška z Matematiky III',
    subject: 'Matematika',
    date: '2026-08-15',
    time: '09:00',
    type: 'exam',
    priority: 'high',
    notify: true
  },
  {
    id: 'ev-2',
    title: 'Odevzdání seminární práce',
    subject: 'Biologie',
    date: '2026-08-20',
    time: '23:59',
    type: 'deadline',
    priority: 'medium',
    notify: true
  },
  {
    id: 'ev-3',
    title: 'Přípravný webinář k maturitě',
    subject: 'Všeobecné',
    date: '2026-08-25',
    time: '17:00',
    type: 'event',
    priority: 'low',
    notify: false
  }
];

export default function CalendarModule() {
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [filter, setFilter] = useState<'all' | 'exam' | 'deadline' | 'event'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [notificationsAllowed, setNotificationsAllowed] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Formulářové stavy
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('09:00');
  const [newType, setNewType] = useState<'exam' | 'deadline' | 'event'>('exam');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newNotify, setNewNotify] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationsAllowed(Notification.permission === 'granted');
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsAllowed(true);
        triggerToast('Notifikace byly úspěšně povoleny!');
        new Notification('Student AI Kalendář', {
          body: 'Notifikace pro vaše zkoušky a akce jsou aktivní.',
          icon: '/favicon.ico'
        });
      } else {
        setNotificationsAllowed(false);
        triggerToast('Povolení notifikací bylo zamítnuto.');
      }
    }
  };

  const triggerToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;

    const createdEvent: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: newTitle,
      subject: newSubject || 'Obecné',
      date: newDate,
      time: newTime,
      type: newType,
      priority: newPriority,
      notify: newNotify
    };

    setEvents([...events, createdEvent].sort((a, b) => a.date.localeCompare(b.date)));
    setIsAdding(false);

    // Reset formuláře
    setNewTitle('');
    setNewSubject('');
    setNewDate('');
    setNewTime('09:00');

    triggerToast(`Událost "${createdEvent.title}" byla přidána do kalendáře.`);

    if (newNotify && notificationsAllowed && typeof window !== 'undefined' && 'Notification' in window) {
      new Notification('Přípomínka nastavena', {
        body: `Budete upozorněni na: ${createdEvent.title} (${createdEvent.date})`
      });
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((ev) => ev.id !== id));
    triggerToast('Událost byla smazána.');
  };

  const toggleNotify = (id: string) => {
    setEvents(
      events.map((ev) => {
        if (ev.id === id) {
          const updated = !ev.notify;
          if (updated && !notificationsAllowed) {
            requestNotificationPermission();
          }
          return { ...ev, notify: updated };
        }
        return ev;
      })
    );
  };

  const filteredEvents = events.filter((ev) => filter === 'all' || ev.type === filter);

  // Výpočet zbývajících dní
  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Dnes';
    if (diffDays === 1) return 'Zítra';
    if (diffDays < 0) return 'Proběhlo';
    return `za ${diffDays} dní`;
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 text-slate-100">
      
      {/* HLAVIČKA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <CalendarDays className="w-7 h-7 text-indigo-400" />
            <span>Kalendář zkoušek & akcí</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Mějte přehled o nadcházejících zkouškách, termínech odevzdání a školních událostech s automatickým upozorněním.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tlačítko pro povolení notifikací */}
          <button
            onClick={requestNotificationPermission}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold border flex items-center gap-2 transition ${
              notificationsAllowed
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {notificationsAllowed ? <Bell className="w-4 h-4 text-emerald-400" /> : <BellOff className="w-4 h-4 text-slate-500" />}
            <span>{notificationsAllowed ? 'Notifikace zapnuty' : 'Povolit notifikace'}</span>
          </button>

          {/* Tlačítko přidat */}
          <button
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Přidat událost</span>
          </button>
        </div>
      </div>

      {/* TOAST OZNÁMENÍ */}
      {notificationMsg && (
        <div className="bg-indigo-950/80 border border-indigo-500/50 text-indigo-200 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold shadow-xl animate-fade-in">
          <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* ODPOČÍTÁVÁNÍ K NEJBLIŽŠÍ ZKOUŠCE */}
      {events.filter((e) => e.type === 'exam').length > 0 && (
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Nejbližší zkouška</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">{events.filter((e) => e.type === 'exam')[0].title}</h2>
              <p className="text-xs text-slate-400 mt-1">
                Předmět: <span className="text-slate-200 font-medium">{events.filter((e) => e.type === 'exam')[0].subject}</span> • {events.filter((e) => e.type === 'exam')[0].date} {events.filter((e) => e.type === 'exam')[0].time && `v ${events.filter((e) => e.type === 'exam')[0].time}`}
              </p>
            </div>
            <div className="bg-indigo-600/20 border border-indigo-500/40 px-5 py-3 rounded-2xl text-center self-start sm:self-auto">
              <div className="text-2xl font-extrabold text-indigo-300 font-mono">
                {getDaysRemaining(events.filter((e) => e.type === 'exam')[0].date)}
              </div>
              <div className="text-[10px] text-indigo-400 uppercase font-semibold">Zbývající čas</div>
            </div>
          </div>
        </div>
      )}

      {/* FILTRY KATEGORIÍ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Všechny události' },
          { id: 'exam', label: 'Zkoušky & Testy' },
          { id: 'deadline', label: 'Termíny odevzdání' },
          { id: 'event', label: 'Akce & Webináře' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap border ${
              filter === item.id
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* SEZNAM UDÁLOSTÍ */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-xs">
            V této kategorii zatím nemáte žádné události.
          </div>
        ) : (
          filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl flex-shrink-0 mt-0.5 ${
                  ev.type === 'exam' 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : ev.type === 'deadline'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                }`}>
                  {ev.type === 'exam' && <GraduationCap className="w-5 h-5" />}
                  {ev.type === 'deadline' && <Clock className="w-5 h-5" />}
                  {ev.type === 'event' && <CalendarIcon className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition">{ev.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                      {ev.subject}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                    <span>{ev.date} {ev.time && `• ${ev.time}`}</span>
                    <span className="font-semibold text-indigo-400">{getDaysRemaining(ev.date)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-slate-800">
                <button
                  onClick={() => toggleNotify(ev.id)}
                  className={`p-2 rounded-xl border text-xs font-medium transition flex items-center gap-1.5 ${
                    ev.notify
                      ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                  title={ev.notify ? 'Notifikace aktivní' : 'Zapnout notifikaci'}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden md:inline">{ev.notify ? 'Připomínat' : 'Vypnuto'}</span>
                </button>

                <button
                  onClick={() => handleDeleteEvent(ev.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded-xl transition"
                  title="Smazat událost"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL PRO PŘIDÁNÍ UDÁLOSTI */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddEvent}
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-400" />
              <span>Nová událost v kalendáři</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Název události / Zkoušky</label>
                <input
                  type="text"
                  required
                  placeholder="např. Ústní zkouška z Biologie"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Předmět</label>
                  <input
                    type="text"
                    placeholder="např. Biologie"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Typ</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option value="exam">Zkouška / Test</option>
                    <option value="deadline">Odevzdání práce</option>
                    <option value="event">Akce / Webinář</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Datum</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Čas (volitelné)</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300 font-medium">Upozornit notifikací v prohlížeči</span>
                <input
                  type="checkbox"
                  checked={newNotify}
                  onChange={(e) => setNewNotify(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-bold border border-slate-800 transition"
              >
                Zrušit
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold transition shadow-lg shadow-indigo-600/20"
              >
                Uložit událost
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
