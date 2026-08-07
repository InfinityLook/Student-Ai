'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { 
  BrainCircuit, 
  Plus, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Trash2, 
  ArrowLeft, 
  FolderPlus, 
  Folder,
  Trophy, 
  Play, 
  Check, 
  RefreshCw, 
  Shuffle, 
  Search,
  HelpCircle,
  CheckCircle
} from 'lucide-react';

export type CardType = 'standard' | 'yesno';

export interface Card {
  id: string;
  type: CardType;
  front: string;
  back: string;
  correctAnswer?: boolean;
  starred?: boolean;
}

export type NewCardInput = Omit<Card, 'id'>;

export interface Group {
  id: string;
  name: string;
  color: string;
}

export interface Deck {
  id: string;
  title: string;
  groupId: string;
  cards: Card[];
}

const GROUP_COLORS = [
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-indigo-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600'
];

export default function FlashcardsModule() {
  const addNotification = useStore((state) => state.addNotification);

  // Hlavní stavy
  const [groups, setGroups] = useState<Group[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  
  // Režimy obrazovky
  const [mode, setMode] = useState<'overview' | 'study' | 'create-deck' | 'create-group'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Stavy studijního režimu
  const [currentCards, setCurrentCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [unknownCards, setUnknownCards] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Stavy pro tvorbu nové skupiny
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState(GROUP_COLORS[0]);

  // Stavy pro tvorbu nové sady
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckGroupId, setNewDeckGroupId] = useState('');
  const [newCards, setNewCards] = useState<NewCardInput[]>([
    { type: 'standard', front: '', back: '' }
  ]);

  const activeDeck = decks.find((d) => d.id === activeDeckId);

  // --- SPRÁVA SKUPIN ---
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      addNotification('Zadej název skupiny', 'error');
      return;
    }
    const createdGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName,
      color: newGroupColor
    };
    setGroups([...groups, createdGroup]);
    setNewGroupName('');
    setMode('overview');
    addNotification(`Skupina "${createdGroup.name}" byla vytvořena`, 'success');
  };

  const handleDeleteGroup = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setGroups(groups.filter((g) => g.id !== groupId));
    setDecks(decks.map((d) => d.groupId === groupId ? { ...d, groupId: '' } : d));
    if (selectedGroupId === groupId) setSelectedGroupId('all');
    addNotification('Skupina byla smazána', 'info');
  };

  // --- SPRÁVA SAD A KARTIČEK ---
  const handleAddCardToNewDeck = (type: CardType) => {
    setNewCards([
      ...newCards,
      type === 'standard'
        ? { type: 'standard', front: '', back: '' }
        : { type: 'yesno', front: '', back: '', correctAnswer: true }
    ]);
  };

  const handleSaveDeck = () => {
    if (!newDeckTitle.trim()) {
      addNotification('Zadej název sady', 'error');
      return;
    }

    const validCards = newCards.filter((c) => c.front.trim() && c.back.trim());
    if (validCards.length === 0) {
      addNotification('Přidej alespoň jednu vyplněnou kartičku', 'error');
      return;
    }

    const createdDeck: Deck = {
      id: Date.now().toString(),
      title: newDeckTitle,
      groupId: newDeckGroupId,
      cards: validCards.map((c, idx) => ({
        ...c,
        id: `${Date.now()}-${idx}`
      }))
    };

    setDecks([createdDeck, ...decks]);
    setNewDeckTitle('');
    setNewCards([{ type: 'standard', front: '', back: '' }]);
    setMode('overview');
    addNotification('Sada kartiček byla vytvořena', 'success');
  };

  const handleDeleteDeck = (deckId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDecks(decks.filter((d) => d.id !== deckId));
    addNotification('Sada byla smazána', 'info');
  };

  // --- STUDIJNÍ REŽIM ---
  const handleStartStudy = (deckId: string) => {
    const deck = decks.find((d) => d.id === deckId);
    if (!deck || deck.cards.length === 0) {
      addNotification('Tato sada neobsahuje žádné kartičky', 'error');
      return;
    }

    setActiveDeckId(deckId);
    setCurrentCards([...deck.cards]);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserChoice(null);
    setKnownCards([]);
    setUnknownCards([]);
    setIsFinished(false);
    setMode('study');
  };

  const handleYesNoChoice = (choice: boolean) => {
    if (userChoice !== null) return;
    setUserChoice(choice);
    const card = currentCards[currentCardIndex];
    const isCorrect = card.correctAnswer === choice;

    if (isCorrect) {
      setKnownCards((prev) => [...prev, card.id]);
    } else {
      setUnknownCards((prev) => [...prev, card.id]);
    }

    setTimeout(() => {
      setIsFlipped(true);
    }, 200);
  };

  const handleStandardAnswer = (known: boolean) => {
    const card = currentCards[currentCardIndex];
    if (known) {
      setKnownCards((prev) => [...prev, card.id]);
    } else {
      setUnknownCards((prev) => [...prev, card.id]);
    }
    handleNextCard();
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setUserChoice(null);

    if (currentCardIndex + 1 < currentCards.length) {
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev + 1);
      }, 200);
    } else {
      setIsFinished(true);
      addNotification('Sada byla dokončena!', 'success');
    }
  };

  const handleShuffle = () => {
    const shuffled = [...currentCards].sort(() => Math.random() - 0.5);
    setCurrentCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserChoice(null);
    addNotification('Kartičky byly zamíchány', 'info');
  };

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch = deck.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroupId === 'all' || deck.groupId === selectedGroupId;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 text-slate-100">
      
      {/* HLAVIČKA A NÁSTROJE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <BrainCircuit className="w-7 h-7 text-cyan-400" />
            <span>Kartičky & Skupiny</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Vytvářej si vlastní skupiny, normální kartičky nebo interaktivní Ano / Ne otázky.
          </p>
        </div>

        {mode === 'overview' && (
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setMode('create-group')}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Nová skupina</span>
            </button>

            <button
              onClick={() => {
                if (groups.length === 0) {
                  setNewDeckGroupId('');
                } else if (!newDeckGroupId) {
                  setNewDeckGroupId(groups[0].id);
                }
                setMode('create-deck');
              }}
              className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Vytvořit sadu</span>
            </button>
          </div>
        )}

        {mode !== 'overview' && (
          <button
            onClick={() => setMode('overview')}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-semibold transition-all border border-slate-700 self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na přehled</span>
          </button>
        )}
      </div>

      {/* REŽIM 1: PŘEHLED (SKUPINY + SADY) */}
      {mode === 'overview' && (
        <div className="space-y-6">
          
          {/* SEKCE SKUPIN */}
          {groups.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Folder className="w-4 h-4 text-cyan-400" />
                  <span>Moje Skupiny</span>
                </h2>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <button
                  onClick={() => setSelectedGroupId('all')}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
                    selectedGroupId === 'all'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  Všechny sady ({decks.length})
                </button>

                {groups.map((group) => {
                  const groupDecksCount = decks.filter((d) => d.groupId === group.id).length;
                  const isSelected = selectedGroupId === group.id;
                  return (
                    <div
                      key={group.id}
                      onClick={() => setSelectedGroupId(group.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer transition-all border group relative whitespace-nowrap ${
                        isSelected
                          ? `bg-gradient-to-r ${group.color} text-white border-transparent shadow-lg`
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{group.name}</span>
                      <span className="opacity-80 font-mono text-[10px] bg-black/20 px-2 py-0.5 rounded-full">
                        {groupDecksCount}
                      </span>
                      
                      <button
                        onClick={(e) => handleDeleteGroup(group.id, e)}
                        className="opacity-0 group-hover:opacity-100 ml-1 text-slate-400 hover:text-red-300 transition-all"
                        title="Smazat skupinu"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VYHLEDÁVÁNÍ */}
          {decks.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Hledat v sadách kartiček..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          )}

          {/* SEZNAM SAD / PRÁZDNÝ STAV */}
          {decks.length === 0 ? (
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-3xl p-10 text-center space-y-4">
              <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto border border-cyan-500/20 shadow-inner">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Zatím nemáš žádné sady ani kartičky</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Začni vytvořením své první skupiny nebo přímo vytvoř sadu s klasickými či Ano / Ne kartičkami.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => setMode('create-group')}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 px-4 py-2.5 rounded-xl text-xs font-semibold border border-cyan-500/30 transition-all"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Vytvořit skupinu</span>
                </button>

                <button
                  onClick={() => setMode('create-deck')}
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Vytvořit první sadu</span>
                </button>
              </div>
            </div>
          ) : filteredDecks.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-500">
              V této skupině nebo pro daný dotaz nebyly nalezeny žádné sady.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDecks.map((deck) => {
                const group = groups.find((g) => g.id === deck.groupId);
                const yesNoCardsCount = deck.cards.filter((c) => c.type === 'yesno').length;

                return (
                  <div
                    key={deck.id}
                    onClick={() => handleStartStudy(deck.id)}
                    className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:bg-slate-850 group relative flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        {group ? (
                          <span className={`text-[10px] font-bold text-white bg-gradient-to-r ${group.color} px-3 py-1 rounded-full shadow-sm`}>
                            {group.name}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                            Bez skupiny
                          </span>
                        )}

                        <button
                          onClick={(e) => handleDeleteDeck(deck.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-all"
                          title="Smazat sadu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="font-bold text-white text-base mb-1 group-hover:text-cyan-300 transition-colors">
                        {deck.title}
                      </h3>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                        <span>{deck.cards.length} kartiček</span>
                        {yesNoCardsCount > 0 && (
                          <span className="text-cyan-400 font-medium">({yesNoCardsCount}× Ano/Ne)</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 pt-4 mt-4 border-t border-slate-800/80">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Začít se učit</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* REŽIM 2: STUDIUM */}
      {mode === 'study' && activeDeck && (
        <div className="max-w-xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <span className="truncate max-w-[180px] font-semibold text-white">{activeDeck.title}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                title="Zamíchat"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Zamíchat</span>
              </button>
              <span className="font-mono text-cyan-400 font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                {currentCardIndex + 1} / {currentCards.length}
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + (isFinished ? 1 : 0)) / currentCards.length) * 100}%` }}
            />
          </div>

          {!isFinished && currentCards[currentCardIndex] ? (
            <div className="space-y-6">
              {(() => {
                const card = currentCards[currentCardIndex];
                const isYesNo = card.type === 'yesno';
                const isCorrectAnswer = userChoice !== null && userChoice === card.correctAnswer;

                return (
                  <div className="space-y-6">
                    <div 
                      onClick={() => !isYesNo && setIsFlipped(!isFlipped)}
                      style={{ perspective: '1000px' }}
                      className="w-full min-h-[300px] cursor-pointer group"
                    >
                      <div 
                        className={`w-full min-h-[300px] relative transition-all duration-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl border ${
                          userChoice !== null
                            ? isCorrectAnswer 
                              ? 'bg-emerald-950/40 border-emerald-500 shadow-emerald-500/20' 
                              : 'bg-rose-950/40 border-rose-500 shadow-rose-500/20'
                            : isFlipped 
                              ? 'bg-slate-900 border-cyan-500/50 shadow-cyan-500/10' 
                              : 'bg-slate-950 border-slate-800 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-4
