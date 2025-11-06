import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
// This assumes the EmailJS script is loaded in index.html
declare var emailjs: any;


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

const GitHubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;


const Contact: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Sending...');

        // NOTE: Replace with your own EmailJS Service ID, Template ID, and Public Key
        const serviceID = 'service_5w5qvg7'; 
        const templateID = 'template_x7zkudk';
        const publicKey = 'wEE26iSgOY2yjCV0Y';

        console.log('Sending email with:', { serviceID, templateID, publicKey });

        emailjs.sendForm(serviceID, templateID, form.current!, publicKey)
            .then((result: any) => {
                console.log('EmailJS Success:', result);
                setStatus('Message sent successfully!');
                form.current?.reset();
                setTimeout(() => setStatus(''), 4000);
            }, (error: any) => {
                console.error('EmailJS Error Details:', error);
                setStatus('Failed to send. Please try again.');
                setTimeout(() => setStatus(''), 4000);
            });
    };

    return (
        <SectionWrapper id="contact">
            <SectionTitle>Get In Touch</SectionTitle>
            <p className="text-center text-gray-400 mb-8 max-w-2xl">
                Have an opportunity, a project idea, or just want to connect? Feel free to reach out. I'm always open to discussing new challenges and collaborations.
            </p>
            <motion.div 
                className="w-full max-w-xl bg-gray-800/50 p-8 rounded-lg border border-orange-500/30"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
                        <input type="text" id="name" name="from_name" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Your Email</label>
                        <input type="email" id="email" name="from_email" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                        <textarea id="message" name="message" rows={4} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"></textarea>
                    </div>
                    <div>
                        <motion.button 
                            type="submit" 
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-gray-900"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                           Send Message
                        </motion.button>
                    </div>
                    {status && <p className={`text-center text-sm mt-4 ${status.includes('Failed') ? 'text-red-400' : 'text-orange-400'}`}>{status}</p>}
                </form>
            </motion.div>
            <div className="mt-12 flex space-x-6 items-center">
                <motion.a href="https://github.com/swethas274" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400" whileHover={{ scale: 1.2, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <GitHubIcon />
                </motion.a>
                <motion.a href="https://www.linkedin.com/in/swethas274/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400" whileHover={{ scale: 1.2, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <LinkedInIcon />
                </motion.a>
            </div>
        </SectionWrapper>
    );
};

export default Contact;