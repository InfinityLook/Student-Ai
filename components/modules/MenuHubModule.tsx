'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { 
  Bot, 
  Sparkles, 
  FileText, 
  BrainCircuit, 
  Timer, 
  Calendar, 
  Folder, 
  Edit3, 
  ShoppingBag, 
  User, 
  Search, 
  ArrowRight, 
  Compass,
  BookOpen,
  CheckSquare,
  Sliders,
  Dog,
  Settings,
  X,
  Zap,
  Coins
} from 'lucide-react';

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  accentColor: string;
  bgColor: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  modules: ModuleCard[];
}

const categories: Category[] = [
  {
    id: 'profile',
    title: 'Profil',
    description: 'Přehled tvého pokroku, statistik a studijních výsledků',
    icon: User,
    modules: [
      {
        id: 'profile',
        title: 'Můj Profil',
        description: 'Detailní statistiky studia, získané odznaky a dosažené úrovně.',
        icon: User,
        badge: 'Osobní',
        accentColor: 'text-indigo-400 border-indigo-500/30',
        bgColor: 'from-indigo-900/30 to-violet-900/20'
      }
    ]
  },
  {
    id: 'ai',
    title: 'AI Nástroje',
    description: 'Chytrá asistence pro vysvětlení látky a výpočty',
    icon: Bot,
    modules: [
      {
        id: 'kairo',
        title: 'Kairo AI',
        description: 'Osobní hlasový a textový studijní průvodce.',
        icon: Bot,
        badge: 'Hlasový asistent',
        accentColor: 'text-purple-400 border-purple-500/30',
        bgColor: 'from-purple-900/30 to-indigo-900/20'
      },
      {
        id: 'solver',
        title: 'AI Řešitel',
        description: 'Okamžité výpočty a kroková řešení úloh.',
        icon: Sparkles,
        badge: 'Výpočty',
        accentColor: 'text-cyan-400 border-cyan-500/30',
        bgColor: 'from-cyan-900/30 to-blue-900/20'
      }
    ]
  },
  {
    id: 'study',
    title: 'Studium',
    description: 'Pomůcky pro efektivní učení a psaní poznámek',
    icon: BookOpen,
    modules: [
      {
        id: 'flashcards',
        title: 'Kartičkový systém',
        description: 'Procvičování paměti s algoritmem Spaced Repetition.',
        icon: BrainCircuit,
        badge: 'Opakování',
        accentColor: 'text-emerald-400 border-emerald-500/30',
        bgColor: 'from-emerald-900/30 to-teal-900/20'
      },
      {
        id: 'notes',
        title: 'Poznámkový blok',
        description: 'Rychlé zápisky a strukturované výpisky.',
        icon: FileText,
        badge: 'Texty',
        accentColor: 'text-amber-400 border-amber-500/30',
        bgColor: 'from-amber-900/30 to-yellow-900/20'
      },
      {
        id: 'editor',
        title: 'Dokumentový Editor',
        description: 'Editor pro psaní referátů a rozsáhlých prací.',
        icon: Edit3,
        badge: 'Dokumenty',
        accentColor: 'text-blue-400 border-blue-500/30',
        bgColor: 'from-blue-900/30 to-sky-900/20'
      }
    ]
  },
  {
    id: 'organization',
    title: 'Organizace',
    description: 'Plánování času, úkolů a soustředěného učení',
    icon: CheckSquare,
    modules: [
      {
        id: 'planner',
        title: 'Plánovač Úkolů',
        description: 'Správa termínů, projektů a školních povinností.',
        icon: Calendar,
        badge: 'Termíny',
        accentColor: 'text-rose-400 border-rose-500/30',
        bgColor: 'from-rose-900/30 to-pink-900/20'
      },
      {
        id: 'timer',
        title: 'Focus Časovač',
        description: 'Pomodoro timer pro učení bez vyrušování.',
        icon: Timer,
        badge: 'Pomodoro',
        accentColor: 'text-orange-400 border-orange-500/30',
        bgColor: 'from-orange-900/30 to-amber-900/20'
      }
    ]
  },
  {
    id: 'management',
    title: 'Správa',
    description: 'Organizace souborů a podkladů ke studiu',
    icon: Sliders,
    modules: [
      {
        id: 'files',
        title: 'Správce Souborů',
        description: 'Přehledná struktura složek a učebních materiálů.',
        icon: Folder,
        badge: 'Ukládání',
        accentColor: 'text-slate-300 border-slate-500/30',
        bgColor: 'from-slate-800/50 to-zinc-800/40'
      }
    ]
  },
  {
    id: 'pets',
    title: 'Mazlíčci',
    description: 'Virtuální studijní společníci, o které pečuješ za učení',
    icon: Dog,
    modules: [
      {
        id: 'pets',
        title: 'Studijní Mazlíček',
        description: 'Staraj se o svého maskota za získané kredity a učení.',
        icon: Dog,
        badge: 'Novinka',
        accentColor: 'text-pink-400 border-pink-500/30',
        bgColor: 'from-pink-900/30 to-rose-900/20'
      }
    ]
  },
  {
    id: 'shop',
    title: 'Obchod',
    description: 'Nákup vylepšení, slotů a odměn za kredity',
    icon: ShoppingBag,
    modules: [
      {
        id: 'shop',
        title: 'Obchod & Odměny',
        description: 'Utrácej získané kredity za nové sloty a rozšíření.',
        icon: ShoppingBag,
        badge: 'Kredity',
        accentColor: 'text-yellow-400 border-yellow-500/30',
        bgColor: 'from-yellow-900/30 to-amber-900/20'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Nastavení',
    description: 'Přizpůsobení aplikace, hlasu a správa dat',
    icon: Settings,
    modules: [
      {
        id: 'settings',
        title: 'Nastavení Aplikace',
        description: 'Nastavení vzhledu, hlasové syntézy a zálohování dat.',
        icon: Settings,
        badge: 'Systém',
        accentColor: 'text-teal-400 border-teal-500/30',
        bgColor: 'from-teal-900/30 to-cyan-900/20'
      }
    ]
  }
];

export default function MenuHubModule() {
  const [search, setSearch] = useState('');
  const setActiveModule = useStore((state) => state.setActiveModule);
  const credits = useStore((state) => state.credits);

  // Filtrování modulů podle vyhledávání
  const filteredCategories = categories.map((cat) => ({
    ...cat,
    modules: cat.modules.filter(
      (m) =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase()) ||
        (m.badge && m.badge.toLowerCase().includes(search.toLowerCase()))
    )
  })).filter((cat) => cat.modules.length > 0);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Hlavička a Vyhledávání */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Compass className="w-7 h-7 text-cyan-400" />
            <span>Hlavní Rozcestník</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Přehledně roztříděné aplikace a nástroje pro tvé studium.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Vyhledávací pole */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Hledat v kategoriích..."
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-9 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-2 rounded-xl text-xs font-semibold border border-amber-500/20">
            <Coins className="w-4 h-4" />
            <span>{credits} K</span>
          </div>
        </div>
      </div>

      {/* Žádné výsledky */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-slate-800/40 border border-slate-800 rounded-2xl">
          <p className="text-slate-400 text-sm">Žádný modul neodpovídá výrazu "{search}".</p>
        </div>
      )}

      {/* Roztříděné Kategorie */}
      <div className="space-y-8">
        {filteredCategories.map((category) => {
          const CategoryIcon = category.icon;

          return (
            <section key={category.id} className="space-y-4">
              {/* Nadpis kategorie */}
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700/60">
                  <CategoryIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-white">{category.title}</h2>
                  <p className="text-xs text-slate-400">{category.description}</p>
                </div>
              </div>

              {/* Mřížka modulů */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.modules.map((module) => {
                  const ModuleIcon = module.icon;

                  return (
                    <div
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`group relative flex flex-col justify-between p-5 bg-gradient-to-br ${module.bgColor} border rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:border-slate-500/50`}
                    >
                      <div className="space-y-3">
                        {/* Horní řádek ikony a odznaku */}
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl bg-slate-900/80 border ${module.accentColor}`}>
                            <ModuleIcon className="w-6 h-6" />
                          </div>
                          {module.badge && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300">
                              {module.badge}
                            </span>
                          )}
                        </div>

                        {/* Název a popis */}
                        <div>
                          <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      {/* Tlačítko Otevřít */}
                      <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                        <span>Otevřít</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-cyan-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
          }
                          
