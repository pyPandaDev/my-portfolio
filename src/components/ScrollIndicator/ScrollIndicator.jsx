import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';

const ScrollIndicator = () => {
  const [isOnHero, setIsOnHero] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Check if user is still on hero section
        setIsOnHero(scrollPosition < heroHeight - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHome = () => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed top-8 left-8 z-[100] flex items-center gap-3"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.button
        onClick={scrollToHome}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="relative group cursor-pointer"
        aria-label="Navigate to home"
      >
        {/* Outer ring pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute inset-0 rounded-full ${
            isOnHero ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        
        {/* Main dot */}
        <motion.div
          animate={{
            backgroundColor: isOnHero ? '#10b981' : '#ef4444',
            boxShadow: isOnHero 
              ? '0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)'
              : '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)',
          }}
          transition={{ duration: 0.5 }}
          className="relative w-4 h-4 rounded-full"
        >
          {/* Inner shine */}
          <div className="absolute inset-1 bg-white/30 rounded-full" />
        </motion.div>

        {/* Home icon on hover (when away from hero) */}
        <AnimatePresence>
          {!isOnHero && showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -right-10 top-1/2 -translate-y-1/2"
            >
              <Home size={16} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap"
          >
            <p className="text-sm font-medium text-white">
              {isOnHero ? 'You are Home' : 'Back to Home'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScrollIndicator;
