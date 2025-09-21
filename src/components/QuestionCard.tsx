import { motion } from "framer-motion";
import { useGameStore } from "../store/gameStore";
import { AnswerFeedback } from "./AnswerFeedback";

export  function QuestionCard({ timeUp }: { timeUp?: () => void }) {
  const { questions, current, submitAnswer, answered, lastCorrect, next } = useGameStore();
  const q = questions[current];
  if (!q) return null;

  const onChoose = (id: string) => {
    if (!answered) submitAnswer(id);
  };

  return (
    <motion.div key={q.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold">{q.stem}</h2>
      <div className="grid gap-2">
        {q.options.map((opt) => (
          <button key={opt.id} onClick={() => onChoose(opt.id)} disabled={answered}
            className={`text-left px-4 py-3 rounded-xl border transition shadow-sm hover:shadow ${answered ? "opacity-80" : "bg-sky-50 hover:bg-sky-100"}`}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {answered && lastCorrect !== null && (
        <AnswerFeedback correct={lastCorrect} explanation={q.explanation} onNext={next} />
      )}
    </motion.div>
  );
}