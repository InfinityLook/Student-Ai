'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Zap, 
  Check, 
  Sparkles, 
  Crown, 
  FileText, 
  X, 
  CreditCard, 
  History,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export interface StoreItem {
  id: string;
  title: string;
  description: string;
  category: 'subscription' | 'credits' | 'templates';
  price: number;
  currency: string;
  period?: 'měsíc' | 'rok';
  popular?: boolean;
  badge?: string;
  features: string[];
  creditsValue?: number;
}

const STORE_ITEMS: StoreItem[] = [
  // Předplatné
  {
    id: 'sub-pro-monthly',
    title: 'Student AI Pro',
    description: 'Nejpopulárnější volba pro aktivní studenty.',
    category: 'subscription',
    price: 199,
    currency: 'Kč',
    period: 'měsíc',
    popular: true,
    badge: 'Nejoblíbenější',
    features: [
      'Neomezené AI generování poznámek',
      '2 000 AI kreditů měsíčně zdarma',
      'Tvorba neomezeného množství kartiček',
      'Prioritní rychlost AI odpovídání',
      'Pokročilé exporty do PDF a Wordu'
    ]
  },
  {
    id: 'sub-pro-yearly',
    title: 'Student AI Pro (Roční)',
    description: 'Ušetři 25 % s roční platbou na celý školní rok.',
    category: 'subscription',
    price: 1790,
    currency: 'Kč',
    period: 'rok',
    badge: 'Ušetříš 25%',
    features: [
      'Všechny výhody měsíčního Pro',
      '25 000 AI kreditů ročně zdarma',
      'Přístup ke všem prémiovým šablonám',
      'Exkluzivní VIP podpora'
    ]
  },
  // Kreditní balíčky
  {
    id: 'cred-pack-1',
    title: 'Startovací balíček kreditů',
    description: 'Jednorázové doplnění kreditů bez závazků.',
    category: 'credits',
    price: 49,
    currency: 'Kč',
    creditsValue: 500,
    features: [
      '500 AI kreditů bez exspirace',
      'Okamžité připsání na účet',
      'Vhodné pro nárazové učení na zkoušky'
    ]
  },
  {
    id: 'cred-pack-2',
    title: 'Mega balíček kreditů',
    description: 'Nejvýhodnější poměr ceny za 1 credit.',
    category: 'credits',
    price: 149,
    currency: 'Kč',
    creditsValue: 2000,
    popular: true,
    badge: 'Nejvýhodnější',
    features: [
      '2 000 AI kreditů bez exspirace',
      'Bonus +200 kreditů zdarma',
      'Platnost navždy'
    ]
  },
  // Šablony
  {
    id: 'tpl-maturita',
    title: 'Maturitní Master Pack',
    description: 'Kompletní sada předpřipravených AI promptů a šablon pro maturanty.',
    category: 'templates',
    price: 99,
    currency: 'Kč',
    features: [
      '50+ ověřených promptů pro rekapitulaci',
      'Šablony pro rozbory děl k ústní maturitě',
      'Trvalý přístup'
    ]
  },
  {
    id: 'tpl-research',
    title: 'Akademický průvodce psaním',
    description: 'Šablony pro rešerše, tvorbu citací a strukturování seminárek.',
    category: 'templates',
    price: 79,
    currency: 'Kč',
    features: [
      'Struktury pro seminární a bakalářské práce',
      'Prompt engineering návod pro rešerše',
      'Automatické generování osnov'
    ]
  }
];

