'use client'
import React, { useState, useEffect } from 'react';
import Sentiment from 'sentiment';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Smile, Meh, Frown, Heart, Zap, Cloud } from 'lucide-react';

const SentimentAnalyzer: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [sentimentScore, setSentimentScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);

  const analyzeSentiment = () => {
    setLoading(true);
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    
    setSentimentScore(result.score);
    setLoading(false);
  };

  const getSentimentDetails = () => {
    if (sentimentScore === null) return {
      message: 'Awaiting your emotional landscape...',
      color: 'from-gray-200 to-gray-300',
      textColor: 'text-gray-800',
      icon: <Cloud className="text-gray-500" size={64} />,
      fullMessage: 'Your thoughts are a canvas waiting to be painted.'
    };

    if (sentimentScore > 2) return {
      message: 'Euphoric Bliss!',
      color: 'from-green-300 to-emerald-500',
      textColor: 'text-green-900',
      icon: <Heart className="text-white" size={64} />,
      fullMessage: 'Your positivity is a radiant sun, melting away shadows of doubt.'
    };

    if (sentimentScore > 0) return {
      message: 'Gentle Optimism',
      color: 'from-lime-200 to-green-400',
      textColor: 'text-green-800',
      icon: <Smile className="text-white" size={64} />,
      fullMessage: 'Hope whispers softly in the corners of your words.'
    };

    if (sentimentScore === 0) return {
      message: 'Balanced Harmony',
      color: 'from-gray-200 to-gray-400',
      textColor: 'text-gray-900',
      icon: <Meh className="text-white" size={64} />,
      fullMessage: 'A zen-like equilibrium flows through your thoughts.'
    };

    if (sentimentScore > -2) return {
      message: 'Emotional Turbulence',
      color: 'from-orange-300 to-red-400',
      textColor: 'text-red-900',
      icon: <Zap className="text-white" size={64} />,
      fullMessage: 'Challenges are temporary, your strength is permanent.'
    };

    return {
      message: 'Deep Emotional Depth',
      color: 'from-red-400 to-red-600',
      textColor: 'text-red-900',
      icon: <Frown className="text-white" size={64} />,
      fullMessage: 'In the depths of struggle, resilience blooms.'
    };
  };

  useEffect(() => {
    const count = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(count);
  }, [text]);

  const sentimentDetails = getSentimentDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="relative w-full max-w-xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border-4 border-white/30 p-8 transform hover:scale-[1.02] transition-all duration-300"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-purple-200/20 rounded-full"
          />
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-200/20 rounded-full"
          />
        </div>

        <LayoutGroup>
          <motion.div layout className="relative z-10">
            <h1 className="text-3xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
              I know how you&apos;re feeling
            </h1>

            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Transmute your emotions into words... ✨"
              className="w-full h-48 p-4 bg-white/60 backdrop-blur-sm border-2 border-purple-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300/50 resize-none text-gray-800"
            />

            <motion.div 
              layout
              className="flex justify-between items-center mt-4 text-sm text-gray-600"
            >
              <span>Emotional Complexity: {wordCount}</span>
              <span className={`transition-all ${wordCount > 50 ? 'text-purple-600 font-bold' : ''}`}>
                {wordCount > 50 ? 'Profound Insights Emerging! 🌟' : 'Dive Deeper...'}
              </span>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={analyzeSentiment}
              disabled={loading || !text.trim()}
              className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 flex items-center justify-center space-x-3 shadow-xl"
            >
              {loading ? 'Decoding Emotional Essence...' : 'Unveil My Emotional Landscape'}
            </motion.button>

            <AnimatePresence>
              {sentimentScore !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className={`mt-6 p-6 rounded-3xl bg-gradient-to-br ${sentimentDetails.color} shadow-2xl flex items-center space-x-6 relative overflow-hidden`}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                  />
                  
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10"
                  >
                    {sentimentDetails.icon}
                  </motion.div>
                  
                  <div className="relative z-10">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-2xl font-bold ${sentimentDetails.textColor}`}
                    >
                      {sentimentDetails.message}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-2 text-lg text-gray-800 italic"
                    >
                      {sentimentDetails.fullMessage}
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-3 flex items-center space-x-3"
                    >
                      <span className="font-semibold text-gray-700">Emotional Resonance:</span> 
                      <span className="bg-white/60 px-3 py-1 rounded-full text-gray-800 font-bold shadow-md">
                        {sentimentScore}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </motion.div>
    </div>
  );
};

export default SentimentAnalyzer;