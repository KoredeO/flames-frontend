import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface FlamesInputProps {
  onCalculate: (nameOne: string, nameTwo: string) => void;
  isLoading: boolean;
}

const FlamesInput: React.FC<FlamesInputProps> = ({
  onCalculate,
  isLoading,
}) => {
  const [nameOne, setnameOne] = useState("");
  const [nameTwo, setnameTwo] = useState("");
  const [errors, setErrors] = useState({ nameOne: "", nameTwo: "" });

  const validateNames = () => {
    const newErrors = { nameOne: "", nameTwo: "" };

    if (!nameOne.trim()) {
      newErrors.nameOne = "Please enter the first name";
    } else if (nameOne.trim().length < 2) {
      newErrors.nameOne = "Name must be at least 2 characters";
    }

    if (!nameTwo.trim()) {
      newErrors.nameTwo = "Please enter the second name";
    } else if (nameTwo.trim().length < 2) {
      newErrors.nameTwo = "Name must be at least 2 characters";
    }

    if (nameOne.trim().toLowerCase() === nameTwo.trim().toLowerCase()) {
      newErrors.nameTwo = "Names must be different";
    }

    setErrors(newErrors);
    return !newErrors.nameOne && !newErrors.nameTwo;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateNames()) {
      onCalculate(nameOne.trim(), nameTwo.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-100"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="text-pink-500 w-8 h-8" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            FLAMES
          </h1>
          <Sparkles className="text-purple-500 w-8 h-8" />
        </div>
        <p className="text-gray-600 text-lg">
          Discover your relationship destiny!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={nameOne}
            onChange={(e) => setnameOne(e.target.value)}
            placeholder="Enter your name... 💕"
            className={`w-full px-6 py-4 rounded-2xl border-2 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 ${
              errors.nameOne
                ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-pink-200 bg-pink-50/50 focus:border-pink-400 focus:ring-pink-100"
            }`}
          />
          {errors.nameOne && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 ml-2"
            >
              {errors.nameOne}
            </motion.p>
          )}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full">
            <Heart className="text-white w-6 h-6" />
          </div>
        </div>

        <div>
          <input
            type="text"
            value={nameTwo}
            onChange={(e) => setnameTwo(e.target.value)}
            placeholder="Enter their name... 💖"
            className={`w-full px-6 py-4 rounded-2xl border-2 text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-4 ${
              errors.nameTwo
                ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100"
                : "border-purple-200 bg-purple-50/50 focus:border-purple-400 focus:ring-purple-100"
            }`}
          />
          {errors.nameTwo && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2 ml-2"
            >
              {errors.nameTwo}
            </motion.p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 rounded-2xl text-white font-bold text-xl transition-all duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Calculating...
            </div>
          ) : (
            "Calculate FLAMES 🔥"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default FlamesInput;
