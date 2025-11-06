import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project, ProjectStatus, SubStatus } from '../types';

const statusColors: { [key in ProjectStatus]: string } = {
    [ProjectStatus.Working]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
    [ProjectStatus.Completed]: 'bg-green-500/20 text-green-400 border-green-500',
    [ProjectStatus.Pending]: 'bg-orange-500/20 text-orange-400 border-orange-500',
    [ProjectStatus.Deployed]: 'bg-blue-500/20 text-blue-400 border-blue-500',
};

const subStatusColors: { [key in SubStatus]: string } = {
    [SubStatus.Completed]: 'bg-green-500/20 text-green-400',
    [SubStatus.Working]: 'bg-yellow-500/20 text-yellow-400',
    [SubStatus.Pending]: 'bg-orange-500/20 text-orange-400',
};

const GitHubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;

interface ProjectCardProps {
    project: Project;
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            className="w-full h-[380px] [perspective:1000px]"
            variants={itemVariants}
            onHoverStart={() => setIsFlipped(true)}
            onHoverEnd={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-gray-800/50 rounded-lg border-2 border-gray-700/50 flex flex-col p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white pr-2">{project.title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[project.status]} whitespace-nowrap`}>
                            {project.status}
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>
                    
                    <div className="mt-auto border-t border-gray-700 pt-4 flex justify-end space-x-4">
                        {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400"><GitHubIcon /></a>}
                        {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400"><ExternalLinkIcon /></a>}
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-800 rounded-lg border-2 border-orange-400/50 flex flex-col p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold text-white">Component Status</h4>
                        <div className="flex space-x-2 items-center">
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 hover:text-white" aria-label="GitHub Link">
                                    <GitHubIcon />
                                </a>
                            )}
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 hover:text-white" aria-label="Live Link">
                                    <ExternalLinkIcon />
                                </a>
                            )}
                            
                        </div>
                    </div>
                    <div className="space-y-3 flex-grow overflow-y-auto pr-2">
                        {Object.entries(project.subStatuses).map(([name, status]) => (
                            <div key={name} className="flex justify-between items-center bg-gray-700/50 p-2 rounded-md">
                                <span className="text-gray-300 font-medium">{name}</span>
                                {/* Fix: Cast status to SubStatus because Object.entries infers the value as 'unknown'. */}
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${subStatusColors[status as SubStatus]}`}>
                                    {status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;
