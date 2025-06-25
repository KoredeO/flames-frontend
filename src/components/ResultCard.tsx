import React from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { FlamesResult } from "../types/flames";

interface ResultCardProps {
  result: FlamesResult;
  onShare: () => void;
}

const getResultEmoji = (result: string) => {
  const emojiMap: Record<string, string> = {
    Friends: "👫",
    Lovers: "❤️",
    Affectionate: "🥰",
    Marriage: "💍",
    Enemies: "😤",
    Siblings: "👭",
  };
  return emojiMap[result] || "❤️";
};

const getResultColor = (result: string) => {
  const colorMap: Record<string, string> = {
    Friends: "from-blue-400 to-cyan-500",
    Lovers: "from-red-400 to-pink-500",
    Affectionate: "from-pink-400 to-rose-500",
    Marriage: "from-purple-400 to-indigo-500",
    Enemies: "from-orange-400 to-red-500",
    Siblings: "from-purple-400 to-pink-500",
  };
  return colorMap[result] || "from-pink-400 to-purple-500";
};

const getResultMessage = (result: string, nameOne: string, nameTwo: string) => {
  const messages: Record<string, string> = {
    Friends: `${nameOne} and ${nameTwo} are destined to be best friends! 🌟`,
    Lovers: `${nameOne} and ${nameTwo} are meant to be lovers! 💕`,
    Affectionate: `${nameOne} and ${nameTwo} share a sweet, affectionate bond! 🌸`,
    Marriage: `${nameOne} and ${nameTwo} are destined for marriage! 💒`,
    Enemies: `${nameOne} and ${nameTwo} might face some challenges... 🌩️`,
    Siblings: `${nameOne} and ${nameTwo} have a sibling bond! 👭`,
  };
  return (
    messages[result] || `${nameOne} and ${nameTwo} have a special connection!`
  );
};

const ResultCard: React.FC<ResultCardProps> = ({ result, onShare }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 180, scale: 0.8 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-100 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <div className="text-8xl mb-4">{getResultEmoji(result.result)}</div>
        <h2
          className={`text-5xl font-bold bg-gradient-to-r ${getResultColor(
            result.result
          )} bg-clip-text text-transparent mb-4`}
        >
          {result.result}!
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <p className="text-xl text-gray-700 font-medium">
          {getResultMessage(result.result, result.nameOne, result.nameTwo)}
        </p>

        <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
          <span className="font-semibold text-pink-600">{result.nameOne}</span>
          <span>+</span>
          <span className="font-semibold text-purple-600">{result.nameTwo}</span>
          <span>=</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            {result.result}
          </span>
        </div>

        <motion.button
          onClick={onShare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Share2 className="w-5 h-5" />
          Share Result
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;
