import { create } from "zustand";
import { persist } from "zustand/middleware";
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

interface AppState {
  activeModule: string;
  setActiveModule: (module: string) => void;

  favorites: (string | null)[];
  setFavorite: (slot: number, moduleId: string | null) => void;

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

  notifications: Notification[];
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
  removeNotification: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      activeModule: "home",
      setActiveModule: (module) => set({ activeModule: module }),

      favorites: [null, null],
      setFavorite: (slot, moduleId) =>
        set((state) => {
          const next = [...state.favorites];
          next[slot] = moduleId;
          return { favorites: next };
        }),

      credits: 50, // Startovací kredity
      totalCreditsEarned: 50, // Používá se pro výpočet levelu (nikdy se neodečítá)
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
        {
          id: "2",
          question: "Co vyjadřuje derivace funkce?",
          answer: "Okamžitou změnu hodnoty funkce (směrnici tečny).",
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

      tasks: [
        { id: "1", title: "Domácí úkol z algebry", subject: "Matematika", dueDate: todayISO(), completed: false },
        {
          id: "2",
          title: "Dokončit projekt do Programování",
          subject: "Programování",
          dueDate: addDays(todayISO(), 1),
          completed: false,
        },
        {
          id: "3",
          title: "Přečíst kapitolu 4",
          subject: "Literatura",
          dueDate: addDays(todayISO(), 5),
          completed: true,
        },
      ],
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
        const state = useStore.getState();
        const today = todayISO();

        if (state.lastReminderCheckDate === today) return;

        const overdue = state.tasks.filter((t) => !t.completed && t.dueDate && t.dueDate < today);
        const dueToday = state.tasks.filter((t) => !t.completed && t.dueDate === today);

        overdue.forEach((t) => {
          state.addNotification(`⏰ Po termínu: "${t.title}"`, "error");
        });

        dueToday.forEach((t) => {
          state.addNotification(`📌 Dnes je termín: "${t.title}"`, "info");
        });

        set({ lastReminderCheckDate: today });
      },

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
    }
  )
);
      
