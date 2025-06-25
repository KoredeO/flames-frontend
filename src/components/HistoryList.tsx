import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Trash2 } from 'lucide-react';
import { FlamesResult } from '../types/flames';
import { flamesApi } from '../services/flamesApi';

interface HistoryListProps {
  history: FlamesResult[];
  onHistoryChange: () => void;
}

const getResultEmoji = (result: string) => {
  const emojiMap: Record<string, string> = {
    Friends: '👫',
    Lovers: '❤️',
    Affectionate: '🥰',
    Married: '💍',
    Enemies: '😤',
    Siblings: '👭',
  };
  return emojiMap[result] || '❤️';
};

const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const HistoryList: React.FC<HistoryListProps> = ({ history, onHistoryChange }) => {
  const handleDelete = async (id: string) => {
    try {
      await flamesApi.deleteHistoryItem(id);
      onHistoryChange(); // Refresh the history list
    } catch (error) {
      console.error('Failed to delete history item:', error);
    }
  };
  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-100 text-center"
      >
        <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          No calculations yet. Start your first FLAMES prediction! 💕
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-pink-100"
    >
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-purple-500" />
        <h3 className="text-2xl font-bold text-gray-800">History</h3>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
        {history.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">
                {getResultEmoji(item.result)}
              </div>
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-pink-600">{item.nameOne}</span>
                  <span className="text-gray-400">+</span>
                  <span className="text-purple-600">{item.nameTwo}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {item.timestamp ? formatDate(item.timestamp) : 'Just now'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">{item.result}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!item.id) {
                    console.error('No ID found for item:', item);
                    return;
                  }
                  handleDelete(item.id);
                }}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                aria-label="Delete history item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HistoryList;