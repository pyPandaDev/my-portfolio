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
                className="fixed inset-0 z-[9999] pointer-events-none bg-black dark:bg-white"
            />
        </AnimatePresence>
    );
};

export default ThemeTransition;
