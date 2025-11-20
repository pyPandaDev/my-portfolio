import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Github, Linkedin, BarChart3 } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/personalInfo';

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Guard: ensure EmailJS env vars exist
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('Email service not configured. Missing environment variables.');
      }

      // Prepare template params (align with your EmailJS template)
      const name = `${data.firstName} ${data.lastName}`.trim();
      const templateParams = {
        // Matches Content placeholders
        name,                 // for {{name}}
        message: data.message, // for {{message}}
        subject: data.subject, // for Subject: {{subject}}

        // Matches right-side fields in your template
        from_name: name,      // for {{from_name}}
        email: data.email,    // for Reply To: {{email}}
        from_email: data.email, // in case the template uses {{from_email}}

        // Explicit recipient (optional if set in template)
        to_email: 'mayankt1713@gmail.com'
      };

      // Send email via EmailJS
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY
      });

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Contact form send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#'
    }
  ];

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
    <section id="contact" className="py-24 bg-gray-50 dark:bg-black transition-colors duration-500">
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
              Get In Touch
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
            Ready to collaborate on AI and data science projects? Let's discuss how we can work together
            to build intelligent solutions that make a difference.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Let's Connect
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors duration-300">
                I'm always excited to discuss new opportunities in AI, machine learning, and data science.
                Whether you have a project in mind or want to collaborate on research, I'd love to hear from you!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center space-x-4 p-6 rounded-xl bg-gray-50 dark:bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-white/10"
                >
                  <div className="p-4 rounded-full bg-white dark:bg-white/10 shadow-sm">
                    <info.icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 font-medium">
                      {info.label}
                    </div>
                    <div className="text-lg text-gray-900 dark:text-white font-semibold">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Follow My Work
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = getIcon(social.icon);
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 rounded-full bg-gray-50 dark:bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-gray-200 dark:border-white/10"
                    >
                      <IconComponent size={24} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-white/10 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                      First Name
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full px-4 py-4 border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-white/50 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white transition-all duration-300"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                      Last Name
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full px-4 py-4 border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-white/50 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white transition-all duration-300"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                    Email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-4 border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-white/50 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                    Subject
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-4 border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-white/50 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="AI Project Collaboration"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-4 border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-white/50 focus:border-transparent bg-white dark:bg-black/50 text-gray-900 dark:text-white resize-none transition-all duration-300"
                    placeholder="This feature was not working..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${submitStatus === 'success'
                      ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
                      }`}
                  >
                    {submitStatus === 'success'
                      ? 'Message sent successfully! I\'ll get back to you soon.'
                      : 'Failed to send message. Please try again.'}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-600 text-white dark:text-black rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
