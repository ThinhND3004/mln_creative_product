import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useGameStore } from "../store/gameStore";
export function GameHUD({ children }) {
    const { score, current, questions, isPaused, pause, resume } = useGameStore();
    const percent = questions.length ? Math.round((current / questions.length) * 100) : 0;
    return (_jsxs("div", { className: "flex items-center justify-between gap-3 p-3 rounded-xl text-white bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600", children: [_jsxs("div", { className: "font-semibold", children: ["\u0110i\u1EC3m: ", score] }), _jsx("div", { className: "flex-1 mx-4 h-2 bg-white/20 rounded", children: _jsx("div", { className: "h-2 bg-white/80 rounded", style: { width: `${percent}%` } }) }), _jsxs("div", { className: "text-sm whitespace-nowrap", children: [questions.length ? current + 1 : 0, "/", questions.length] }), children, _jsx("button", { onClick: () => (isPaused ? resume() : pause()), className: "px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30", children: isPaused ? "Tiếp tục" : "Tạm dừng" })] }));
}
