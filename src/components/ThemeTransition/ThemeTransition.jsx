import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeTransition = () => {
    const { theme } = useTheme();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
            >
                <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className={`w-[150vmax] h-[150vmax] rounded-full ${theme === 'dark' ? 'bg-black' : 'bg-white'
                        }`}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default ThemeTransition;
