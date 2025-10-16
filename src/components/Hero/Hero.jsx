import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Github, Linkedin, Mail, BarChart3 } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/personalInfo';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSection, setActiveSection] = useState('home');
  const [displayText, setDisplayText] = useState('');
  const [showNav, setShowNav] = useState(true);
  const navTimerRef = useRef(null);
  const fullText = 'AI & Data Science Developer';
  
  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-hide navigation after 3 seconds of inactivity
  useEffect(() => {
    const handleScrollForNav = () => {
      // Show nav when scrolling
      setShowNav(true);
      
      // Clear existing timer
      if (navTimerRef.current) {
        clearTimeout(navTimerRef.current);
      }
      
      // Set timer to hide nav after 3 seconds
      navTimerRef.current = setTimeout(() => {
        setShowNav(false);
      }, 3000);
    };

    // Show nav initially, then start timer
    navTimerRef.current = setTimeout(() => {
      setShowNav(false);
    }, 3000);

    window.addEventListener('scroll', handleScrollForNav);
    
    return () => {
      window.removeEventListener('scroll', handleScrollForNav);
      if (navTimerRef.current) {
        clearTimeout(navTimerRef.current);
      }
    };
  }, []);
  
  // Contextual scroll-based navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
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
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href, name) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(name.toLowerCase());
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      github: Github,
      linkedin: Linkedin,
      'bar-chart': BarChart3,
      mail: Mail
    };
    return icons[iconName] || Mail;
  };

  // Return a viewer-friendly Google Drive link (opens in Drive viewer)
  const getResumeLink = () => {
    const url = personalInfo.resume || '';
    // If it's already a Google Drive "view" link, return as-is
    if (/drive.google.com\/file\/d\/.+\/view/.test(url) || /drive.google.com\/open/.test(url)) {
      return url;
    }

    // Try to extract file id from common Google Drive patterns: /d/FILEID/
    const match = url.match(/\/d\/([^\/]+)\//);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/view`;
    }

    // Fallback to original URL
    return url;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const pythonCode = `# AI & Data Science Project
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import tensorflow as tf
from tensorflow import keras

# Load and preprocess data
df = pd.read_csv('dataset.csv')
X = df.drop('target', axis=1)
y = df['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Build neural network
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

model.fit(X_train, y_train, epochs=50)
accuracy = model.evaluate(X_test, y_test)
print(f'Accuracy: {accuracy[1]:.2%}')`;

  const datasetPreview = `
╔═══════════════════════════════════════╗
║   DATASET PREVIEW - ML Training      ║
╠═══════════════════════════════════════╣
║ Records: 50,000 | Features: 24       ║
║ Target: Binary Classification        ║
╠═══════════════════════════════════════╣
║ ID  | Feature1 | Feature2 | Target   ║
╠═════╬══════════╬══════════╬══════════╣
║ 001 │   0.847  │   2.134  │    1     ║
║ 002 │   1.923  │   0.456  │    0     ║
║ 003 │   0.234  │   1.789  │    1     ║
║ 004 │   2.156  │   0.891  │    1     ║
║ 005 │   0.678  │   2.345  │    0     ║
╚═════╩══════════╩══════════╩══════════╝

Performance: Accuracy 94.3%`;

  const dataVisualization = `
╔════════════════════════════════════╗
║  MODEL PERFORMANCE ANALYSIS        ║
╚════════════════════════════════════╝

Training Accuracy:
┌────────────────────────────────┐
│ Epoch  Train   Val    Loss     │
├────────────────────────────────┤
│   10   0.876  0.854   0.234    │
│   20   0.912  0.891   0.187    │
│   30   0.943  0.924   0.142    │
│   40   0.967  0.948   0.098    │
│   50   0.981  0.963   0.067    │
└────────────────────────────────┘

Feature Importance:
━━━━━━━━━━━━━━━━━━━
Feature_A  ████████████ 0.34
Feature_B  ████████░░░░ 0.28
Feature_C  ██████░░░░░░ 0.19
Feature_D  ████░░░░░░░░ 0.12`;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Left - Python Code */}
        <motion.pre 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.1, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute -top-10 -left-20 text-green-400/50 text-xs sm:text-sm font-mono leading-relaxed blur-[0.8px] select-none rotate-[-5deg] w-2/5"
        >
          {pythonCode}
        </motion.pre>

        {/* Top Right - Data Visualization */}
        <motion.pre 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.2, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute top-10 -right-10 text-purple-400/50 text-[10px] sm:text-xs font-mono leading-tight blur-[0.6px] select-none rotate-[5deg] w-1/3"
        >
          {dataVisualization}
        </motion.pre>

        {/* Bottom Left - Dataset Preview */}
        <motion.pre 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.3, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute bottom-0 left-10 text-cyan-400/50 text-[9px] sm:text-xs font-mono leading-tight blur-[0.6px] select-none rotate-[-3deg] w-1/3"
        >
          {datasetPreview}
        </motion.pre>

        {/* Bottom Right - Python Code Mirror */}
        <motion.pre 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.4, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute bottom-10 right-0 text-emerald-400/45 text-xs font-mono leading-relaxed blur-[0.8px] select-none rotate-[3deg] w-1/4"
        >
          {pythonCode.slice(0, 400)}
        </motion.pre>

        {/* Center Background - Subtle Dataset */}
        <motion.pre 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.5, 
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 text-teal-400/35 text-[8px] font-mono leading-tight blur-[1px] select-none w-1/2"
        >
          {dataVisualization}
        </motion.pre>
      </div>

      {/* Animated Overlay with Vignette */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1, 
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"
      >
        {/* Radial gradient for vignette effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2
          }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)]"
        ></motion.div>
      </motion.div>

      {/* Navigation Panel on Upper Right - Responsive */}
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.8 }}
        animate={{ 
          y: showNav ? 0 : -30, 
          opacity: showNav ? 1 : 0,
          scale: showNav ? 1 : 0.7,
          filter: showNav ? 'blur(0px)' : 'blur(10px)',
          rotateX: showNav ? 0 : 90
        }}
        transition={{ 
          duration: showNav ? 0.4 : 0.6, 
          ease: showNav ? [0.25, 0.1, 0.25, 1] : [0.6, 0.05, 0.01, 0.9],
          opacity: { duration: showNav ? 0.4 : 0.8 }
        }}
        style={{ transformOrigin: 'top center' }}
        className="fixed top-4 sm:top-8 right-4 sm:right-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl z-50 px-2 sm:px-4 py-2 sm:py-3"
      >
        <div className="flex flex-row gap-1 sm:gap-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: showNav ? 1 : 0, 
                y: showNav ? 0 : [-20, 10, 30][Math.floor(Math.random() * 3)],
                x: showNav ? 0 : (Math.random() - 0.5) * 50,
                scale: showNav ? 1 : 0.3,
                filter: showNav ? 'blur(0px)' : 'blur(8px)'
              }}
              transition={{ 
                delay: showNav ? index * 0.05 + 0.3 : index * 0.03,
                duration: showNav ? 0.3 : 0.5,
                ease: showNav ? "easeOut" : [0.6, 0.05, 0.01, 0.9]
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.href, item.name)}
              className={`relative px-2 sm:px-4 py-2 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 rounded-lg whitespace-nowrap ${
                activeSection === item.name.toLowerCase()
                  ? 'text-white bg-white/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.name}
              
              {/* Active indicator */}
              {activeSection === item.name.toLowerCase() && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-400 via-white to-gray-400"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Content - Centered - Responsive */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-8 md:px-16 text-center relative z-10 flex flex-col items-center justify-center min-h-screen"
      >
        {/* Centered Name and Typewriter Title */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-12"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 sm:mb-6"
          >
            Mayank Tiwari
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 font-mono px-4"
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-3xl leading-relaxed px-4"
        >
          {personalInfo.subtitle}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg text-gray-500 mb-8 sm:mb-12 max-w-2xl leading-relaxed px-4"
        >
          {personalInfo.description}
        </motion.p>

        {/* CTA Buttons - Responsive */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 justify-center px-4 w-full sm:w-auto"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            href={getResumeLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
          >
            <Download size={20} className="sm:w-6 sm:h-6" />
            <span>Download Resume</span>
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => scrollToSection('#projects', 'Projects')}
            className="px-6 sm:px-10 py-3 sm:py-4 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-lg font-semibold text-base sm:text-lg"
          >
            Explore My Work
          </motion.button>
        </motion.div>

        {/* Social Links - Responsive */}
        <motion.div
          variants={itemVariants}
          className="flex space-x-4 sm:space-x-6"
        >
          {socialLinks.map((social, index) => {
            const IconComponent = getIcon(social.icon);
            return (
              <motion.a
                key={social.name}
                whileHover={{ 
                  scale: 1.3, 
                  y: -8,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
              >
                <IconComponent size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

