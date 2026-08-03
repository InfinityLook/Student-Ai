export const XP_PER_LEVEL = 100;
export const FOCUS_SESSION_REWARD = 15;

export interface LevelInfo {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progress: number; // 0–1
}

export function getLevelInfo(totalCreditsEarned: number): LevelInfo {
  const safeTotal = Math.max(0, totalCreditsEarned);
  const level = Math.floor(safeTotal / XP_PER_LEVEL) + 1;
  const xpIntoLevel = safeTotal % XP_PER_LEVEL;

  return {
    level,
    xpIntoLevel,
    xpForNextLevel: XP_PER_LEVEL,
    progress: xpIntoLevel / XP_PER_LEVEL,
  };
}
