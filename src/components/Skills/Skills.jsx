import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../../data/skills';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 2,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  const getCategoryColor = (category) => {
    // Use consistent theme color for all categories
    return "from-gray-400 via-gray-300 to-gray-400";
  };

  const SkillCard = ({ skill, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, x: 10 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-sm font-bold text-gray-500 dark:text-gray-500">
          {skill.level}%
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          custom={skill.level}
          variants={progressVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} rounded-full shadow-lg`}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white transition-colors duration-300">
              Technical Skills
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full mx-auto mb-8"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300"
          >
            Expertise in cutting-edge technologies for AI, machine learning, and data science. Proficient in Python ecosystem and modern cloud platforms.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-20"
        >
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="space-y-10"
            >
              {/* Category Title */}
              <motion.div
                variants={itemVariants}
                className="text-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  {category.category}
                </h3>
                <div className={`w-20 h-1 bg-gradient-to-r ${getCategoryColor(category.category)} rounded-full mx-auto`}></div>
              </motion.div>

              {/* Skills List */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              >
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={{ ...skill, category: category.category }}
                    index={skillIndex}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">
            Additional Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Prompt Engineering', 'Vibe Coding', 'Deep Learning', 'Flutter',
              'Docker', 'Jupyter Lab', 'Data Visualization'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-6 py-3 bg-white dark:bg-white/5 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-white/10 font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Skills;
