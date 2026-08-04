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

  if (dueDate < today) return { label: "Po termínu", classes: "bg-coral/10 text-coral border-coral/30" };
  if (dueDate === today) return { label: "Dnes", classes: "bg-coral/10 text-coral border-coral/30" };
  if (dueDate === tomorrow) return { label: "Zítra", classes: "bg-gold/10 text-gold border-gold/30" };
  return { label: formatDateCz(dueDate), classes: "bg-surface-hover text-muted border-edge" };
}

export default function TaskPlannerModule() {
  const { addNotification, tasks, addTask, toggleTask, deleteTask } = useStore();

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const activeCount = tasks.filter((t) => !t.completed).length;

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
      <div className="bg-surface p-6 rounded-2xl border border-edge shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">📋 Studijní plánovač</h2>
          <p className="text-muted text-sm mt-1">Úkoly a termíny na jednom místě.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs text-muted">Aktivní úkoly</div>
            <div className="text-xl font-mono font-bold text-gold">{activeCount}</div>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 bg-violet hover:brightness-110 text-ink rounded-xl text-sm font-medium transition-all shadow-lg shadow-violet/20"
          >
            {isAdding ? "Zavřít" : "+ Přidat úkol"}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-surface p-6 rounded-2xl border border-violet shadow-sm space-y-4">
          <h3 className="font-semibold text-ink text-sm">Nový úkol</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Název úkolu (např. Domácí úkol z fyziky)"
            className="w-full p-3 rounded-xl border border-edge bg-canvas text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet text-sm"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Předmět (volitelné)"
              className="w-full p-3 rounded-xl border border-edge bg-canvas text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet text-sm"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-edge bg-canvas text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-violet text-sm"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full py-2.5 bg-violet hover:brightness-110 text-ink font-medium rounded-xl text-sm transition-all"
          >
            Uložit úkol
          </button>
        </div>
      )}

      {sortedTasks.length === 0 ? (
        <div className="bg-surface p-12 rounded-2xl border border-edge text-center text-muted text-sm">
          Zatím nemáš žádné úkoly. Přidej první výše.
        </div>
      ) : (
        <div className="space-y-2">
          {sortedTasks.map((task) => {
            const urgency = getUrgency(task.dueDate, task.completed);
            return (
              <div
                key={task.id}
                className={`bg-surface p-4 rounded-2xl border border-edge shadow-sm flex items-center gap-3 group ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 shrink-0 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    task.completed ? "bg-mint border-mint text-canvas" : "border-edge hover:border-violet"
                  }`}
                >
                  {task.completed && "✓"}
                </button>

                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-ink text-sm truncate ${task.completed ? "line-through" : ""}`}>
                    {task.title}
                  </div>
                  {task.subject && <div className="text-xs text-muted truncate">{task.subject}</div>}
                </div>

                {urgency && (
                  <span
                    className={`shrink-0 text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border ${urgency.classes}`}
                  >
                    {urgency.label}
                  </span>
                )}

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-coral transition-opacity shrink-0"
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
