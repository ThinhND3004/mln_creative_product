import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export function HomeHero() {
  const nav = useNavigate();
  const { settings, setSettings, loadQuestions } = useGameStore();

  const start = async () => {
    await loadQuestions(settings.topic);
    nav("/play");
  };

  return (
    <div className="max-w-3xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
        Quiz – Phép Biện Chứng Duy Vật
      </h1>
      <p className="text-gray-600">Chọn chủ đề & chế độ để bắt đầu. Bạn có thể bật/tắt đếm thời gian.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        {(["theory","examples","cases"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSettings({ topic: t })}
            className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition ${settings.topic===t?"bg-sky-50 border-sky-300":"bg-white"}`}
          >
            <h3 className="font-semibold capitalize">{t === "theory" ? "Lý thuyết" : t === "examples" ? "Ví dụ" : "Tình huống"}</h3>
            <p className="text-sm text-gray-500 mt-1">{t === "theory" ? "Định nghĩa & phạm trù" : t === "examples" ? "Minh hoạ đời sống" : "Khởi nghiệp – thất bại – tái khởi nghiệp"}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(["classic","speedrun"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setSettings({ mode: m })}
            className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition ${settings.mode===m?"bg-violet-50 border-violet-300":"bg-white"}`}
          >
            <h3 className="font-semibold">{m === "classic" ? "Classic (không countdown)" : "Speedrun (có countdown)"}</h3>
            <p className="text-sm text-gray-500 mt-1">{m === "classic" ? "Làm thoải mái, xem giải thích sau mỗi câu" : "Đếm ngược theo thời gian/câu, combo thưởng"}</p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={settings.timed} onChange={(e)=>setSettings({ timed: e.target.checked })} />
          <span>Đếm thời gian</span>
        </label>
        <label className="flex items-center gap-2">
          <span>Giây/câu:</span>
          <input type="number" min={5} max={60} value={settings.totalTimePerQuestion}
            onChange={(e)=>setSettings({ totalTimePerQuestion: Number(e.target.value) })}
            className="w-20 px-2 py-1 border rounded-lg" />
        </label>
      </div>

      <button onClick={start} className="px-6 py-3 rounded-2xl text-white shadow-md bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600 hover:shadow-lg">
        Bắt đầu chơi
      </button>
    </div>
  );
}