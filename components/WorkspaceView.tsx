'use client';

import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  CalendarDays, 
  Bot, 
  GitBranch, 
  Timer, 
  FileText, 
  BrainCircuit, 
  Layers, 
  BarChart3, 
  Camera, 
  ArrowRight,
  Flame,
  SlidersHorizontal,
  GripVertical,
  Plus,
  X,
  Search,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from './AppContext';
import { useWidgets, WidgetConfig } from './WidgetContext';
import LevelBadge from './LevelBadge';

interface WorkspaceViewProps {
  setActiveView: (v: string) => void;
  openCustomizer: () => void;
}

export default function WorkspaceView({ setActiveView, openCustomizer }: WorkspaceViewProps) {
  const { streak, level, xp } = useApp();
  const { widgets, toggleWidget, reorderWidgets, resetWidgets } = useWidgets();
  const [moduleSearch, setModuleSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'productivity' | 'study'>('all');

  const activeWidgets = widgets.filter(w => w.enabled);

  function renderWidgetContent(widgetId: string) {
    switch (widgetId) {
      case 'language':
        return { title: 'Cyber Jazykový Lektor', desc: 'Trénuj konverzaci a výslovnost s AI společníkem.', icon: Bot, color: 'text-cyan-400', category: 'ai' };
      case 'mindmap':
        return { title: 'Myšlenkové Mapy', desc: 'Vizuální propojování konceptů a uzlů.', icon: GitBranch, color: 'text-indigo-400', category: 'study' };
      case 'solver':
        return { title: 'AI Řešitel Úloh', desc: 'Zasekl ses na příkladu? Nech si ho vysvětlit.', icon: Calculator, color: 'text-cyan-400', category: 'ai' };
      case 'timer':
        return { title: 'Focus Timer', desc: 'Pomodoro časomíra pro soustředěné učení.', icon: Timer, color: 'text-purple-400', category: 'productivity' };
      case 'calendar':
        return { title: 'Studijní Kalendář', desc: 'Přehled termínů zkoušek, odevzdávek a studijních bloků.', icon: CalendarDays, color: 'text-pink-400', category: 'productivity' };
      case 'notes':
        return { title: 'Inteligentní Poznámky', desc: 'Rychlé poznámky a strukturované taháky.', icon: FileText, color: 'text-amber-400', category: 'study' };
      case 'ai-test':
        return { title: 'AI Testy', desc: 'Generuj kvízy a zkoušej své znalosti interaktivně.', icon: BrainCircuit, color: 'text-emerald-400', category: 'ai' };
      case 'flashcards':
        return { title: 'Kartičky', desc: 'Efektivní zapamatování pomocí opakovacích kartiček.', icon: Layers, color: 'text-blue-400', category: 'study' };
      case 'analytics':
        return { title: 'Analytika', desc: 'Statistiky produktivity a odpracovaného času.', icon: BarChart3, color: 'text-violet-400', category: 'productivity' };
      case 'study-plan':
        return { title: 'Studijní Plánovač', desc: 'Generování studijních plánů pomocí umělé inteligence.', icon: CalendarDays, color: 'text-rose-400', category: 'productivity' };
      case 'ai-vision':
        return { title: 'AI Skener (Vision)', desc: 'Vyfoť stránku z učebnice a nech si ji rozebrat.', icon: Camera, color: 'text-teal-400', category: 'ai' };
      default:
        return { title: 'Modul', desc: 'Doplňkový studijní nástroj', icon: SlidersHorizontal, color: 'text-slate-400', category: 'study' };
    }
  }

  const inactiveWidgets = widgets.filter(w => {
    if (w.enabled) return false;
    const info = renderWidgetContent(w.id);
    const matchesSearch = w.id.toLowerCase().includes(moduleSearch.toLowerCase()) || 
                          info.title.toLowerCase().includes(moduleSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || info.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 inline-flex items-center gap-1.5 mb-3">
            <Flame className="w-3.5 h-3.5 text-pink-400" /> {streak} denní streak! 🔥
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Studijní <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Workspace</span> ⚡
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <button
            onClick={resetWidgets}
            title="Obnovit výchozí rozvržení"
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={openCustomizer}
            className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-pink-400" /> Upravit plochu
          </button>
          <div className="w-full md:w-72">
            <LevelBadge level={level} currentXp={xp} maxXp={100} />
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 italic">
        💡 Tip: Widgety přetahuj za úchyt vpravo nahoře. Křížkem kartu schováš, kliknutím na <span className="text-pink-400 font-bold">+</span> dole si ji zase přidáš.
      </p>

      {/* Aktivní přetahovatelné widgety */}
      <Reorder.Group 
        axis="y" 
        values={activeWidgets} 
        onReorder={(newOrder) => {
          const hiddenWidgets = widgets.filter(w => !w.enabled);
          reorderWidgets([...newOrder, ...hiddenWidgets]);
        }}
        className="space-y-4"
      >
        <AnimatePresence>
          {activeWidgets.map((widget) => {
            const info = renderWidgetContent(widget.id);
            const Icon = info.icon;
            return (
              <Reorder.Item 
                key={widget.id} 
                value={widget}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-7 hover:border-white/25 transition-all shadow-lg cursor-grab active:cursor-grabbing flex flex-col justify-between"
              >
                {/* Ovládací prvky v rohu */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWidget(widget.id);
                    }}
                    title="Schovat z plochy"
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="p-2 text-slate-400 hover:text-white cursor-grab">
                    <GripVertical className="w-5 h-5" />
                  </div>
                </div>

                <div onClick={() => setActiveView(widget.id)} className="cursor-pointer pr-16">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-2xl bg-white/5 ${info.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
                      {info.category === 'ai' ? '🤖 AI Nástroj' : info.category === 'productivity' ? '⚡ Produktivita' : '📚 Učení'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{info.title}</h3>
                  <p className="text-sm text-slate-400">{info.desc}</p>
                  <div className={`mt-6 flex items-center gap-2 text-xs font-bold ${info.color}`}>
                    <span>Otevřít modul</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>

      {/* Sekce s dostupnými moduly k přidání */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" /> Dostupní parťáci a moduly
            </h3>
            <p className="text-xs text-slate-400">Kliknutím na plusko si modul okamžitě připneš na hlavní plochu.</p>
          </div>
          
          {/* Vyhledávací pole */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Hledat modul..."
              value={moduleSearch}
              onChange={(e) => setModuleSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500/50 transition"
            />
          </div>
        </div>

        {/* Filtry kategorií */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Všechny moduly' },
            { id: 'ai', label: '🤖 AI Nástroje' },
            { id: 'productivity', label: '⚡ Produktivita' },
            { id: 'study', label: '📚 Učení & Znalosti' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {inactiveWidgets.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-white/10 p-8 text-center bg-white/[0.01]">
            <p className="text-xs text-slate-500 italic">Žádné moduly neodpovídají zadanému filtru nebo jsou již všechny připnuté na ploše.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inactiveWidgets.map((widget) => {
              const info = renderWidgetContent(widget.id);
              const Icon = info.icon;
              return (
                <div
                  key={widget.id}
                  onClick={() => toggleWidget(widget.id)}
                  className="group relative rounded-[28px] border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-pink-500/50 p-6 transition-all cursor-pointer flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-white/5 text-slate-400 group-hover:text-pink-400 group-hover:bg-pink-500/10 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-white group-hover:text-pink-400 transition">{info.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{info.desc}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-pink-500 group-hover:text-white text-slate-400 transition shadow-md">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
                             }
