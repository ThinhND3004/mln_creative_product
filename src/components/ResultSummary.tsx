import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export function ResultSummary() {
  const nav = useNavigate();
  const { score, questions, reset } = useGameStore();
  const total = questions.length * 10; // base point chưa tính combo

  const replay = () => { reset(); nav("/"); };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-3">
      <h2 className="text-2xl font-bold">Kết quả</h2>
      <p className="text-lg">Điểm: <b>{score}</b> / ~{total} (+combo)</p>
      <button onClick={replay} className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-violet-600 text-white">Chơi lại</button>
    </div>
  );
}