import type { ReactNode } from "react";
import { useGameStore } from "../store/gameStore";


export function GameHUD({ children }: { children?: ReactNode }) {
const { score, current, questions, isPaused, pause, resume } = useGameStore();
const percent = questions.length ? Math.round((current / questions.length) * 100) : 0;


return (
<div className="flex items-center justify-between gap-3 p-3 rounded-xl text-white bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600">
<div className="font-semibold">Điểm: {score}</div>
<div className="flex-1 mx-4 h-2 bg-white/20 rounded">
<div className="h-2 bg-white/80 rounded" style={{ width: `${percent}%` }} />
</div>
<div className="text-sm whitespace-nowrap">{questions.length ? current + 1 : 0}/{questions.length}</div>


{children}


<button onClick={() => (isPaused ? resume() : pause())} className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30">
{isPaused ? "Tiếp tục" : "Tạm dừng"}
</button>
</div>
);
}