import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper: React.FC<{ children: React.ReactNode; id: string; }> = ({ children, id }) => (
    <motion.section
        id={id}
        className="min-h-screen flex flex-col justify-center items-center py-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
    >
        {children}
    </motion.section>
);


const SectionTitle: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative inline-block">
        {children}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-cyan-400 rounded-full"></span>
    </h2>
);

const Status: React.FC = () => {
    return (
        <SectionWrapper id="status">
            <SectionTitle>Current Status</SectionTitle>
            <div className="space-y-10 max-w-3xl">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-400 mb-2">Currently Working On</h3>
                    <div className="inline-flex items-center space-x-3 bg-gray-800/50 border border-cyan-500/30 rounded-full px-6 py-3">
                        <motion.div
                            className="w-3 h-3 bg-cyan-400 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                boxShadow: [
                                    '0 0 0px rgba(0, 224, 255, 0.4)',
                                    '0 0 10px rgba(0, 224, 255, 0.6)',
                                    '0 0 0px rgba(0, 224, 255, 0.4)',
                                ],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                        <p className="text-xl md:text-2xl font-bold text-white">AI-Powered SOC Platform</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-400 mb-2">Open To</h3>
                    <p className="text-xl md:text-2xl font-bold text-cyan-400">
                        AI Security Engineer & Software Developer roles
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-400 mb-2">Currently Learning</h3>
                    <p className="text-xl md:text-2xl font-bold text-white">
                        Malware Analysis & Cloud Security
                    </p>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default Status;