import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Eye, Brain, Database, BarChart3, Code2 } from 'lucide-react';
import { projects } from '../../data/projects';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState('all');

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

  const cardVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.25,
        ease: "easeOut"
      }
    }
  };

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'featured', label: 'Featured' },
    { key: 'Machine Learning', label: 'ML' },
    { key: 'Deep Learning', label: 'Deep Learning' },
    { key: 'Data Science', label: 'Data Science' }
  ];

  const filteredProjects = filter === 'featured' 
    ? projects.filter(project => project.featured)
    : filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const getCategoryIcon = (category) => {
    const icons = {
      'Machine Learning': Brain,
      'Deep Learning': Brain,
      'Data Science': Database,
      'NLP': Code2,
      'Computer Vision': Eye,
      'Data Visualization': BarChart3,
      'Time Series': BarChart3
    };
    return icons[category] || Brain;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Machine Learning': 'from-primary-500 to-primary-600',
      'Deep Learning': 'from-ai-500 to-ai-600',
      'Data Science': 'from-accent-500 to-accent-600',
      'NLP': 'from-purple-500 to-purple-600',
      'Computer Vision': 'from-blue-500 to-blue-600',
      'Data Visualization': 'from-green-500 to-green-600',
      'Time Series': 'from-orange-500 to-orange-600'
    };
    return colors[category] || 'from-primary-500 to-primary-600';
  };

  const ProjectCard = ({ project, index }) => {
    const CategoryIcon = getCategoryIcon(project.category);
    const categoryColor = getCategoryColor(project.category);

    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-white/10"
      >
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <div className={`w-full h-48 bg-gradient-to-br ${categoryColor} flex items-center justify-center`}>
            <div className="text-center">
              <CategoryIcon className="w-16 h-16 text-white mx-auto mb-2" />
              <span className="text-2xl font-bold text-white">
                {project.title.split(' ').map(word => word[0]).join('')}
              </span>
            </div>
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full text-secondary-800 hover:text-primary-600 transition-colors"
              >
                <ExternalLink size={20} />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full text-secondary-800 hover:text-primary-600 transition-colors"
              >
                <Github size={20} />
              </motion.a>
            )}
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 bg-gradient-to-r ${categoryColor} text-white text-xs font-semibold rounded-full`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            {project.title}
          </h3>
          
          <p className="text-gray-400 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-200 text-black rounded-lg font-medium transition-all duration-300"
              >
                <Eye size={16} />
                Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-white/30 text-gray-300 hover:bg-white hover:text-black rounded-lg font-medium transition-colors"
              >
                <Github size={16} />
                Code
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-24 bg-black">
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
            <span className="text-white">
              AI Projects
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full mx-auto mb-8"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Explore my portfolio of AI and data science projects that demonstrate real-world applications 
            of machine learning, deep learning, and data analysis.
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {filters.map((filterOption) => (
              <motion.button
                key={filterOption.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterOption.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === filterOption.key
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {filterOption.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
