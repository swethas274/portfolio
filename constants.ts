import { Project, ProjectStatus, SubStatus } from './types';

export const NAV_LINKS = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
];

export const initialProjects: Project[] = [
    {
        id: '1',
        title: 'AI-Powered Security Operations Center (SOC) Platform',
        description: 'Next-generation SOC platform leveraging machine learning and AI algorithms for real-time cyber threat detection and automated incident response. Implements advanced ML models to reduce false positives by 70% and accelerate threat response times using behavioral analysis and pattern recognition.',
        status: ProjectStatus.Working,
        subStatuses: {
            'Threat Intelligence Engine': SubStatus.Completed,
            'ML Model Training Pipeline': SubStatus.Pending,
            'Real-time Analytics Dashboard': SubStatus.Completed,
            'Automated Alerting System': SubStatus.Pending,
            'AI-Powered Incident Response': SubStatus.Working,
        }
    },
    {
        id: '2',
        title: 'Fin-Hub: AI-Driven Financial Intelligence Platform',
        description: 'Comprehensive finance management dashboard featuring real-time stock market analysis, portfolio optimization, and personalized financial insights powered by Large Language Models (LLMs). Integrates machine learning for predictive analytics and natural language processing for intelligent financial recommendations.',
        status: ProjectStatus.Completed,
        subStatuses: {
            'RESTful Backend API': SubStatus.Completed,
            'Database Schema & ORM': SubStatus.Completed,
            'React Frontend UI': SubStatus.Completed,
            'LLM Integration': SubStatus.Completed,
            'Cloud Deployment': SubStatus.Pending,
        },
        githubLink: 'https://github.com/swethas274/fin-hub',
        liveLink: '#',
    },
    {
        id: '3',
        title: 'Automated Recon: AI-Enhanced Bug Bounty Tool',
        description: 'Advanced reconnaissance automation tool for bug bounty hunting and penetration testing. Features intelligent subdomain discovery, AI-powered scope filtering, and automated live status verification. Uses machine learning algorithms to prioritize high-value targets and reduce manual reconnaissance time by 80%.',
        status: ProjectStatus.Completed,
        subStatuses: {
            'Subdomain Enumeration Engine': SubStatus.Completed,
            'AI-Powered Target Filtering': SubStatus.Completed,
            'Automated Vulnerability Scanner': SubStatus.Completed,
            'ML-Based Priority Scoring': SubStatus.Completed,
        },
        githubLink: 'https://github.com/swethas274/Automated-Recon.git',
    },
    {
        id: '4',
        title: 'Hack-Bro: Interactive Cybersecurity Learning Platform',
        description: 'Comprehensive educational platform featuring guided ethical hacking labs, real-world cybersecurity challenges, and secure coding workshops. Implements containerized sandbox environments for safe exploitation practice and includes AI-assisted learning paths for personalized skill development in penetration testing and security engineering.',
        status: ProjectStatus.Pending,
        subStatuses: {
            'Microservices Backend': SubStatus.Completed,
            'Dockerized Lab Environment': SubStatus.Working,
            'Challenge Automation Engine': SubStatus.Pending,
            'AI-Powered Learning Dashboard': SubStatus.Pending,
            'Secure Coding Modules': SubStatus.Working,
        },
        githubLink: 'https://github.com/swethas274/hack-bro',
    },
    {
        id: '5',
        title: 'Aura: Emotional Intelligence AI Chatbot',
        description: 'Advanced conversational AI chatbot with emotional intelligence capabilities, leveraging Natural Language Processing (NLP) and sentiment analysis. Features context-aware responses, mood detection algorithms, and personalized interaction patterns. Built with transformer-based models for nuanced emotional understanding and empathetic dialogue generation.',
        status: ProjectStatus.Pending,
        subStatuses: {
            'NLP Backend Service': SubStatus.Completed,
            'Sentiment Analysis Engine': SubStatus.Completed,
            'Transformer Model Integration': SubStatus.Completed,
            'User Dashboard & Analytics': SubStatus.Pending,
            'Multi-language Support': SubStatus.Pending,
        },
        githubLink: 'https://github.com/swethas274/Aura.git',
    },
    {
        id: '6', // Fixed duplicate ID
        title: 'Malware Analysis Research Lab (Educational)',
        description: 'Comprehensive malware analysis research environment featuring advanced encryption/decryption algorithms, behavioral analysis tools, and reverse engineering frameworks. Includes automated sandboxing, cryptographic analysis modules, and AI-powered malware classification. Purely for academic research and cybersecurity education purposes.',
        status: ProjectStatus.Completed,
        subStatuses: {
            'Sandbox Environment': SubStatus.Completed,
            'Encryption Analysis Toolkit': SubStatus.Completed,
            'Behavioral Monitoring System': SubStatus.Completed,
            'AI-Based Classification': SubStatus.Working,
            'Research Documentation': SubStatus.Completed,
        },
        githubLink: 'https://github.com/swethas274/Building-Malware-.git',
    },
];