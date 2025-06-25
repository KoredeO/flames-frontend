import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiEffectProps {
  show: boolean;
  onComplete?: () => void;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ show, onComplete }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#ff6b9d', '#f7b2bd', '#e06b6b', '#ffd93d', '#6bcf7f', '#4d9de0'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.5,
      }));
      setConfetti(newConfetti);

      const timer = setTimeout(() => {
        setConfetti([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: '-10px',
          }}
          initial={{ y: -20, rotate: 0, scale: 1 }}
          animate={{
            y: window.innerHeight + 50,
            rotate: 360,
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 2.5,
            delay: piece.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;