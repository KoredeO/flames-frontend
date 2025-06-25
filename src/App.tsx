import { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
import FlamesInput from "./components/FlamesInput";
import ResultCard from "./components/ResultCard";
import HistoryList from "./components/HistoryList";
import ConfettiEffect from "./components/ConfettiEffect";
import { FlamesResult } from "./types/flames";
import { flamesApi } from "./services/flamesApi";

function App() {
  const [currentResult, setCurrentResult] = useState<FlamesResult | null>(null);
  const [history, setHistory] = useState<FlamesResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchHistory = useCallback(async () => {
    const historyData = await flamesApi.getHistory();
    setHistory(historyData);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleCalculate = async (nameOne: string, nameTwo: string) => {
    setIsLoading(true);
    try {
      const result = await flamesApi.calculateFlames(nameOne, nameTwo);
      if (!result) {
        console.error('Failed to calculate FLAMES');
        return;
      }
      
      setCurrentResult(result);

      setHistory((prev: FlamesResult[]): FlamesResult[] => [result, ...prev]);

      // Show confetti for romantic results
      if (result.result === "Lovers" || result.result === "Marriage") {
        setShowConfetti(true);
      }
    } catch (error) {
      console.error("Failed to calculate FLAMES:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check for shared result in URL when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedId = urlParams.get('result');
    
    if (sharedId) {
      const fetchSharedResult = async () => {
        const result = await flamesApi.getById(sharedId);
        if (result) {
          setCurrentResult(result);
        }
      };
      fetchSharedResult();
    }
  }, []);

  const handleShare = async () => {
    if (!currentResult || !currentResult.id) return;

    const shareText = `${currentResult.nameOne} + ${currentResult.nameTwo} = ${currentResult.result}! 💕 Check out your FLAMES result!`;
    const shareUrl = `${window.location.origin}?result=${currentResult.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "FLAMES Calculator Result",
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert("Result copied to clipboard! 📋");
      }
    } catch (error) {
      console.error("Failed to share:", error);
    }
  };

  const handleNewCalculation = () => {
    setCurrentResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <ConfettiEffect
        show={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {!currentResult ? (
            <FlamesInput onCalculate={handleCalculate} isLoading={isLoading} />
          ) : (
            <div className="space-y-6">
              <ResultCard result={currentResult} onShare={handleShare} />
              <div className="text-center">
                <motion.button
                  onClick={handleNewCalculation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/80 backdrop-blur-sm text-purple-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200"
                >
                  Try Another Calculation ✨
                </motion.button>
              </div>
            </div>
          )}

          <HistoryList history={history} onHistoryChange={fetchHistory} />
        </div>
      </div>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500" />
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-pink-300 rounded-full opacity-20 animate-pulse delay-700" />
      </div>
    </div>
  );
}

export default App;
