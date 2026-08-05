"use client";

import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import { todayISO, addDays } from "@/lib/date";

function formatDateCz(dateISO: string): string {
  const d = new Date(`${dateISO}T00:00:00`);
  return `${d.getDate()}. ${d.getMonth() + 1}.`;
}

function getUrgency(dueDate: string | null, completed: boolean) {
  if (!dueDate || completed) return null;
  const today = todayISO();
  const tomorrow = addDays(today, 1);

  if (dueDate < today) return { label: "Po termínu", classes: "bg-rose-500/10 text-rose-400 border-rose-500/30" };
  if (dueDate === today) return { label: "Dnes", classes: "bg-rose-500/10 text-rose-400 border-rose-500/30" };
  if (dueDate === tomorrow) return { label: "Zítra", classes: "bg-amber-500/10 text-amber-400 border-amber-500/30" };
  return { label: formatDateCz(dueDate), classes: "bg-white/5 text-gray-400 border-white/10" };
}

export default function TaskPlannerModule() {
  const { addNotification, tasks, addTask, toggleTask, deleteTask } = useStore();

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const today = todayISO();
  const activeCount = tasks.filter((t) => !t.completed).length;

  const urgentTasks = tasks.filter(
    (t) => !t.completed && t.dueDate && t.dueDate <= today
  );

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  });

  const handleAdd = () => {
    if (!title.trim()) {
      addNotification("Zadej název úkolu!", "error");
      return;
    }
    addTask(title.trim(), subject.trim(), dueDate || null);
    setTitle("");
    setSubject("");
    setDueDate("");
    setIsAdding(false);
    addNotification("Úkol byl přidán do plánovače.", "success");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>📋</span> Studijní plánovač
          </h2>
          <p className="text-gray-400 text-sm mt-1">Úkoly a termíny na jednom místě.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Aktivní</div>
            <div className="text-xl font-bold text-amber-400">{activeCount}</div>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white rounded-2xl text-sm font-semibold transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            {isAdding ? "Zavřít" : "+ Přidat úkol"}
          </button>
        </div>
      </div>

      {/* Panel upozornění na urgentní úkoly */}
      {urgentTasks.length > 0 && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-5 rounded-3xl backdrop-blur-xl shadow-lg space-y-2.5">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <span>🔔</span> Upozornění — {urgentTasks.length} {urgentTasks.length === 1 ? "úkol vyžaduje" : "úkolů vyžaduje"} pozornost
          </div>
          <div className="space-y-1.5">
            {urgentTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between text-sm">
                <span className="text-white truncate">{t.title}</span>
                <span className="text-xs text-rose-400 font-medium shrink-0 ml-2">
                  {t.dueDate === today ? "Termín dnes" : "Po termínu"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAdding && (
        <div className="bg-white/5 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-xl shadow-lg space-y-4">
          <h3 className="font-semibold text-white text-sm">Nový úkol</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Název úkolu (např. Domácí úkol z fyziky)"
            className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Předmět (volitelné)"
              className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white font-semibold rounded-xl text-sm transition-all active:scale-95"
          >
            Uložit úkol
          </button>
        </div>
      )}

      {sortedTasks.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-xl text-center text-gray-400 text-sm">
          Zatím nemáš žádné úkoly. Přidej první výše.
        </div>
      ) : (
        <div className="space-y-2">
          {sortedTasks.map((task) => {
            const urgency = getUrgency(task.dueDate, task.completed);
            return (
              <div
                key={task.id}
                className={`bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-lg flex items-center gap-3 group transition ${
                  task.completed ? "opacity-50" : ""
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 shrink-0 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-emerald-500 border-emerald-500 text-[#090a0f]"
                      : "border-white/20 hover:border-cyan-400"
                  }`}
                >
                  {task.completed && "✓"}
                </button>

                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-white text-sm truncate ${task.completed ? "line-through" : ""}`}>
                    {task.title}
                  </div>
                  {task.subject && <div className="text-xs text-gray-400 truncate">{task.subject}</div>}
                </div>

                {urgency && (
                  <span
                    className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border ${urgency.classes}`}
                  >
                    {urgency.label}
                  </span>
                )}

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-rose-400 transition-opacity shrink-0"
                  title="Smazat"
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
