import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export function AnswerFeedback({ correct, explanation, onNext }) {
    return (_jsxs(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: `p-4 rounded-xl ${correct ? "bg-green-50 border border-green-200" : "bg-rose-50 border border-rose-200"}`, children: [_jsx("div", { className: "font-semibold mb-1", children: correct ? "Chính xác!" : "Chưa đúng" }), _jsx("p", { className: "text-sm text-gray-700", children: explanation }), _jsx("button", { onClick: onNext, className: "mt-3 px-4 py-2 rounded-lg bg-gray-900 text-white", children: "C\u00E2u ti\u1EBFp theo \u2192" })] }));
}
