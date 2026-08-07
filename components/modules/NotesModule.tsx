'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, ArrowLeft, Check } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface NotesModuleProps {
  onBack?: () => void;
}

export default function NotesModule({ onBack }: NotesModuleProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [savedIndicator, setSavedIndicator] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('student_ai_notes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotes(parsed);
        if (parsed.length > 0) {
          setActiveNoteId(parsed[0].id);
          setTitle(parsed[0].title);
          setContent(parsed[0].content);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      const initial: Note[] = [{
        id: '1',
        title: 'Vítej v poznámkách 📝',
        content: 'Zde si můžeš psát rychlé poznámky k předmětům, taháky nebo úkoly.',
        date: new Date().toLocaleDateString('cs-CZ')
      }];
      setNotes(initial);
      setActiveNoteId('1');
      setTitle(initial[0].title);
      setContent(initial[0].content);
      localStorage.setItem('student_ai_notes', JSON.stringify(initial));
    }
  }, []);

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem('student_ai_notes', JSON.stringify(updatedNotes));
    setSavedIndicator(true);
    setTimeout(() => setSavedIndicator(false), 1500);
  };

  const handleSelectNote = (note: Note) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleCreateNew = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Nová poznámka',
      content: '',
      date: new Date().toLocaleDateString('cs-CZ')
    };
    const updated = [newNote, ...notes];
    saveNotes(updated);
    setActiveNoteId(newNote.id);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
    if (activeNoteId === id) {
      if (updated.length > 0) {
        setActiveNoteId(updated[0].id);
        setTitle(updated[0].title);
        setContent(updated[0].content);
      } else {
        setActiveNoteId(null);
        setTitle('');
        setContent('');
      }
    }
  };

  const handleUpdateContent = (newTitle: string, newContent: string) => {
    setTitle(newTitle);
    setContent(newContent);
    if (!activeNoteId) return;
    const updated = notes.map(n => n.id === activeNoteId ? {
      ...n,
      title: newTitle || 'Bez názvu',
      content: newContent,
      date: new Date().toLocaleDateString('cs-CZ')
    } : n);
    saveNotes(updated);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {onBack && (
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition flex items-center gap-2 cursor-pointer w-fit text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Workspace
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Seznam poznámek (sidebar) */}
        <div className="md:col-span-4 rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-5 backdrop-blur-xl shadow-2xl flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h2 className="font-bold text-white text-base">Poznámky</h2>
            </div>
            <button
              onClick={handleCreateNew}
              className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white transition shadow-md shadow-indigo-500/20 cursor-pointer"
              title="Nová poznámka"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleSelectNote(note)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex justify-between items-start group ${
                  activeNoteId === note.id
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/50 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="space-y-1 overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{note.title || 'Bez názvu'}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{note.content || 'Prázdná poznámka...'}</p>
                  <span className="text-[9px] text-indigo-300 block">{note.date}</span>
                </div>
                <button
                  onClick={(e) => handleDelete(note.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition cursor-pointer"
                  title="Smazat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-xs">
                Žádné poznámky. Vytvoř první! ✨
              </div>
            )}
          </div>
        </div>

        {/* Editor poznámky */}
        <div className="md:col-span-8 rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col h-[600px] relative">
          <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {activeNoteId ? (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleUpdateContent(e.target.value, content)}
                  placeholder="Název poznámky..."
                  className="bg-transparent font-black text-xl text-white outline-none w-full placeholder-slate-500"
                />
                <div className="flex items-center gap-2 shrink-0">
                  {savedIndicator && (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <Check className="w-3 h-3" /> Uloženo
                    </span>
                  )}
                </div>
              </div>

              <textarea
                value={content}
                onChange={(e) => handleUpdateContent(title, e.target.value)}
                placeholder="Začni psát text poznámky..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition resize-none shadow-inner leading-relaxed"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 text-slate-400">
              <FileText className="w-12 h-12 text-slate-600" />
              <p className="text-sm">Vyber poznámku v levém panelu nebo vytvoř novou.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
      }
