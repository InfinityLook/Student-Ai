"use client";
import React, { useState } from "react";
import MenuHubModule from "@/components/modules/MenuHubModule";
import DocumentEditorModule from "@/components/DocumentEditorModule";
import NotesModule from "@/components/modules/NotesModule";
import TaskPlannerModule from "@/components/modules/TaskPlannerModule";
import FlashcardsModule from "@/components/modules/FlashcardsModule";
import AISolver from "@/components/modules/AISolver";
import AITestModule from "@/components/modules/AITestModule";
import FocusTimerModule from "@/components/modules/FocusTimerModule";
import FileSystemModule from "@/components/modules/FileSystemModule";

export default function DashboardShell() {
  const [activeModule, setActiveModule] = useState<string>("menu-hub");

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col">
      {/* Navigační lišta */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModule("menu-hub")}
            className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            🎓 Student AI
          </button>
        </div>
        {activeModule !== "menu-hub" && (
          <button
            onClick={() => setActiveModule("menu-hub")}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
          >
            <span>←</span> Zpět do menu
          </button>
        )}
      </header>

      {/* Hlavní obsah */}
      <main className="flex-1 p-4 md:p-8">
        {activeModule === "menu-hub" && (
          <MenuHubModule onSelectModule={(id) => setActiveModule(id)} />
        )}
        
        {activeModule === "document-editor" && <DocumentEditorModule />}
        {activeModule === "notes" && <NotesModule />}
        {activeModule === "tasks" && <TaskPlannerModule />}
        {activeModule === "flashcards" && <FlashcardsModule />}
        {activeModule === "ai-solver" && <AISolver />}
        {activeModule === "ai-tests" && <AITestModule />}
        {activeModule === "focus-timer" && <FocusTimerModule />}
        {activeModule === "file-system" && <FileSystemModule />}
      </main>
    </div>
  );
}
