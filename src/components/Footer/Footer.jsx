import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, BarChart3, Mail, Phone, MapPin } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/personalInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const getIcon = (iconName) => {
    const icons = {
      github: Github,
      linkedin: Linkedin,
      'bar-chart': BarChart3,
      mail: Mail
    };
    return icons[iconName] || Mail;
  };


  return (
    <footer className="bg-black text-gray-300 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold mb-6 text-white"
            >
              {personalInfo.name}
            </motion.h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              {personalInfo.description}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = getIcon(social.icon);
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white text-gray-400 hover:text-black transition-all duration-300 border border-white/10"
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => {
                      const element = document.querySelector(`#${link.toLowerCase()}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                {personalInfo.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                {personalInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                {personalInfo.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;

