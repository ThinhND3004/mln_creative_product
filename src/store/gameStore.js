import { create } from "zustand";
export const useGameStore = create((set, get) => ({
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
        const map = {
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
        const questions = (data.default || data);
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
        if (!q)
            return;
        const correct = q.answer === optionId;
        // Base score
        let delta = correct ? 10 : 0;
        // Combo bonus (giới hạn +10)
        const newStreak = correct ? streak + 1 : 0;
        if (correct)
            delta += Math.min(newStreak * 2, 10);
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
