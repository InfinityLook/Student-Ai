'use client';

import React from 'react';
import { motion, Reorder } from 'framer-motion';
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
  GripVertical
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
  const { widgets, reorderWidgets } = useWidgets();

  const activeWidgets = widgets.filter(w => w.enabled);

  const renderWidgetContent = (widget: WidgetConfig) => {
    switch (widget.id) {
      case 'language':
        return (
          <>
            <Bot className="w-9 h-9 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">Cyber Jazykový Lektor</h3>
            <p className="text-sm text-slate-400">Trénuj konverzaci a výslovnost s AI společníkem.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-400"><span>Spustit lektora</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'mindmap':
        return (
          <>
            <GitBranch className="w-9 h-9 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">Myšlenkové Mapy</h3>
            <p className="text-sm text-slate-400">Vizuální propojování konceptů a uzlů.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-400"><span>Otevřít mapy</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'solver':
        return (
          <>
            <Calculator className="w-9 h-9 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">AI Řešitel Úloh</h3>
            <p className="text-sm text-slate-400">Zasekl ses na příkladu? Nech si ho vysvětlit.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-400"><span>Spustit řešitel</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'timer':
        return (
          <>
            <Timer className="w-9 h-9 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">Focus Timer</h3>
            <p className="text-sm text-slate-400">Pomodoro časomíra pro soustředěné učení.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-purple-400"><span>Spustit timer</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'calendar':
        return (
          <>
            <CalendarDays className="w-9 h-9 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">Studijní Kalendář</h3>
            <p className="text-sm text-slate-400">Přehled termínů zkoušek, odevzdávek a studijních bloků.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-pink-400"><span>Otevřít kalendář</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'notes':
        return (
          <>
            <FileText className="w-9 h-9 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">Inteligentní Poznámky</h3>
            <p className="text-sm text-slate-400">Rychlé poznámky a strukturované taháky.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-amber-400"><span>Otevřít poznámky</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'ai-test':
        return (
          <>
            <BrainCircuit className="w-9 h-9 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">AI Testy</h3>
            <p className="text-sm text-slate-400">Generuj kvízy a zkoušej své znalosti interaktivně.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-400"><span>Spustit testy</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'flashcards':
        return (
          <>
            <Layers className="w-9 h-9 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">Kartičky</h3>
            <p className="text-sm text-slate-400">Efektivní zapamatování pomocí opakovacích kartiček.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-400"><span>Procházet kartičky</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'analytics':
        return (
          <>
            <BarChart3 className="w-9 h-9 text-violet-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">Analytika</h3>
            <p className="text-sm text-slate-400">Statistiky produktivity a odpracovaného času.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-violet-400"><span>Zobrazit statistiky</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'study-plan':
        return (
          <>
            <CalendarDays className="w-9 h-9 text-rose-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">Studijní Plánovač</h3>
            <p className="text-sm text-slate-400">Generování studijních plánů pomocí umělé inteligence.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-rose-400"><span>Otevřít plánovač</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      case 'ai-vision':
        return (
          <>
            <Camera className="w-9 h-9 text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">AI Skener (Vision)</h3>
            <p className="text-sm text-slate-400">Vyfoť stránku z učebnice a nech si ji rozebrat.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-teal-400"><span>Spustit skener</span><ArrowRight className="w-4 h-4" /></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 inline-flex items-center gap-1.5 mb-3">
            <Flame className="w-3.5 h-3.5 text-pink-400" /> {streak} denní streak! 🔥
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Studijní <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Workspace</span> ⚡
          </h1>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
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
        💡 Tip: Widgety můžeš chytnout za ikonu úchytu a přetahováním změnit jejich pořadí na ploše.
      </p>

      {/* Reorder Group pro plynulý Drag-and-Drop */}
      <Reorder.Group 
        axis="y" 
        values={activeWidgets} 
        onReorder={(newOrder) => {
          // Zrekonstruujeme kompletní pole widgetů (včetně skrytých)
          const hiddenWidgets = widgets.filter(w => !w.enabled);
          reorderWidgets([...newOrder, ...hiddenWidgets]);
        }}
        className="space-y-4"
      >
        {activeWidgets.map((widget) => (
          <Reorder.Item 
            key={widget.id} 
            value={widget}
            className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 p-7 hover:border-white/25 transition-all shadow-lg cursor-grab active:cursor-grabbing flex flex-col justify-between"
          >
            {/* Drag Handle & Click Area */}
            <div className="absolute top-4 right-4 z-20 opacity-40 group-hover:opacity-100 transition p-2 text-slate-400 hover:text-white cursor-grab">
              <GripVertical className="w-5 h-5" />
            </div>

            <div onClick={() => setActiveView(widget.id)} className="cursor-pointer pr-10">
              {renderWidgetContent(widget)}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
