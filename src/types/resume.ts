/**
 * Resume Builder Data Types
 * Exactly matches the backend Pydantic schema
 */

export type ReorderableSection = 
  | 'summary'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'achievements'
  | 'education';

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface SkillCategories {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
}

export interface ExperienceEntry {
  id?: string;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string[];
}

export interface ProjectEntry {
  id?: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface AchievementEntry {
  id?: string;
  title: string;
  description: string;
  date: string;
}

export interface EducationEntry {
  id?: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  grade: string;
}

export interface ResumeData {
  full_name: string;
  contact: ContactInfo;
  social_links: SocialLinks;
  summary: string;
  skills: SkillCategories;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  achievements: AchievementEntry[];
  education: EducationEntry[];
  section_order: ReorderableSection[];
}

export type StepId = 
  | 'personal'
  | 'social'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'achievements'
  | 'education'
  | 'arrange'
  | 'review';

export interface WizardStep {
  id: StepId;
  label: string;
  description: string;
  isOptional?: boolean;
}

export const WIZARD_STEPS: WizardStep[] = [
  { id: 'personal', label: 'Personal Information', description: 'Name and essential contact details' },
  { id: 'social', label: 'Social Links', description: 'LinkedIn, GitHub, and Portfolio URLs', isOptional: true },
  { id: 'summary', label: 'Summary', description: 'Professional background & target focus', isOptional: true },
  { id: 'skills', label: 'Skills', description: 'Languages, frameworks, databases, and tools' },
  { id: 'experience', label: 'Experience', description: 'Work history, internships, and roles', isOptional: true },
  { id: 'projects', label: 'Projects', description: 'Technical projects and accomplishments', isOptional: true },
  { id: 'achievements', label: 'Achievements', description: 'Honors, awards, and recognitions', isOptional: true },
  { id: 'education', label: 'Education', description: 'Degrees, institutions, and academics' },
  { id: 'arrange', label: 'Arrange Sections', description: 'Reorder sections for maximum impact' },
  { id: 'review', label: 'Review & Generate', description: 'Inspect JSON and produce final PDF' },
];

export const INITIAL_RESUME_DATA: ResumeData = {
  full_name: '',
  contact: {
    email: '',
    phone: '',
    location: '',
  },
  social_links: {
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  skills: {
    languages: [],
    frameworks: [],
    databases: [],
    tools: [],
  },
  experience: [],
  projects: [],
  achievements: [],
  education: [],
  section_order: [
    'summary',
    'skills',
    'experience',
    'projects',
    'achievements',
    'education',
  ],
};

export const SAMPLE_RESUME_DATA: ResumeData = {
  full_name: 'Anuj Tanwar',
  contact: {
    email: 'anuj@example.com',
    phone: '+91 9876543210',
    location: 'Indore, India',
  },
  social_links: {
    linkedin: 'https://linkedin.com/in/anuj',
    github: 'https://github.com/anuj',
    portfolio: 'https://anuj-tanwar.me',
  },
  summary: 'Computer Science student and engineer focused on high-throughput backend services, distributed systems, and clean RESTful API design.',
  skills: {
    languages: ['Python', 'C++', 'Java', 'TypeScript', 'SQL'],
    frameworks: ['FastAPI', 'React', 'Node.js', 'Express', 'Tailwind CSS'],
    databases: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL'],
    tools: ['Git', 'Docker', 'Linux', 'Postman', 'GitHub Actions'],
  },
  experience: [
    {
      company: 'Apex Systems',
      role: 'Backend Engineering Intern',
      location: 'Remote',
      start_date: 'June 2026',
      end_date: 'August 2026',
      description: [
        'Architected high-throughput REST APIs using FastAPI and async PostgreSQL with 99.9% uptime.',
        'Implemented Redis caching layer reducing 95th percentile response latency from 180ms to 24ms.',
        'Collaborated with senior engineers to deploy CI/CD pipelines via GitHub Actions and Docker.'
      ]
    },
    {
      company: 'TechCraft Labs',
      role: 'Junior Software Fellow',
      location: 'Indore, India',
      start_date: 'January 2026',
      end_date: 'May 2026',
      description: [
        'Developed automated database migration scripts and optimized SQL queries across 12 relational schemas.',
        'Wrote comprehensive unit and integration test suites using pytest, achieving 92% code coverage.'
      ]
    }
  ],
  projects: [
    {
      name: 'ResumeForge PDF Generator',
      description: 'Microservice engine that compiles structured JSON resumes into pixel-perfect PDF documents.',
      technologies: ['Python', 'FastAPI', 'ReportLab', 'Docker'],
      link: 'https://github.com/anuj/resume-generator'
    },
    {
      name: 'Distributed Task Queue',
      description: 'Fault-tolerant asynchronous job processor supporting worker concurrency, exponential backoff, and dead-letter queues.',
      technologies: ['Go', 'Redis', 'Protobuf', 'PostgreSQL'],
      link: 'https://github.com/anuj/dist-queue'
    }
  ],
  achievements: [
    {
      title: 'Smart India Hackathon Finalist',
      description: 'Selected among top 30 teams out of 2,400+ national submissions for building decentralized identity verification.',
      date: 'March 2026'
    },
    {
      title: 'ACM ICPC Regional Participant',
      description: 'Secured top 15 rank in regional collegiate programming contest solving algorithmic problems in C++.',
      date: '2025'
    }
  ],
  education: [
    {
      institution: 'Shri Dadaji Institute of Technology and Science',
      degree: 'Bachelor of Technology (B.Tech)',
      field_of_study: 'Computer Science & Engineering',
      start_date: '2023',
      end_date: '2027',
      grade: '8.4 CGPA'
    }
  ],
  section_order: [
    'summary',
    'skills',
    'experience',
    'projects',
    'achievements',
    'education'
  ]
};
