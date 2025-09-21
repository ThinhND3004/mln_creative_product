import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
export function ResultSummary() {
    const nav = useNavigate();
    const { score, questions, reset } = useGameStore();
    const total = questions.length * 10; // base point chưa tính combo
    const replay = () => { reset(); nav("/"); };
    return (_jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-8 text-center space-y-3", children: [_jsx("h2", { className: "text-2xl font-bold", children: "K\u1EBFt qu\u1EA3" }), _jsxs("p", { className: "text-lg", children: ["\u0110i\u1EC3m: ", _jsx("b", { children: score }), " / ~", total, " (+combo)"] }), _jsx("button", { onClick: replay, className: "px-5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-violet-600 text-white", children: "Ch\u01A1i l\u1EA1i" })] }));
}
