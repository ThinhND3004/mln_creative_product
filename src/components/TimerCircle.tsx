import { useEffect, useState } from "react";


export function TimerCircle({ seconds, onTimeout, paused = false }: { seconds: number; onTimeout: () => void; paused?: boolean }) {
const [time, setTime] = useState(seconds);
useEffect(() => { setTime(seconds); }, [seconds]);
useEffect(() => {
if (paused) return; // ✅ dừng đếm khi pause
if (time <= 0) { onTimeout(); return; }
const t = setTimeout(() => setTime((s) => s - 1), 1000);
return () => clearTimeout(t);
}, [time, onTimeout, paused]);


const radius = 18; const circ = 2 * Math.PI * radius;
const progress = Math.max(0, (time / seconds) * circ);


return (
<div className="relative w-12 h-12">
<svg className="w-12 h-12">
<circle cx="24" cy="24" r={radius} stroke="#ffffff55" strokeWidth="4" fill="none" />
<circle cx="24" cy="24" r={radius} stroke="#ffffff" strokeWidth="4" fill="none" strokeDasharray={circ} strokeDashoffset={circ - progress} transform="rotate(-90 24 24)" />
</svg>
<span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{time}</span>
</div>
);
}