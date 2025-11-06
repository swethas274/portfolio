import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { initialProjects } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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

const Projects: React.FC = () => {
    const [projects, setProjects] = useLocalStorage<Project[]>('projects', initialProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const handleAddProject = () => {
        setEditingProject(null);
        setIsModalOpen(true);
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleDeleteProject = (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleSaveProject = (project: Project) => {
        if (editingProject && project.id) {
            setProjects(projects.map(p => p.id === project.id ? project : p));
        } else {
            setProjects([...projects, { ...project, id: new Date().toISOString() }]);
        }
        setIsModalOpen(false);
    };
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <SectionWrapper id="projects">
            <SectionTitle>My Projects</SectionTitle>
            <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                    />
                ))}
            </motion.div>
            
            <ProjectModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProject}
                project={editingProject}
            />
        </SectionWrapper>
    );
};

export default Projects;