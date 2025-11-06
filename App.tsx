import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticlesBackground from './components/ParticlesBackground';

const App: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (mainRef.current) {
                const { clientX, clientY } = event;
                mainRef.current.style.setProperty('--mouse-x', `${clientX}px`);
                mainRef.current.style.setProperty('--mouse-y', `${clientY}px`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={mainRef} className="text-gray-100 font-sans antialiased relative main-container-with-light">
            {isMounted && <ParticlesBackground />}
            <div className="relative z-10">
                <Header />
                <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                </main>
                <footer className="text-center py-8 text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Swetha Sankar. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;