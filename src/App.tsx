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
return (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
<div className="bg-white rounded-2xl p-6 w-[min(92vw,480px)] text-center space-y-4 shadow-2xl">
<h3 className="text-xl font-bold">Đang tạm dừng</h3>
<p className="text-gray-600">Bạn có thể tiếp tục hoặc dừng trò chơi bất cứ lúc nào.</p>
<div className="flex items-center justify-center gap-3">
<button onClick={() => resume()} className="px-4 py-2 rounded-xl bg-gray-900 text-white">Tiếp tục</button>
<button onClick={() => { reset(); nav("/"); }} className="px-4 py-2 rounded-xl bg-rose-600 text-white">Dừng & về trang chủ</button>
</div>
</div>
</div>
);
}


function PlayScreen() {
const { questions, current, settings, isPaused, pause, resume } = useGameStore();
const [key, setKey] = useState(0);
useEffect(() => { setKey((k) => k + 1); }, [current, settings.totalTimePerQuestion]);


// Phím Space: Pause/Resume
useEffect(() => {
const onKey = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); isPaused ? resume() : pause(); } };
window.addEventListener("keydown", onKey);
return () => window.removeEventListener("keydown", onKey);
}, [isPaused, pause, resume]);


const handleTimeout = () => {
const { answered, submitAnswer, next, isPaused: pausedNow } = useGameStore.getState();
if (pausedNow) return; // đang pause thì bỏ qua timeout
if (!answered) submitAnswer("__timeout__");
setTimeout(next, 400);
};


const isEnd = current >= questions.length;
return (
<div className="space-y-6 w-full max-w-3xl mx-auto relative">
{!isEnd && (
<GameHUD>
{settings.mode === "speedrun" && settings.timed && (
<TimerCircle key={key} seconds={settings.totalTimePerQuestion} onTimeout={handleTimeout} paused={isPaused} />
)}
</GameHUD>
)}


{!isEnd ? <QuestionCard /> : <ResultSummary />}
{isPaused && <PauseOverlay />}
</div>
);
}


export default function App() {
  return (
    <div className="min-h-screen text-gray-800 
      bg-gradient-to-br from-pink-300 via-sky-200 via-emerald-200 to-violet-300 
      animate-gradient-x
      py-10 px-4">
      <Routes>
        <Route path="/" element={<HomeHero />} />
        <Route path="/play" element={<PlayScreen />} />
      </Routes>
    </div>
  );
}

