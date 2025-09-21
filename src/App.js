import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGameStore } from "./store/gameStore";
import { GameHUD } from "./components/GameHUD";
import { TimerCircle } from "./components/TimerCircle";
import { QuestionCard } from "./components/QuestionCard";
import { ResultSummary } from "./components/ResultSummary";
import { HomeHero } from "./components/HomeHero";
function PauseOverlay() {
    const nav = useNavigate();
    const { resume, reset } = useGameStore();
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-2xl p-6 w-[min(92vw,480px)] text-center space-y-4 shadow-2xl", children: [_jsx("h3", { className: "text-xl font-bold", children: "\u0110ang t\u1EA1m d\u1EEBng" }), _jsx("p", { className: "text-gray-600", children: "B\u1EA1n c\u00F3 th\u1EC3 ti\u1EBFp t\u1EE5c ho\u1EB7c d\u1EEBng tr\u00F2 ch\u01A1i b\u1EA5t c\u1EE9 l\u00FAc n\u00E0o." }), _jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsx("button", { onClick: () => resume(), className: "px-4 py-2 rounded-xl bg-gray-900 text-white", children: "Ti\u1EBFp t\u1EE5c" }), _jsx("button", { onClick: () => { reset(); nav("/"); }, className: "px-4 py-2 rounded-xl bg-rose-600 text-white", children: "D\u1EEBng & v\u1EC1 trang ch\u1EE7" })] })] }) }));
}
function PlayScreen() {
    const { questions, current, settings, isPaused, pause, resume } = useGameStore();
    const [key, setKey] = useState(0);
    useEffect(() => { setKey((k) => k + 1); }, [current, settings.totalTimePerQuestion]);
    // Phím Space: Pause/Resume
    useEffect(() => {
        const onKey = (e) => { if (e.code === "Space") {
            e.preventDefault();
            isPaused ? resume() : pause();
        } };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isPaused, pause, resume]);
    const handleTimeout = () => {
        const { answered, submitAnswer, next, isPaused: pausedNow } = useGameStore.getState();
        if (pausedNow)
            return; // đang pause thì bỏ qua timeout
        if (!answered)
            submitAnswer("__timeout__");
        setTimeout(next, 400);
    };
    const isEnd = current >= questions.length;
    return (_jsxs("div", { className: "space-y-6 w-full max-w-3xl mx-auto relative", children: [!isEnd && (_jsx(GameHUD, { children: settings.mode === "speedrun" && settings.timed && (_jsx(TimerCircle, { seconds: settings.totalTimePerQuestion, onTimeout: handleTimeout, paused: isPaused }, key)) })), !isEnd ? _jsx(QuestionCard, {}) : _jsx(ResultSummary, {}), isPaused && _jsx(PauseOverlay, {})] }));
}
export default function App() {
    return (_jsx("div", { className: "min-h-screen text-gray-800 \n      bg-gradient-to-br from-pink-300 via-sky-200 via-emerald-200 to-violet-300 \n      animate-gradient-x\n      py-10 px-4", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomeHero, {}) }), _jsx(Route, { path: "/play", element: _jsx(PlayScreen, {}) })] }) }));
}
