import { motion } from "framer-motion";

export function AnswerFeedback({ correct, explanation, onNext }: { correct: boolean; explanation: string; onNext: () => void }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`p-4 rounded-xl ${correct ? "bg-green-50 border border-green-200" : "bg-rose-50 border border-rose-200"}`}
    >
      <div className="font-semibold mb-1">{correct ? "Chính xác!" : "Chưa đúng"}</div>
      <p className="text-sm text-gray-700">{explanation}</p>
      <button onClick={onNext} className="mt-3 px-4 py-2 rounded-lg bg-gray-900 text-white">
        Câu tiếp theo →
      </button>
    </motion.div>
  );
}