export default function StoreModule() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'subscription' | 'credits' | 'templates'>('all');
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [userCredits, setUserCredits] = useState(250);
  const [userPlan, setUserPlan] = useState('Free Plan');
  const [showHistory, setShowHistory] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredItems = STORE_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleConfirmPurchase = () => {
    if (!selectedItem) return;

    setIsProcessing(true);

    setTimeout(() => {
      if (selectedItem.category === 'credits' && selectedItem.creditsValue) {
        setUserCredits((prev) => prev + selectedItem.creditsValue!);
        setSuccessMessage(`Byl vám připsán balíček ${selectedItem.creditsValue} kreditů!`);
      } else if (selectedItem.category === 'subscription') {
        setUserPlan(selectedItem.title);
        setUserCredits((prev) => prev + 2000);
        setSuccessMessage(`Plán ${selectedItem.title} byl úspěšně aktivován!`);
      } else {
        setSuccessMessage(`Položka "${selectedItem.title}" byla zakoupena.`);
      }

      setIsProcessing(false);
      setSelectedItem(null);

      setTimeout(() => setSuccessMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 text-slate-100">
      
      {/* HLAVIČKA A STAV ÚČTU */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <ShoppingBag className="w-7 h-7 text-indigo-400" />
            <span>Obchod & Předplatné</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Získejte neomezený přístup k AI funkci, doplňte kredity nebo odemkněte prémiové balíčky.
          </p>
        </div>

        {/* Zobrazovač stavu účtu */}
        <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 p-2.5 rounded-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800">
            <Crown className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Aktuální plán</div>
              <div className="text-xs font-bold text-white">{userPlan}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Zap className="w-4 h-4 text-indigo-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">AI Kredity</div>
              <div className="text-xs font-bold text-indigo-300">{userCredits} ks</div>
            </div>
          </div>
        </div>
      </div>

      {/* OZNÁMENÍ O ÚSPĚCHU */}
      {successMessage && (
        <div className="bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold shadow-lg">
          <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* KATEGORIE A TLAČÍTKO HISTORIE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'Všechny nabídky' },
            { id: 'subscription', label: 'Předplatné' },
            { id: 'credits', label: 'Kreditní balíčky' },
            { id: 'templates', label: 'Šablony' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors self-start sm:self-auto"
        >
          <History className="w-4 h-4" />
          <span>{showHistory ? 'Skrýt historii' : 'Historie plateb'}</span>
        </button>
      </div>

      {/* HISTORIE NÁKUPŮ */}
      {showHistory && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Historie transakcí</span>
          </h3>
          <div className="divide-y divide-slate-800/60 text-xs">
            <div className="py-3 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-200">Startovací kreditní balíček (500 ks)</div>
                <div className="text-[10px] text-slate-500">12. května 2026 • Zaplaceno kartou</div>
              </div>
              <span className="font-mono font-bold text-slate-300">49 Kč</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-200">Aktivace účtu</div>
                <div className="text-[10px] text-slate-500">1. dubna 2026 • Uvítací bonus</div>
              </div>
              <span className="font-mono font-bold text-emerald-400">Zdarma</span>
            </div>
          </div>
        </div>
      )}

      {/* SEZNAM NABÍDEK / PRODUKTŮ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-slate-900 border rounded-3xl p-6 flex flex-col justify-between relative transition-all duration-200 hover:scale-[1.01] ${
              item.popular 
                ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/40' 
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {item.badge && (
              <span className={`absolute -top-3 left-6 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${
                item.popular 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {item.badge}
              </span>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                {item.category === 'subscription' && <Crown className="w-5 h-5 text-amber-400" />}
                {item.category === 'credits' && <Zap className="w-5 h-5 text-indigo-400" />}
                {item.category === 'templates' && <FileText className="w-5 h-5 text-emerald-400" />}
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>

              <p className="text-xs text-slate-400 min-h-[36px] mb-4 leading-relaxed">
                {item.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">{item.price} {item.currency}</span>
                {item.period && <span className="text-xs text-slate-400"> / {item.period}</span>}
              </div>

              <div className="space-y-2.5 border-t border-slate-800/80 pt-4 mb-6">
                {item.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(item)}
              className={`w-full py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg ${
                item.popular
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
              }`}
            >
              <span>{item.category === 'subscription' ? 'Aktivovat předplatné' : 'Koupit ihned'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* BEZPEČNOSTNÍ INFORMACE */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-400 text-center sm:text-left">
        <ShieldCheck className="w-8 h-8 text-indigo-400 flex-shrink-0" />
        <div>
          <div className="font-bold text-white mb-0.5">Bezpečné a šifrované platby</div>
          <div>Všechny platby probíhají přes zabezpečenou platební bránu. Předplatné můžete kdykoliv jedním kliknutím zrušit.</div>
        </div>
      </div>

      {/* NÁKUPNÍ MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-400" />
                <span>Potvrzení objednávky</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Zkontrolujte shrnutí před dokončením platby.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-bold text-white">{selectedItem.title}</div>
                  <div className="text-xs text-slate-400">{selectedItem.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold text-white">{selectedItem.price} {selectedItem.currency}</div>
                  {selectedItem.period && <div className="text-[10px] text-slate-500">za {selectedItem.period}</div>}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 block">Platební metoda</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-slate-950 border border-indigo-500/50 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span>Karta online</span>
                </button>
                <button className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                  <Sparkles className="w-4 h-4" />
                  <span>Apple Pay</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 py-3 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-2xl text-xs font-bold border border-slate-800 transition-colors"
              >
                Zrušit
              </button>
              <button
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-extrabold transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Zpracovávám...' : `Zaplatit ${selectedItem.price} ${selectedItem.currency}`}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
      }
                
