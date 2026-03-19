export interface PersonalInfo {
  name: string;
  pronouns: string;
  title: string;
  tagline: string;
  subTagline: string;
  about: string;
  location: string;
  email: string;
  phone: string;
  availableFor: string;
  university: string;
  connections: string;
  profileImage: string;
  resumeLink: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  type: string;
  location: string;
  mode: string;
  startDate: string;
  endDate: string;
  duration: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  techStack: string[];
  logo: string;
  color: string;
}

export interface Education {
  id: number;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  logo: string;
}

export interface SkillItem {
  name: string;
  level: number;
  icon: string;
}

export interface Skills {
  languages: SkillItem[];
  frameworks: SkillItem[];
  tools: SkillItem[];
  concepts: string[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  year: string;
  status: string;
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  color: string;
}
