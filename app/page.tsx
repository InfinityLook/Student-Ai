"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import MenuHubModule from "@/components/modules/MenuHubModule";
import ShopModule from "@/components/modules/ShopModule";
import ProfileModule from "@/components/modules/ProfileModule";
import NotesModule from "@/components/modules/NotesModule";
import TaskPlannerModule from "@/components/modules/TaskPlannerModule";
import FlashcardsModule from "@/components/modules/FlashcardsModule";
import FocusTimerModule from "@/components/modules/FocusTimerModule";
import FileSystemModule from "@/components/modules/FileSystemModule";
import AISolver from "@/components/modules/AISolver";
import AITestModule from "@/components/modules/AITestModule";
import DocumentEditorModule from "@/components/DocumentEditorModule";
import KairoChat from "@/components/kairo/KairoChat";

export default function Page() {
  const [activeModule, setActiveModule] = useState<string>("menu");
  const [isKairoOpen, setIsKairoOpen] = useState(false);

  return (
    <DashboardShell 
      activeModule={activeModule} 
      setActiveModule={setActiveModule}
      onOpenKairo={() => setIsKairoOpen(true)}
    >
      <div className="relative min-h-[calc(100vh-5rem)]">
        {renderActiveModule(activeModule, setActiveModule)}

        {isKairoOpen && (
          <KairoChat onClose={() => setIsKairoOpen(false)} />
        )}
      </div>
    </DashboardShell>
  );
}

function renderActiveModule(
  activeModule: string, 
  setActiveModule: (id: string) => void
) {
  switch (activeModule) {
    case "menu":
      return <MenuHubModule onSelectModule={(id) => setActiveModule(id)} />;
    case "shop":
      return <ShopModule />;
    case "profile":
      return <ProfileModule />;
    case "notes":
      return <NotesModule />;
    case "tasks":
      return <TaskPlannerModule />;
    case "flashcards":
      return <FlashcardsModule />;
    case "focus-timer":
      return <FocusTimerModule />;
    case "file-system":
      return <FileSystemModule />;
    case "ai-solver":
      return <AISolver />;
    case "ai-tests":
      return <AITestModule />;
    case "document-editor":
      return <DocumentEditorModule />;
    default:
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Modul nenalezen</h2>
          <p className="text-gray-400 mb-6">Požadovaný modul se nepodařilo načíst.</p>
          <button
            onClick={() => setActiveModule("menu")}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition cursor-pointer"
          >
            Zpět do menu
          </button>
        </div>
      );
  }
}
