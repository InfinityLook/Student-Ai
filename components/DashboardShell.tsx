'use client';

import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  User, 
  LayoutGrid, 
  Zap, 
  Heart, 
  Settings, 
  Trophy, 
  Database,
  Sparkles
} from 'lucide-react';
import { AppProvider, useApp } from './AppContext';
import { WidgetProvider } from './WidgetContext';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorBoundary from './ErrorBoundary';
import WidgetCustomizerModal from './WidgetCustomizerModal';
import WorkspaceView from './WorkspaceView';

// Dynamický import ostatních modulů včetně Spatial Learning 3.0
const CalendarModule = lazy(() => import('./modules/CalendarModule'));
const AiSolverModule = lazy(() => import('./modules/AiSolverModule'));
const AiVisionModule = lazy(() => import('./modules/AiVisionModule'));
const MindMapModule = lazy(() => import('./modules/MindMapModule'));
const FocusTimerModule = lazy(() => import('./modules/FocusTimerModule'));
const NotesModule = lazy(() => import('./modules/NotesModule'));
const AITestModule = lazy(() => import('./modules/AITestModule'));
const FlashcardsModule = lazy(() => import('./modules/FlashcardsModule'));
const SettingsModule = lazy(() => import('./modules/SettingsModule'));
const AnalyticsModule = lazy(() => import('./modules/AnalyticsModule'));
const StudyPlanModule = lazy(() => import('./modules/StudyPlanModule'));
const ProfileModule = lazy(() => import('./modules/ProfileModule'));
const PetModule = lazy(() => import('./modules/PetModule'));
const LanguageModule = lazy(() => import('./modules/LanguageModule'));
const StorageModule = lazy(() => import('./modules/StorageModule'));
const RewardsModule = lazy(() => import('./modules/RewardsModule'));
const StoreModule = lazy(() => import('./modules/StoreModule'));
const SpatialLearningModule = lazy(() => import('./modules/SpatialLearningModule'));

function DashboardContent() {
  const [activeView, setActiveView] = useState('workspace');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const { userCredits, addCredits } = useApp();

  const navItems = [
    { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
    { id: 'pet', label: 'Mazlíček', icon: Heart },
    { id: 'rewards', label: 'Odměny', icon: Trophy },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'store', label: 'Obchod', icon: ShoppingBag },
    { id: 'storage', label: 'Úložiště', icon: Database },
    { id: 'settings', label: 'Nastavení', icon: Settings },
  ];

  const subViews = [
    'calendar', 'ai-solver', 'focus-timer', 'notes', 'ai-test', 
    'flashcards', 'analytics', 'study-plan', 'ai-vision', 'mind-map', 
    'profile', 'language', 'store', 'pet', 'rewards', 'storage', 'settings',
    'spatial-learning'
  ];

  const renderView = () => {
    return (
      <ErrorBoundary moduleName={activeView}>
        <Suspense fallback={<LoadingSkeleton />}>
          {(() => {
            switch (activeView) {
              case 'workspace':
                return <WorkspaceView setActiveView={setActiveView} openCustomizer={() => setIsCustomizerOpen(true)} />;
              case 'calendar': return <CalendarModule onBack={() => setActiveView('workspace')} />;
              case 'ai-solver': return <AiSolverModule onBack={() => setActiveView('workspace')} />;
              case 'ai-vision': return <AiVisionModule onBack={() => setActiveView('workspace')} />;
              case 'mind-map': return <MindMapModule onBack={() => setActiveView('workspace')} />;
              case 'focus-timer': return <FocusTimerModule onBack={() => setActiveView('workspace')} />;
              case 'notes': return <NotesModule onBack={() => setActiveView('workspace')} />;
              case 'ai-test': return <AITestModule onBack={() => setActiveView('workspace')} />;
              case 'flashcards': return <FlashcardsModule onBack={() => setActiveView('workspace')} />;
              case 'analytics': return <AnalyticsModule onBack={() => setActiveView('workspace')} />;
              case 'study-plan': return <StudyPlanModule onBack={() => setActiveView('workspace')} />;
              case 'settings': return <SettingsModule onBack={() => setActiveView('workspace')} />;
              case 'profile': return <ProfileModule onBack={() => setActiveView('workspace')} />;
              case 'pet': return <PetModule onBack={() => setActiveView('workspace')} />;
              case 'language': return <LanguageModule onBack={() => setActiveView('workspace')} onAddCredits={addCredits} />;
              case 'storage': return <StorageModule onBack={() => setActiveView('workspace')} />;
              case 'rewards': return <RewardsModule onBack={() => setActiveView('workspace')} credits={userCredits} onAddCredits={addCredits} />;
              case 'store': return <StoreModule onBack={() => setActiveView('workspace')} userCredits={userCredits} onAddCredits={addCredits} />;
              case 'spatial-learning': return <SpatialLearningModule onBack={() => setActiveView('workspace')} />;
              default: return null;
            }
          })()}
        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-sans overflow-x-hidden selection:bg-pink-500/30 pb-36">
      <header className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-[#07090E]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-black text-sm shadow-lg shadow-pink-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-black tracking-wider text-sm bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            STUDENT.AI
          </span>
        </div>
        <div onClick={() => setActiveView('store')} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all shadow-sm">
          <Zap className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>{userCredits} Kreditů</span>
        </div>
      </header>

      <main className="relative z-10 pt-28 px-4 md:px-8 max-w-5xl mx-auto min-h-[75vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-2 rounded-[28px] bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id || (subViews.includes(activeView) && item.id === 'workspace');
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`relative flex items-center justify-center p-3.5 rounded-2xl transition-all duration-300 ease-out group cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 scale-105' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>

      <WidgetCustomizerModal isOpen={isCustomizerOpen} onClose={() => setIsCustomizerOpen(false)} />
    </div>
  );
}

export default function DashboardShell() {
  return (
    <AppProvider>
      <WidgetProvider>
        <DashboardContent />
      </WidgetProvider>
    </AppProvider>
  );
}
