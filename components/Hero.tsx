import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    const title = "Hi, I’m Swetha Sankar";
    const subtitle = "AI Security, Bug Bounty - web security & Software Developer";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const subtitleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: title.length * 0.08 + 0.5,
                duration: 0.8
            }
        }
    }

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center">
            <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {title.split("").map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block">
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.h1>
            <motion.p 
                className="text-lg md:text-xl lg:text-2xl text-orange-400 font-medium tracking-wide"
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
            >
                {subtitle}
            </motion.p>
        </section>
    );
};

export default Hero;