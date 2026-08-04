import { todayISO, addDays } from "@/lib/date";

export { todayISO };

export type ReviewQuality = "again" | "hard" | "good" | "easy";

const QUALITY_SCORE: Record<ReviewQuality, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

export interface SpacedRepetitionState {
  interval: number; // dny do dalšího opakování
  repetitions: number;
  easeFactor: number;
  dueDate: string; // ISO datum (YYYY-MM-DD)
}

export function createInitialSpacedRepetitionState(): SpacedRepetitionState {
  return {
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: todayISO(),
  };
}

export function scheduleNextReview(
  state: SpacedRepetitionState,
  quality: ReviewQuality
): SpacedRepetitionState {
  const q = QUALITY_SCORE[quality];

  let { repetitions } = state;
  let easeFactor = state.easeFactor;
  let interval: number;

  if (q < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(state.interval * easeFactor);
    }
    repetitions += 1;
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

  return {
    interval,
    repetitions,
    easeFactor: Math.round(easeFactor * 100) / 100,
    dueDate: addDays(todayISO(), interval),
  };
}
