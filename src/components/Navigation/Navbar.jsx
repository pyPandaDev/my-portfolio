import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Home, User, Code, Folder, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [activeSection, setActiveSection] = useState('home');

    const navItems = [
        { name: 'Home', href: '#home', icon: Home },
        { name: 'About', href: '#about', icon: User },
        { name: 'Skills', href: '#skills', icon: Code },
        { name: 'Projects', href: '#projects', icon: Folder },
        { name: 'Contact', href: '#contact', icon: Mail }
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Update active section
            const sections = navItems.map(item => item.name.toLowerCase());
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Top Left Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-6 left-6 z-50"
            >
                <button
                    onClick={() => scrollToSection('#home')}
                    className="text-2xl font-bold text-gray-900 dark:text-white tracking-tighter hover:opacity-80 transition-opacity"
                    aria-label="Scroll to top"
                >
                    MT
                </button>
            </motion.div>

            {/* Top Right Theme Toggle */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="fixed top-6 right-6 z-50"
            >
                <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg text-gray-800 dark:text-yellow-400 hover:bg-white/60 dark:hover:bg-white/10 transition-all ring-1 ring-black/5 dark:ring-white/5"
                    aria-label="Toggle Theme"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={theme}
                            initial={{ y: -20, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 20, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.div>
                    </AnimatePresence>
                </motion.button>
            </motion.div>

            {/* Bottom Center Navigation Dock */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
                <motion.nav
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2
                    }}
                    className="flex items-center gap-2 px-3 py-3 bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-full shadow-2xl shadow-black/10 dark:shadow-black/30 ring-1 ring-black/5 dark:ring-white/5"
                >
                    {navItems.map((item) => {
                        const isActive = activeSection === item.name.toLowerCase();
                        return (
                            <motion.button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`Navigate to ${item.name} section`}
                                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 group ${isActive
                                    ? 'text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {/* Active Background Pill */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gray-900/90 dark:bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                {/* Icon & Text */}
                                <span className="relative z-10 flex items-center gap-2">
                                    <item.icon size={18} className={isActive ? "text-white dark:text-black" : ""} />
                                    <span className={`text-sm font-medium hidden sm:block ${isActive ? "text-white dark:text-black" : ""
                                        }`}>
                                        {item.name}
                                    </span>
                                </span>

                                {/* Hover Glow Effect */}
                                {!isActive && (
                                    <div className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                )}
                            </motion.button>
                        );
                    })}
                </motion.nav>
            </div>
        </>
    );
};

export default Navbar;
