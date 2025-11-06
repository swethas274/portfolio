import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const MediumIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
);

const SectionWrapper: React.FC<{ children: React.ReactNode; id: string; }> = ({ children, id }) => (
    <motion.section
        id={id}
        className="min-h-screen flex flex-col justify-center items-center py-20"
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
    </h2>
);

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const About: React.FC = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const slideContainerRef = useRef<HTMLDivElement>(null);
    const lastPaginated = useRef(0);

    const paginate = useCallback((newDirection: number) => {
        setPage(prev => [(prev[0] + newDirection + 3) % 3, newDirection]);
    }, []);

    useEffect(() => {
        const container = slideContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const now = Date.now();
            if (now - lastPaginated.current > 600) { // Throttle scroll
                lastPaginated.current = now;
                if (e.deltaY < 0) {
                    paginate(-1); // Up
                } else {
                    paginate(1); // Down
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [paginate]);


    const handleDotClick = (i: number) => {
        setPage([i, i > page ? 1 : -1]);
    };

    const slides = [
        <BioSlide key="bio" />,
        <ExperienceSlide key="experience" />,
        <InterestsSlide key="interests" />,
    ];

    return (
        <SectionWrapper id="about">
            <SectionTitle>About Me</SectionTitle>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full max-w-6xl">
                <motion.div 
                    className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-orange-400 shadow-lg shadow-orange-500/20 flex-shrink-0"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
                >
                    <img src="pic.jpg" alt="Swetha Sankar" className="w-full h-full object-cover" />
                </motion.div>
                <div ref={slideContainerRef} className="relative w-full max-w-2xl h-[300px] overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full h-full"
                        >
                            {slides[page]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
             <div className="mt-8 flex space-x-3">
                {[0, 1, 2].map(i => (
                    <button key={i} onClick={() => handleDotClick(i)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${page === i ? 'bg-orange-400' : 'bg-gray-600 hover:bg-gray-500'}`}
                        aria-label={`Go to slide ${i + 1}`}
                     />
                ))}
            </div>
        </SectionWrapper>
    );
};

const BioSlide = () => (
    <div className="text-center lg:text-left h-full flex flex-col justify-center">
        <p className="text-lg md:text-xl text-gray-300 mb-4">
            Hi, I’m Swetha — a curious builder passionate about crafting real-world solutions in <b>software development</b> and <b>cybersecurity</b>, often powered by <b>AI</b> and <b>ML</b>.
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
           I’m open to <b>Software Development</b> and <b>Cybersecurity</b> roles where I can learn, contribute, and build scalable, <b>secure systems</b>.
        </p>
        <div className="flex justify-center lg:justify-start space-x-6">
            <motion.a href="https://github.com/swethas274" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400" whileHover={{ scale: 1.2, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <GitHubIcon />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/swethas274/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400" whileHover={{ scale: 1.2, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <LinkedInIcon />
            </motion.a>
             <motion.a href="https://medium.com/@swethas274" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400" whileHover={{ scale: 1.2, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <MediumIcon />
            </motion.a>
        </div>
    </div>
);

const ExperienceSlide = () => (
    <div className="text-left h-full space-y-4 overflow-y-auto pr-2 text-sm md:text-base">
        <h3 className="text-xl font-bold text-center lg:text-left mb-3">Internship Experience</h3>
        <div className="relative border-l-2 border-gray-700 pl-6 space-y-6">
             <div className="relative">
                <div className="absolute -left-[34px] top-1.5 w-4 h-4 bg-orange-400 rounded-full border-4 border-gray-900"></div>
                <p className="font-bold text-white">Cyber Security Intern - Big Bang Boom Solutions</p>
                <p className="text-xs text-gray-400">Aug 2025 - Present</p>
                <p className="text-xs text-gray-400">Adambakkam, Chennai</p>
            </div>
            <div className="relative">
                <div className="absolute -left-[34px] top-1.5 w-4 h-4 bg-orange-400 rounded-full border-4 border-gray-900"></div>
                <p className="font-bold text-white">Machine Learning Intern - Elpis IT Solutions</p>
                <p className="text-xs text-gray-400">May 2025 - July 2025</p>
                <p className="text-xs text-gray-400">krishnarajapuram, Bengaluru</p>
            </div>
             <div className="relative">
                <div className="absolute -left-[34px] top-1.5 w-4 h-4 bg-orange-400 rounded-full border-4 border-gray-900"></div>
                <p className="font-bold text-white">Full Stack Developer Intern - TechnoRUCS</p>
                <p className="text-xs text-gray-400">May 2024 - Jul 2024</p>
                <p className="text-xs text-gray-400">perungudi, Chennai</p>
            </div>
        </div>
    </div>
);

const InterestsSlide = () => (
     <div className="text-center lg:text-left h-full flex flex-col justify-center">
        <p className="text-lg md:text-xl text-gray-300 mb-4">
            Beyond the code, my interests include: <b>Bug Bounties, F1 Racing, Anime, Gaming,</b> and <b>Outings</b>.
        </p>
        <p className="text-lg md:text-xl text-gray-300 italic">
            "I am a developer and a problem solver rather than a documentation person."
        </p>
    </div>
);

export default About;