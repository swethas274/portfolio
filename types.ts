import React from 'react';

export enum ProjectStatus {
  Working = 'Working',
  Completed = 'Completed',
  Pending = 'Pending',
  Deployed = 'Deployed',
}

export enum SubStatus {
  Completed = 'Completed',
  Working = 'Working',
  Pending = 'Pending',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  subStatuses: {
    [key: string]: SubStatus;
  };
  githubLink?: string;
  liveLink?: string;
}

export interface Skill {
    name: string;
    icon: React.ReactNode;
}