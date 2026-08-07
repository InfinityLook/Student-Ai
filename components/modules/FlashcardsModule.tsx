'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, ArrowLeft, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface Deck {
  id: string;
  title: string;
  cards: Flashcard[];
}

interface FlashcardsModuleProps {
  onBack?: () => void;
}

export default function FlashcardsModule({ onBack }: FlashcardsModuleProps) {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isCreatingDeck, setIsCreatingDeck] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('student_ai_flashcards');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDecks(parsed);
        if (parsed.length > 0) setActiveDeckId(parsed[0].id);
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialDecks: Deck[] = [
        {
          id: '1',
          title: 'Základy Programování',
          cards: [
            { id: 'c1', question: 'Co je to proměnná?', answer: 'Pojmenované místo v paměti pro uložení data.' },
            { id: 'c2', question: 'Co znamená zkratka HTML?', answer: 'HyperText Markup Language' }
          ]
        }
      ];
      setDecks(initialDecks);
      setActiveDeckId('1');
      localStorage.setItem('student_ai_flashcards', JSON.stringify(initialDecks));
    }
  }, []);

  const saveDecks = (updatedDecks: Deck[]) => {
    setDecks(updatedDecks);
    localStorage.setItem('student_ai_flashcards', JSON.stringify(updatedDecks));
  };

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;
    const newDeck: Deck = {
      id: Date.now().toString(),
      title: newDeckTitle,
      cards: []
    };
    saveDecks([...decks, newDeck]);
    setActiveDeckId(newDeck.id);
    setNewDeckTitle('');
    setIsCreatingDeck(false);
    setCurrentCardIndex(0);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDeckId || !newQuestion.trim() || !newAnswer.trim()) return;
    const updated = decks.map(deck => {
      if (deck.id === activeDeckId) {
        return {
          ...deck,
          cards: [...deck.cards, { id: Date.now().toString(), question: newQuestion, answer: newAnswer }]
        };
      }
      return deck;
    });
    saveDecks(updated);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleDeleteDeck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = decks.filter(d => d.id !== id);
    saveDecks(updated);
    if (activeDeckId === id) {
      setActiveDeckId(updated.length > 0 ? updated[0].id : null);
      setCurrentCardIndex(0);
    }
  };

  const activeDeck = decks.find(d => d.id === activeDeckId);
  const activeCard = activeDeck?.cards[currentCardIndex];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {onBack && (
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold transition flex items-center gap-2 cursor-pointer w-fit text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na Workspace
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Seznam balíčků */}
        <div className="md:col-span-4 rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-5 backdrop-blur-xl shadow-2xl flex flex-col h-[550px]">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-white text-base">Balíčky kartiček</h2>
            </div>
            <button
              onClick={() => setIsCreatingDeck(!isCreatingDeck)}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white transition shadow-md shadow-amber-500/20 cursor-pointer"
              title="Nový balíček"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {isCreatingDeck && (
            <form onSubmit={handleCreateDeck} className="mb-4 bg-white/5 p-3 rounded-2xl border border-white/10 space-y-2">
              <input
                type="text"
                value={newDeckTitle}
                onChange={(e) => setNewDeckTitle(e.target.value)}
                placeholder="Název balíčku..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
              />
              <div className="flex justify-end gap-2">
                <button type="submit" className="px-3 py-1.5 bg-amber-500 text-black font-bold text-xs rounded-xl cursor-pointer">Vytvořit</button>
              </div>
            </form>
          )}

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {decks.map((deck) => (
              <div
                key={deck.id}
                onClick={() => { setActiveDeckId(deck.id); setCurrentCardIndex(0); setIsFlipped(false); }}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex justify-between items-center group ${
                  activeDeckId === deck.id
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{deck.title}</h4>
                  <p className="text-[11px] text-slate-400">{deck.cards.length} kartiček</p>
                </div>
                <button
                  onClick={(e) => handleDeleteDeck(deck.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hlavní oblast pro učení kartiček */}
        <div className="md:col-span-8 rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between h-[550px] relative">
          <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {activeDeck && activeDeck.cards.length > 0 ? (
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <h3 className="font-bold text-white text-sm">{activeDeck.title}</h3>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  {currentCardIndex + 1} / {activeDeck.cards.length}
                </span>
              </div>

              {/* Karta */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="my-auto py-12 px-6 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer text-center min-h-[220px] flex flex-col items-center justify-center relative shadow-inner group"
              >
                <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-400">
                  {isFlipped ? 'Odpověď' : 'Otázka'}
                </span>
                <span className="absolute top-4 right-4 text-xs text-slate-500 group-hover:text-amber-400 transition flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" /> Kliknutím otočit
                </span>
                <p className="text-lg md:text-xl font-bold text-white mt-4">
                  {isFlipped ? activeCard?.answer : activeCard?.question}
                </p>
              </div>

              {/* Ovládání kartiček */}
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <button
                  onClick={() => { setIsFlipped(false); setCurrentCardIndex(prev => Math.max(0, prev - 1)); }}
                  disabled={currentCardIndex === 0}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Předchozí
                </button>
                <button
                  onClick={() => { setIsFlipped(false); setCurrentCardIndex(prev => Math.min(activeDeck.cards.length - 1, prev + 1)); }}
                  disabled={currentCardIndex === activeDeck.cards.length - 1}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold disabled:opacity-30 text-xs transition flex items-center gap-1 cursor-pointer shadow-md"
                >
                  Další <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : activeDeck ? (
            <div className="flex flex-col h-full justify-between">
              <div className="text-center py-12 space-y-4 my-auto">
                <Layers className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="font-bold text-white text-base">Tento balíček je zatím prázdný</h3>
                <p className="text-xs text-slate-400">Přidej první kartičku níže.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 text-xs">
              Vyber balíček kartiček vlevo.
            </div>
          )}

          {/* Přidání nové kartičky */}
          {activeDeck && (
            <form onSubmit={handleAddCard} className="mt-4 pt-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Nová otázka..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
              />
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Odpověď..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
              />
              <button type="submit" className="px-4 py-2 bg-amber-500 text-black font-bold text-xs rounded-xl cursor-pointer hover:opacity-90 transition">
                Přidat
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
                }
