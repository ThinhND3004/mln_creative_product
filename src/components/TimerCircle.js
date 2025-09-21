import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export function TimerCircle({ seconds, onTimeout, paused = false }) {
    const [time, setTime] = useState(seconds);
    useEffect(() => { setTime(seconds); }, [seconds]);
    useEffect(() => {
        if (paused)
            return; // ✅ dừng đếm khi pause
        if (time <= 0) {
            onTimeout();
            return;
        }
        const t = setTimeout(() => setTime((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [time, onTimeout, paused]);
    const radius = 18;
    const circ = 2 * Math.PI * radius;
    const progress = Math.max(0, (time / seconds) * circ);
    return (_jsxs("div", { className: "relative w-12 h-12", children: [_jsxs("svg", { className: "w-12 h-12", children: [_jsx("circle", { cx: "24", cy: "24", r: radius, stroke: "#ffffff55", strokeWidth: "4", fill: "none" }), _jsx("circle", { cx: "24", cy: "24", r: radius, stroke: "#ffffff", strokeWidth: "4", fill: "none", strokeDasharray: circ, strokeDashoffset: circ - progress, transform: "rotate(-90 24 24)" })] }), _jsx("span", { className: "absolute inset-0 flex items-center justify-center text-xs font-bold", children: time })] }));
}
