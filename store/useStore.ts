import { create } from "zustand";
import { persist } from "middleware"; // nebo standardní import z "zustand/middleware"

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface AppState {
  activeModule: string;
  setActiveModule: (module: string) => void;
  
  credits: number;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => void;

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
      addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),
      deductCredits: (amount) => set((state) => ({ credits: Math.max(0, state.credits - amount) })),

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
