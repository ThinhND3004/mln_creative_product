import { create } from "zustand";

export type Topic = "theory" | "examples" | "cases";
export type Mode = "classic" | "speedrun";

export type Question = {
  id: string;
  topic: Topic;
  stem: string;
  options: { id: string; text: string }[];
  answer: string; // id của đáp án đúng
  explanation: string;
  difficulty?: 1 | 2 | 3;
};

export type Settings = {
  mode: Mode;
  topic: Topic;
  totalTimePerQuestion: number; // giây/câu ở speedrun
  timed: boolean; // bật/tắt timer tổng quát
};

type GameState = {
  questions: Question[];
  current: number;
  score: number;
  streak: number;
  answered: boolean;
  lastCorrect: boolean | null;
  settings: Settings;
  loading: boolean;
  isPaused: boolean;
  

  setSettings: (s: Partial<Settings>) => void;
  loadQuestions: (topic: Topic) => Promise<void>;
  submitAnswer: (optionId: string) => void;
  next: () => void;
  reset: () => void;
  pause: () => void; // ✅ mới
    resume: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  questions: [],
  current: 0,
  score: 0,
  streak: 0,
  answered: false,
  lastCorrect: null,
  loading: false,
    isPaused: false,

  settings: {
    mode: "classic",
    topic: "theory",
    totalTimePerQuestion: 15,
    timed: true,
  },
  setSettings: (s) => set((st) => ({ settings: { ...st.settings, ...s } })),
  loadQuestions: async (topic) => {
    set({ loading: true });
    const map: Record<Topic, string> = {
      theory: "/src/data/theory.json",
      examples: "/src/data/examples.json",
      cases: "/src/data/cases.json",
    };
    // Vite sẽ import tĩnh tốt hơn: dùng dynamic import
    const data = await (topic === "theory"
      ? import("../data/theory.json")
      : topic === "examples"
      ? import("../data/examples.json")
      : import("../data/cases.json"));

    const questions: Question[] = (data.default || data) as any;
    // trộn ngẫu nhiên (Fisher–Yates)
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    set({ questions, current: 0, score: 0, streak: 0, answered: false, lastCorrect: null, loading: false });
  },
  submitAnswer: (optionId) => {
    const { questions, current, score, streak } = get();
    const q = questions[current];
    if (!q) return;
    const correct = q.answer === optionId;

    // Base score
    let delta = correct ? 10 : 0;

    // Combo bonus (giới hạn +10)
    const newStreak = correct ? streak + 1 : 0;
    if (correct) delta += Math.min(newStreak * 2, 10);

    set({
      score: score + delta,
      streak: newStreak,
      answered: true,
      lastCorrect: correct,
    });
  },
  next: () => set((st) => ({ current: st.current + 1, answered: false, lastCorrect: null })),
  reset: () => set({ questions: [], current: 0, score: 0, streak: 0, answered: false, lastCorrect: null }),
  pause: () => set({ isPaused: true }),
resume: () => set({ isPaused: false }),
}));