import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FOCUS_SESSION_REWARD, FLASHCARD_REVIEW_REWARD } from "@/lib/gamification";
import {
  ReviewQuality,
  createInitialSpacedRepetitionState,
  scheduleNextReview,
} from "@/lib/spacedRepetition";

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

interface AppState {
  activeModule: string;
  setActiveModule: (module: string) => void;

  credits: number;
  totalCreditsEarned: number;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => void;

  focusSessionsCompleted: number;
  completeFocusSession: () => void;

  flashcards: Flashcard[];
  addFlashcard: (question: string, answer: string) => void;
  reviewFlashcard: (id: string, quality: ReviewQuality) => void;

  notifications: Notification[];
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
  removeNotification: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      activeModule: "profile",
      setActiveModule: (module) => set({ activeModule: module }),

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
