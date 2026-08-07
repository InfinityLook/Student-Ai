import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FOCUS_SESSION_REWARD, FLASHCARD_REVIEW_REWARD } from "@/lib/gamification";
import {
  ReviewQuality,
  createInitialSpacedRepetitionState,
  scheduleNextReview,
} from "@/lib/spacedRepetition";
import { todayISO, addDays } from "@/lib/date";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  dueDate: string;
}

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string | null;
  completed: boolean;
}

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  parentId: string | null;
}

interface AppState {
  activeModule: string;
  setActiveModule: (module: string) => void;

  // Plocha 3x5 (15 slotů)
  plochaSlots: (string | null)[];
  unlockedPlochaSlots: number[];
  unlockPlochaSlot: (slotIndex: number) => boolean;
  setPlochaSlot: (slotIndex: number, moduleId: string | null) => void;

  credits: number;
  totalCreditsEarned: number;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => void;

  focusSessionsCompleted: number;
  completeFocusSession: () => void;

  flashcards: Flashcard[];
  addFlashcard: (question: string, answer: string) => void;
  reviewFlashcard: (id: string, quality: ReviewQuality) => void;

  tasks: Task[];
  addTask: (title: string, subject: string, dueDate: string | null) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  lastReminderCheckDate: string | null;
  checkTaskReminders: () => void;

  files: FileItem[];
  addFileItem: (name: string, type: "folder" | "file", parentId: string | null) => void;
  deleteFileItem: (id: string) => void;
  renameFileItem: (id: string, name: string) => void;

  notifications: Notification[];
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
  removeNotification: (id: string) => void;
}

// Výpočet ceny okénka na Ploše (0-8 zdarma, 9 = 50, 10 = 100, 11 = 150...)
export const getPlochaSlotCost = (index: number): number => {
  if (index < 9) return 0;
  return (index - 8) * 50;
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeModule: "home",
      setActiveModule: (module) => set({ activeModule: module }),

      // Prvních 9 políček (3 řady) je odemčených v základu
      unlockedPlochaSlots: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      plochaSlots: Array(15).fill(null),

      unlockPlochaSlot: (slotIndex) => {
        const state = get();
        const cost = getPlochaSlotCost(slotIndex);

        if (state.credits < cost) {
          state.addNotification(`Nedostatek kreditů! Potřebuješ ${cost} kreditů.`, "error");
          return false;
        }

        set({
          credits: state.credits - cost,
          unlockedPlochaSlots: [...state.unlockedPlochaSlots, slotIndex],
        });
        state.addNotification(`Políčko ${slotIndex + 1} bylo odemčeno!`, "success");
        return true;
      },

      setPlochaSlot: (slotIndex, moduleId) =>
        set((state) => {
          const nextSlots = [...state.plochaSlots];
          nextSlots[slotIndex] = moduleId;
          return { plochaSlots: nextSlots };
        }),

      credits: 100,
      totalCreditsEarned: 100,
      addCredits: (amount) =>
        set((state) => ({
          credits: state.credits + amount,
          totalCreditsEarned: state.totalCreditsEarned + amount,
        })),
      deductCredits: (amount) => set((state) => ({ credits: Math.max(0, state.credits - amount) })),

      focusSessionsCompleted: 0,
      completeFocusSession: () =>
        set((state) => ({
          focusSessionsCompleted: state.focusSessionsCompleted + 1,
          credits: state.credits + FOCUS_SESSION_REWARD,
          totalCreditsEarned: state.totalCreditsEarned + FOCUS_SESSION_REWARD,
        })),

      flashcards: [
        {
          id: "1",
          question: "Co je to rekurze v programování?",
          answer: "Funkce, která volá sama sebe.",
          ...createInitialSpacedRepetitionState(),
        },
      ],
      addFlashcard: (question, answer) =>
        set((state) => ({
          flashcards: [
            ...state.flashcards,
            {
              id: Math.random().toString(36).substring(2, 9),
              question,
              answer,
              ...createInitialSpacedRepetitionState(),
            },
          ],
        })),
      reviewFlashcard: (id, quality) =>
        set((state) => ({
          flashcards: state.flashcards.map((card) =>
            card.id === id ? { ...card, ...scheduleNextReview(card, quality) } : card
          ),
          credits: state.credits + FLASHCARD_REVIEW_REWARD,
          totalCreditsEarned: state.totalCreditsEarned + FLASHCARD_REVIEW_REWARD,
        })),

      tasks: [],
      addTask: (title, subject, dueDate) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Math.random().toString(36).substring(2, 9),
              title,
              subject,
              dueDate,
              completed: false,
            },
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      lastReminderCheckDate: null,
      checkTaskReminders: () => {
        const state = get();
        const today = todayISO();
        if (state.lastReminderCheckDate === today) return;
        set({ lastReminderCheckDate: today });
      },

      files: [],
      addFileItem: (name, type, parentId) =>
        set((state) => ({
          files: [...state.files, { id: Math.random().toString(36).substring(2, 9), name, type, parentId }],
        })),
      deleteFileItem: (id) =>
        set((state) => ({ files: state.files.filter((item) => item.id !== id) })),
      renameFileItem: (id, name) =>
        set((state) => ({
          files: state.files.map((item) => (item.id === id ? { ...item, name } : item)),
        })),

      notifications: [],
      addNotification: (message, type = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
          notifications: [...state.notifications, { id, message, type }],
        }));
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }));
        }, 4000);
      },
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: "school-ide-storage",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const { notifications, ...rest } = state;
        return rest;
      },
    }
  )
);
        
