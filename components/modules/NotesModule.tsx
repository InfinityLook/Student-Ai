'use client';

import React, { useState, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Highlighter, 
  Bold, 
  Italic, 
  Tag, 
  Clock, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string; // HTML obsah se zvýrazněním
  category: string;
  updatedAt: string;
}

const CATEGORIES = ['Vše', 'Matematika', 'Český jazyk', 'Dějepis', 'Fyzika', 'Osobní'];

export default function NotesModule() {
  const addNotification = useStore((state) => state.addNotification);

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Vše');

  const editorRef = useRef<HTMLDivElement>(null);

  const currentNote = notes.find((n) => n.id === selectedNoteId);

  // Vytvoření nové poznámky
  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Nová poznámka',
      content: 'Zde začni psát své poznámky...',
      category: selectedCategory === 'Vše' ? 'Osobní' : selectedCategory,
      updatedAt: 'Právě teď'
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    addNotification('Nová poznámka byla vytvořena', 'success');
  };

  // Smazání poznámky
  const handleDeleteNote = (id: string) => {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    if (selectedNoteId === id) {
      setSelectedNoteId(filtered.length > 0 ? filtered[0].id : '');
    }
    addNotification('Poznámka byla smazána', 'info');
  };

  // Aktualizace titulu / kategorie / obsahu
  const handleUpdateNote = (field: keyof Note, value: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === selectedNoteId) {
          return { ...n, [field]: value, updatedAt: 'Právě teď' };
        }
        return n;
      })
    );
  };

  // Aplikování zvýraznění na označený text
  const applyHighlight = (colorStyle: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      addNotification('Nejprve označ text, který chceš zvýraznit', 'info');
      return;
    }

    const range = selection.getRangeAt(0);
    const span = document.createElement('mark');
    span.className = `${colorStyle} px-1.5 py-0.5 rounded font-semibold transition-all`;
    
    try {
      range.surroundContents(span);
      if (editorRef.current) {
        handleUpdateNote('content', editorRef.current.innerHTML);
      }
    } catch {
      addNotification('Označ pouze text uvnitř jednoho odstavce', 'error');
    }
  };

  // Formátování písma (Tučné, Kurzíva)
  const applyFormat = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) {
      handleUpdateNote('content', editorRef.current.innerHTML);
    }
  };

  // Filtrované poznámky
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Vše' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full max-h-[calc(100vh-70px)] flex flex-col md:flex-row bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* BOČNÍ PANEL: SEZNAM POZNÁMEK */}
      <div className="w-full md:w-80 border-r border-slate-800 flex flex-col h-1/2 md:h-full bg-slate-950/50">
        
        {/* Vyhledávání a Nová poznámka */}
        <div className="p-4 space-y-3 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Moje Poznámky</span>
            </h2>
            <button
              onClick={handleCreateNote}
              className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl transition-all flex items-center gap-1 text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Přidat</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Hledat v poznámkách..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Filtry Předmětů */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Seznam Karet */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              {notes.length === 0 ? 'Zatím nemáš žádné poznámky.' : 'Žádná poznámka neodpovídá filtru.'}
            </div>
          ) : (
            filteredNotes.map((note) => {
              const isSelected = note.id === selectedNoteId;
              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm text-white truncate max-w-[180px]">
                      {note.title || 'Bez názvu'}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p 
                    className="text-xs text-slate-400 line-clamp-2 mb-2"
                    dangerouslySetInnerHTML={{ __html: note.content.replace(/<[^>]*>?/gm, ' ') }}
                  />

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700/50 text-slate-300">
                      <Tag className="w-2.5 h-2.5 text-amber-400" />
                      {note.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {note.updatedAt}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* HLAVNÍ EDITOR / NÁHLED POZNÁMKY */}
      {currentNote ? (
        <div className="flex-1 flex flex-col h-1/2 md:h-full bg-slate-900">
          
          {/* Hlavička a Nástrojová lišta */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Název Poznámky */}
              <input
                type="text"
                value={currentNote.title}
                onChange={(e) => handleUpdateNote('title', e.target.value)}
                placeholder="Název poznámky..."
                className="bg-transparent text-xl font-bold text-white focus:outline-none placeholder-slate-600 w-full"
              />

              {/* Výběr Předmětu */}
              <select
                value={currentNote.category}
                onChange={(e) => handleUpdateNote('category', e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs text-amber-300 font-semibold px-3 py-1.5 rounded-xl focus:outline-none cursor-pointer self-start sm:self-auto"
              >
                {CATEGORIES.filter((c) => c !== 'Vše').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Zvýrazňovače a Formátování */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-medium mr-1 flex items-center gap-1">
                <Highlighter className="w-3.5 h-3.5 text-amber-400" /> Zvýraznění:
              </span>

              {/* Žlutý zvýrazňovač */}
              <button
                onClick={() => applyHighlight('bg-amber-400/30 text-amber-200 border border-amber-400/40')}
                className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-medium transition-all"
                title="Žluté zvýraznění"
              >
                Žlutá
              </button>

              {/* Zelený zvýrazňovač */}
              <button
                onClick={() => applyHighlight('bg-emerald-400/30 text-emerald-200 border border-emerald-400/40')}
                className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-medium transition-all"
                title="Zelené zvýraznění"
              >
                Zelená
              </button>

              {/* Modrý zvýrazňovač */}
              <button
                onClick={() => applyHighlight('bg-cyan-400/30 text-cyan-200 border border-cyan-400/40')}
                className="px-2 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-medium transition-all"
                title="Modré zvýraznění"
              >
                Modrá
              </button>

              {/* Růžový zvýrazňovač */}
              <button
                onClick={() => applyHighlight('bg-pink-400/30 text-pink-200 border border-pink-400/40')}
                className="px-2 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 rounded-lg text-xs font-medium transition-all"
                title="Růžové zvýraznění"
              >
                Růžová
              </button>

              <div className="h-4 w-px bg-slate-800 mx-1"></div>

              {/* Tučné */}
              <button
                onClick={() => applyFormat('bold')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-all"
                title="Tučné písmo"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>

              {/* Kurzíva */}
              <button
                onClick={() => applyFormat('italic')}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-all"
                title="Kurzíva"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Vlastní Editor s živým náhledem */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={() => {
                if (editorRef.current) {
                  handleUpdateNote('content', editorRef.current.innerHTML);
                }
              }}
              dangerouslySetInnerHTML={{ __html: currentNote.content }}
              className="w-full min-h-[300px] text-slate-200 text-sm leading-relaxed focus:outline-none prose prose-invert max-w-none"
            />
          </div>

          {/* Patka s informací */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/20 flex items-center justify-between text-[11px] text-slate-500 px-6">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Označ text myší a klikni na barvu pro zvýraznění
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Automaticky uloženo
            </span>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
          <FileText className="w-12 h-12 mb-3 text-slate-700" />
          <p className="text-sm">Vytvoř svou první poznámku kliknutím na tlačítko <b>Přidat</b></p>
        </div>
      )}

    </div>
  );
}
