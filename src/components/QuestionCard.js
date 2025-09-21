import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { AnswerFeedback } from "./AnswerFeedback";
export function QuestionCard() {
    const { questions, current, submitAnswer, answered, lastCorrect, next } = useGameStore();
    const q = questions[current];
    if (!q)
        return null;
    const onChoose = (id) => {
        if (!answered)
            submitAnswer(id);
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 }, className: "bg-white rounded-2xl shadow-xl p-6 space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: q.stem }), _jsx("div", { className: "grid gap-2", children: q.options.map((opt) => (_jsx("button", { onClick: () => onChoose(opt.id), disabled: answered, className: `text-left px-4 py-3 rounded-xl border transition shadow-sm hover:shadow ${answered ? "opacity-80" : "bg-sky-50 hover:bg-sky-100"}`, children: opt.text }, opt.id))) }), answered && lastCorrect !== null && (_jsx(AnswerFeedback, { correct: lastCorrect, explanation: q.explanation, onNext: next }))] }, q.id));
}
