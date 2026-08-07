'use client';

import React, { useState } from 'react';
import { Plus, Search, Layers, RotateCw, Check, X, Sparkles, BookOpen, Trash2 } from 'lucide-react';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  groupId: string;
  cards: Flashcard[];
}

export interface Group {
  id: string;
  name: string;
}

const INITIAL_GROUPS: Group[] = [
  { id: 'all', name: 'Všechny okruhy' },
  { id: 'matematika', name: 'Matematika' },
  { id: 'biologie', name: 'Biologie' },
  { id: 'dejepis', name: 'Dějepis' },
];

const INITIAL_DECKS: Deck[] = [
  {
    id: 'deck-1',
    title: 'Anatomie - Kosterní soustava',
    description: 'Základní kosti lidského těla a jejich latinské názvy.',
    groupId: 'biologie',
    cards: [
      { id: 'c1', front: 'Lidská lebka', back: 'Cranium' },
      { id: 'c2', front: 'Páteř', back: 'Columna vertebralis' },
      { id: 'c3', front: 'Kostí hrudní', back: 'Sternum' },
    ],
  },
  {
    id: 'deck-2',
    title: 'Derivace a Integrály',
    description: 'Vorce a pravidla pro počítání základních derivací.',
    groupId: 'matematika',
    cards: [
      { id: 'c4', front: 'Derivace x^n', back: 'n * x^(n-1)' },
      { id: 'c5', front: 'Derivace sin(x)', back: 'cos(x)' },
      { id: 'c6', front: 'Derivace cos(x)', back: '-sin(x)' },
    ],
  },
];

export default function FlashcardsModule() {
  const [decks, setDecks] = useState<Deck[]>(INITIAL_DECKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('all');
  
  // Stavy pro učení
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Stavy pro tvorbu balíčku
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newGroupId, setNewGroupId] = useState('biologie');
  const [newCards, setNewCards] = useState<{ front: string; back: string }[]>([
    { front: '', back: '' },
  ]);

  const handleStartStudy = (deck: Deck) => {
    if (deck.cards.length === 0) return;
    setActiveDeck(deck);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleNextCard = () => {
    if (!activeDeck) return;
    setIsFlipped(false);
    if (currentCardIndex < activeDeck.cards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setActiveDeck(null); // Dokončení balíčku
    }
  };

  const handleAddCardInput = () => {
    setNewCards([...newCards, { front: '', back: '' }]);
  };

  const handleRemoveCardInput = (index: number) => {
    setNewCards(newCards.filter((_, i) => i !== index));
  };

  const handleCardInputChange = (index: number, field: 'front' | 'back', value: string) => {
    const updated = [...newCards];
    updated[index][field] = value;
    setNewCards(updated);
  };

  const handleSaveDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const validCards = newCards
      .filter((c) => c.front.trim() && c.back.trim())
      .map((c, i) => ({ id: `card-${Date.now()}-${i}`, front: c.front, back: c.back }));

    const createdDeck: Deck = {
      id: `deck-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      groupId: newGroupId,
      cards: validCards,
    };

    setDecks([createdDeck, ...decks]);
    setIsCreating(false);
    setNewTitle('');
    setNewDesc('');
    setNewCards([{ front: '', back: '' }]);
  };

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch = deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deck.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroupId === 'all' || deck.groupId === selectedGroupId;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 text-slate-100">
      
      {/* HLAVIČKA A NÁSTROJE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-7 h-7 text-indigo-400" />
            Kartičky (Flashcards)
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Procvičujte a upevňujte své znalosti pomocí paměťových kartiček.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-5 h-5" />
          Vytvořit balíček
        </button>
      </div>

      {/* REŽIM UČENÍ */}
      {activeDeck ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="flex justify-between items-center text-sm text-slate-400">
            <span>{activeDeck.title}</span>
            <span>
              Karta {currentCardIndex + 1} z {activeDeck.cards.length}
            </span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[260px] bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 text-center select-none shadow-inner"
          >
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-4">
              {isFlipped ? 'Odpověď / Zadní strana' : 'Otázka / Přední strana'}
            </span>
            <p className="text-2xl font-medium text-white leading-relaxed">
              {isFlipped
                ? activeDeck.cards[currentCardIndex].back
                : activeDeck.cards[currentCardIndex].front}
            </p>
            <p className="text-xs text-slate-500 mt-6 flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" /> Klikněte pro otočení
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={() => setActiveDeck(null)}
              className="px-4 py-2 text-slate-400 hover:text-white transition text-sm"
            >
              Ukončit
            </button>
            <button
              onClick={handleNextCard}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium transition flex items-center gap-2"
            >
              {currentCardIndex < activeDeck.cards.length - 1 ? 'Další karta' : 'Dokončit'}
            </button>
          </div>
        </div>
      ) : isCreating ? (
        /* FORMULÁŘ DNO TVORBY BALÍČKU */
        <form onSubmit={handleSaveDeck} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">Nový balíček kartiček</h2>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Název balíčku</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="např. Latinská slovíčka"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Okruh / Předmět</label>
              <select
                value={newGroupId}
                onChange={(e) => setNewGroupId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                {INITIAL_GROUPS.filter((g) => g.id !== 'all').map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Popis (volitelné)</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Krátký popis obsahu..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-medium text-slate-400">Kartičky</label>
            {newCards.map((card, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Přední strana (otázka)"
                  value={card.front}
                  onChange={(e) => handleCardInputChange(idx, 'front', e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
                <input
                  type="text"
                  placeholder="Zadní strana (odpověď)"
                  value={card.back}
                  onChange={(e) => handleCardInputChange(idx, 'back', e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
                {newCards.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCardInput(idx)}
                    className="p-2 text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCardInput}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium pt-1 inline-block"
            >
              + Přidat další kartičku
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-slate-400 hover:text-white transition text-sm"
            >
              Zrušit
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
            >
              Uložit balíček
            </button>
          </div>
        </form>
      ) : (
        /* SEZNAM BALÍČKŮ A VYHLEDÁVÁNÍ */
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Hledat v balíčcích..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {INITIAL_GROUPS.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                    selectedGroupId === group.id
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDecks.map((deck) => (
              <div
                key={deck.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {deck.groupId}
                    </span>
                    <span className="text-xs text-slate-500">
                      {deck.cards.length} {deck.cards.length === 1 ? 'karta' : 'kartiček'}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition">
                    {deck.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">{deck.description}</p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleStartStudy(deck)}
                    disabled={deck.cards.length === 0}
                    className="w-full bg-slate-800 hover:bg-indigo-600 text-white text-xs font-medium py-2 rounded-xl transition flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Spustit procvičování
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
              }

