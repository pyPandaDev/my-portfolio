import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Github, Linkedin, Mail, BarChart3 } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/personalInfo';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayText, setDisplayText] = useState('');
  const fullText = 'AI & Data Science Engineer';

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
    const match = url.match(/\/d\/([^/]+)\//);
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-black dark:to-black transition-colors duration-500 pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left - Python Code */}
        <motion.pre
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="absolute -top-10 -left-20 text-green-600/20 dark:text-green-400/50 text-xs sm:text-sm font-mono leading-relaxed blur-[0.8px] select-none rotate-[-5deg] w-2/5"
        >
          {pythonCode}
        </motion.pre>

        {/* Top Right - Data Visualization */}
        <motion.pre
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-10 -right-10 text-purple-600/20 dark:text-purple-400/50 text-[10px] sm:text-xs font-mono leading-tight blur-[0.6px] select-none rotate-[5deg] w-1/3"
        >
          {dataVisualization}
        </motion.pre>

        {/* Bottom Left - Dataset Preview */}
        <motion.pre
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 left-10 text-cyan-600/20 dark:text-cyan-400/50 text-[9px] sm:text-xs font-mono leading-tight blur-[0.6px] select-none rotate-[-3deg] w-1/3"
        >
          {datasetPreview}
        </motion.pre>

        {/* Bottom Right - Python Code Mirror */}
        <motion.pre
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-10 right-0 text-emerald-600/20 dark:text-emerald-400/45 text-xs font-mono leading-relaxed blur-[0.8px] select-none rotate-[3deg] w-1/4"
        >
          {pythonCode.slice(0, 400)}
        </motion.pre>

        {/* Center Background - Subtle Dataset */}
        <motion.pre
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 text-teal-600/10 dark:text-teal-400/35 text-[8px] font-mono leading-tight blur-[1px] select-none w-1/2"
        >
          {dataVisualization}
        </motion.pre>
      </div>

      {/* Animated Overlay with Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-black/85 dark:via-black/75 dark:to-black/85 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-60"></div>
      </div>

      {/* Main Content - Centered - Responsive */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-8 md:px-16 text-center relative z-10 flex flex-col items-center justify-center min-h-screen pt-20"
      >
        {/* Centered Name and Typewriter Title */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight"
          >
            Mayank Tiwari
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-400 font-mono px-4"
          >
            {displayText}
            <span className="animate-pulse text-primary-600 dark:text-primary-400">|</span>
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-400 mb-6 sm:mb-8 max-w-3xl leading-relaxed px-4"
        >
          {personalInfo.subtitle}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-500 mb-8 sm:mb-12 max-w-2xl leading-relaxed px-4"
        >
          {personalInfo.description}
        </motion.p>

        {/* CTA Buttons - Responsive */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 justify-center px-4 w-full sm:w-auto"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            href={getResumeLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 shadow-xl"
          >
            <Download size={20} className="sm:w-6 sm:h-6" />
            <span>Download Resume</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => {
              const element = document.getElementById('projects');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 sm:px-10 py-3 sm:py-4 border-2 border-gray-300 dark:border-white/30 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/50 rounded-lg font-semibold text-base sm:text-lg transition-colors"
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
                className="p-3 sm:p-4 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 shadow-sm"
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

