import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Code2, Brain, Database, BarChart3 } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Section Title - Centered */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">
                About Me
              </span>
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full mx-auto"
            ></motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants}>
            <div className="space-y-8">

              {/* Description */}
              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-xl text-gray-400 leading-relaxed whitespace-pre-wrap">
                  Hi, I'm Mayank Tiwari, an aspiring AI and Data Science Engineer with a strong foundation in computer science and a passion for building intelligent systems. I recently completed my Bachelor's degree in Computer Science and have been diving deep into the world of artificial intelligence ever since.
                  {'\n\n'}
                  I enjoy solving real-world problems using data-driven approaches and machine learning techniques. My main programming language is Python, and I also work with Dart & Flutter for building cross-platform mobile applications.
                  {'\n\n'}
                  My long-term goal is to become a skilled AI Engineer, capable of developing innovative solutions that make an impact. I'm always exploring new technologies, improving my skills, and taking on challenges that push me forward.
                  {'\n\n'}
                  When I'm not coding, you'll probably find me gaming on my mobile or PC – it's my way to relax and stay sharp!
                </p>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
