import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, Calendar, X, ZoomIn, ExternalLink } from 'lucide-react';
import { certificates } from '../../data/certificates';

const Certifications = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    // Close lightbox on ESC key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setSelectedCertificate(null);
            }
        };

        if (selectedCertificate) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [selectedCertificate]);

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

    return (
        <section id="certifications" className="py-24 bg-white dark:bg-black transition-colors duration-500">
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
                            Certifications & Achievements
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
                        Professional certifications and achievements demonstrating expertise in AI, data science, and cloud technologies.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                >
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30 cursor-pointer"
                            onClick={() => cert.verificationUrl && window.open(cert.verificationUrl, '_blank')}
                        >
                            {/* Certificate Image */}
                            <div
                                className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden cursor-pointer group/image"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    cert.image && setSelectedCertificate(cert);
                                }}
                            >
                                {cert.image ? (
                                    <>
                                        <img
                                            src={cert.image}
                                            alt={cert.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        {/* Zoom overlay on hover */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <ZoomIn className="w-12 h-12 text-white" />
                                        </div>
                                    </>
                                ) : null}

                                {/* Fallback icon if image fails to load */}
                                <div className="absolute inset-0 flex items-center justify-center" style={{ display: cert.image ? 'none' : 'flex' }}>
                                    <Award className="w-20 h-20 text-gray-400 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors" />
                                </div>

                                {/* Issue Date Badge */}
                                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full shadow-sm">
                                    <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cert.issueDate}</span>
                                </div>
                            </div>

                            {/* Certificate Details */}
                            <div className="p-6 space-y-4">
                                {/* Title & Issuer */}
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-gray-200 transition-colors">
                                            {cert.name}
                                        </h4>
                                        {cert.verificationUrl && (
                                            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors flex-shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                        <Award className="w-4 h-4" />
                                        {cert.issuer}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {cert.description}
                                </p>

                                {/* Skills Tags */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {cert.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Verification Badge */}
                                {cert.verificationUrl && (
                                    <div className="pt-2 border-t border-gray-100 dark:border-white/10">
                                        <p className="text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-400 transition-colors flex items-center gap-1">
                                            <ExternalLink className="w-3 h-3" />
                                            Click to verify certification
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Lightbox Modal for Full-Screen Certificate View */}
                <AnimatePresence>
                    {selectedCertificate && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCertificate(null)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex items-center justify-center p-4 cursor-zoom-out"
                        >
                            {/* Close Button */}
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                onClick={() => setSelectedCertificate(null)}
                                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[210]"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-6 h-6 text-white" />
                            </motion.button>

                            {/* Certificate Image */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative max-w-6xl max-h-[90vh] w-full cursor-default"
                            >
                                <img
                                    src={selectedCertificate.image}
                                    alt={selectedCertificate.name}
                                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                                />

                                {/* Certificate Info Overlay */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {selectedCertificate.name}
                                    </h3>
                                    <p className="text-gray-300 flex items-center gap-2">
                                        <Award className="w-5 h-5" />
                                        {selectedCertificate.issuer} • {selectedCertificate.issueDate}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Certifications;
