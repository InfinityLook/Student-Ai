'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WidgetConfig {
  id: string;
  title: string;
  enabled: boolean;
  size: 'small' | 'medium' | 'large' | 'full';
}

interface WidgetContextType {
  widgets: WidgetConfig[];
  toggleWidget: (id: string) => void;
  reorderWidgets: (newWidgets: WidgetConfig[]) => void;
  resetWidgets: () => void;
}

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: 'language', title: 'Cyber Jazykový Lektor', enabled: true, size: 'medium' },
  { id: 'mindmap', title: 'Myšlenkové Mapy', enabled: true, size: 'medium' },
  { id: 'solver', title: 'AI Řešitel Úloh', enabled: true, size: 'medium' },
  { id: 'timer', title: 'Focus Timer', enabled: true, size: 'medium' },
  { id: 'calendar', title: 'Studijní Kalendář', enabled: true, size: 'full' },
  { id: 'notes', title: 'Inteligentní Poznámky', enabled: true, size: 'medium' },
  { id: 'ai-test', title: 'AI Testy', enabled: true, size: 'medium' },
  { id: 'flashcards', title: 'Kartičky', enabled: true, size: 'medium' },
  { id: 'analytics', title: 'Analytika', enabled: true, size: 'medium' },
  { id: 'study-plan', title: 'Studijní Plán', enabled: true, size: 'medium' },
  { id: 'ai-vision', title: 'AI Vision Skener', enabled: true, size: 'medium' },
];

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('student_ai_widgets_order');
      if (saved) {
        try { 
          const parsed: WidgetConfig[] = JSON.parse(saved);
          // Zajištění, že nově přidané widgety nebudou chybět
          const parsedIds = new Set(parsed.map(w => w.id));
          const missing = DEFAULT_WIDGETS.filter(w => !parsedIds.has(w.id));
          return [...parsed, ...missing];
        } catch (e) { /* fallback */ }
      }
    }
    return DEFAULT_WIDGETS;
  });

  useEffect(() => {
    localStorage.setItem('student_ai_widgets_order', JSON.stringify(widgets));
  }, [widgets]);

  const toggleWidget = (id: string) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  const reorderWidgets = (newWidgets: WidgetConfig[]) => {
    setWidgets(newWidgets);
  };

  const resetWidgets = () => {
    setWidgets(DEFAULT_WIDGETS);
  };

  return (
    <WidgetContext.Provider value={{ widgets, toggleWidget, reorderWidgets, resetWidgets }}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidgets() {
  const context = useContext(WidgetContext);
  if (!context) throw new Error('useWidgets musí být použito uvnitř WidgetProvider');
  return context;
}
