import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Project, ProjectStatus, SubStatus } from '../types';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (project: Project) => void;
    project: Project | null;
}

type SubStatusEntry = { name: string; status: SubStatus };

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, project }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.Pending);
    const [subStatuses, setSubStatuses] = useState<SubStatusEntry[]>([]);
    const [githubLink, setGithubLink] = useState('');
    const [liveLink, setLiveLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (project) {
                setTitle(project.title);
                setDescription(project.description);
                setStatus(project.status);
                setSubStatuses(Object.entries(project.subStatuses).map(([name, status]) => ({ name, status })));
                setGithubLink(project.githubLink || '');
                setLiveLink(project.liveLink || '');
            } else {
                setTitle('');
                setDescription('');
                setStatus(ProjectStatus.Pending);
                setSubStatuses([{ name: 'Backend', status: SubStatus.Pending }]);
                setGithubLink('');
                setLiveLink('');
            }
        }
    }, [project, isOpen]);

    const handleSubStatusChange = (index: number, field: 'name' | 'status', value: string) => {
        const newSubStatuses = [...subStatuses];
        newSubStatuses[index] = { ...newSubStatuses[index], [field]: value };
        setSubStatuses(newSubStatuses);
    };

    const addSubStatus = () => {
        setSubStatuses([...subStatuses, { name: '', status: SubStatus.Pending }]);
    };

    const removeSubStatus = (index: number) => {
        setSubStatuses(subStatuses.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subStatusesObject = subStatuses.reduce((acc, { name, status }) => {
            if (name) acc[name] = status;
            return acc;
        }, {} as { [key: string]: SubStatus });

        onSave({
            id: project?.id || '',
            title,
            description,
            status,
            subStatuses: subStatusesObject,
            githubLink,
            liveLink,
        });
    };

    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, y: -50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
        exit: { opacity: 0, y: 50, scale: 0.95 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-orange-500/30 max-h-[90vh] overflow-y-auto"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">{project ? 'Edit Project' : 'Add Project'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"></textarea>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400">Overall Status</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                                    {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            
                            <div className="border-t border-gray-700 pt-4 space-y-3">
                                <label className="block text-sm font-medium text-gray-400">Sub-Components</label>
                                {subStatuses.map((ss, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input type="text" placeholder="Component Name" value={ss.name} onChange={(e) => handleSubStatusChange(index, 'name', e.target.value)} className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                                        <select value={ss.status} onChange={(e) => handleSubStatusChange(index, 'status', e.target.value)} className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                                            {Object.values(SubStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <button type="button" onClick={() => removeSubStatus(index)} className="p-2 text-red-500 hover:bg-red-500/20 rounded-full">&times;</button>
                                    </div>
                                ))}
                                <button type="button" onClick={addSubStatus} className="text-sm text-orange-400 hover:text-orange-300">+ Add Component</button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400">GitHub Link</label>
                                <input type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400">Live Demo Link</label>
                                <input type="url" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                            </div>
                            <div className="flex justify-end space-x-4 pt-4">
                                <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none">Cancel</button>
                                <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Save Project</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;