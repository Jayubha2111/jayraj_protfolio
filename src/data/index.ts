export const personalInfo = {
  name: "Jayrajsinh Jadav",
  pronouns: "He/Him",
  title: "Software Engineer",
  tagline: "I build web experiences that are fast, beautiful, and human.",
  subTagline: "Turning ideas into elegant, performant frontend solutions.",
  about: `I am a passionate and detail-oriented Software Engineer with a strong 
  foundation in front-end web development. My technical skill set includes proficiency 
  in HTML5, CSS, JavaScript, Tailwind CSS, and React.js. I have a keen interest in 
  building responsive, user-friendly web interfaces and am constantly exploring modern 
  frameworks and best practices to enhance my development approach. Currently working 
  at Aloqa and Harich Tech, I bring real-world experience to every project I build.`,
  location: "Ahmedabad, Gujarat, India",
  email: "jayrajsinhjadav261@gmail.com",
  phone: "+91 91577 83727",
  availableFor: "Full-time & Freelance Opportunities",
  university: "LJ University",
  connections: "500+",
  profileImage: "/images/profile.jpg",
  resumeLink: "/Jayrajsinh.pdf",
};

export const socialLinks = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/jayrajsinh-jadav-6182353a4/", icon: "linkedin" },
  { platform: "GitHub", url: "https://github.com/Jayubha2111", icon: "github" },
  { platform: "Instagram", url: "https://instagram.com/jayubha_1121", icon: "instagram" },
];

export const stats = [
  { label: "Years Experience", value: 1, suffix: "+" },
  { label: "Projects Built", value: 15, suffix: "+" },
  { label: "Companies", value: 2, suffix: "" },
  { label: "Connections", value: 500, suffix: "+" },
];

export const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Aloqa",
    type: "Full-time",
    location: "Ahmedabad, Gujarat, India",
    mode: "On-site",
    startDate: "Jan 2026",
    endDate: "Present",
    duration: "3 months",
    isCurrent: true,
    description:
      "Working as a Software Engineer building modern web applications. Contributing to frontend architecture, component design, and performance optimization.",
    responsibilities: [
      "Building responsive UI components using React.js and Tailwind CSS",
      "Collaborating with design and backend teams for feature development",
      "Implementing modern frontend best practices and coding standards",
      "Performance optimization and cross-browser compatibility testing",
    ],
    techStack: ["React.js", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    logo: "/images/aloqa-logo.png",
    color: "#0066FF",
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Harich Tech",
    type: "Full-time",
    location: "Ahmedabad, Gujarat, India",
    mode: "On-site",
    startDate: "May 2025",
    endDate: "Present",
    duration: "11 months",
    isCurrent: true,
    description:
      "Developing and maintaining web applications as a Software Engineer. Focus on frontend development with React.js ecosystem.",
    responsibilities: [
      "Developed multiple client-facing web applications from scratch",
      "Created reusable component libraries for consistent UI/UX",
      "Integrated REST APIs and managed state with modern solutions",
      "Mentored junior developers on best practices",
    ],
    techStack: ["React.js", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Git"],
    logo: "/images/harich-logo.png",
    color: "#FF6B35",
  },
];

export const education = [
  {
    id: 1,
    degree: "Postgraduate",
    field: "Computer Science / Information Technology",
    institution: "LJ University",
    location: "Ahmedabad, Gujarat, India",
    startYear: "2023",
    endYear: "2025",
    isCurrent: false,
    description:
      "Postgraduate studies with focus on web technologies, software engineering principles, and modern development frameworks.",
    achievements: [
      "Strong foundation in Data Structures & Algorithms",
      "Web Development specialization",
      "Active member of university tech community",
    ],
    logo: "/images/lju-logo.png",
  },
];

export const skills = {
  languages: [
    { name: "JavaScript", level: 88, icon: "⚡" },
    { name: "TypeScript", level: 72, icon: "🔷" },
    { name: "HTML5", level: 95, icon: "🌐" },
    { name: "CSS3", level: 90, icon: "🎨" },
  ],
  frameworks: [
    { name: "React.js", level: 85, icon: "⚛️" },
    { name: "Next.js", level: 75, icon: "▲" },
    { name: "Tailwind CSS", level: 92, icon: "🌊" },
  ],
  tools: [
    { name: "Git & GitHub", level: 82, icon: "🔧" },
    { name: "VS Code", level: 95, icon: "💻" },
    { name: "Figma", level: 65, icon: "🎯" },
    { name: "Postman", level: 70, icon: "📮" },
    { name: "npm/yarn", level: 85, icon: "📦" },
  ],
  concepts: [
    "Responsive Design",
    "REST APIs",
    "Component Architecture",
    "State Management",
    "Performance Optimization",
    "Cross-browser Compatibility",
    "Agile/Scrum",
    "Clean Code Principles",
  ],
};

export const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    subtitle: "Full-featured admin panel for online stores",
    description:
      "A comprehensive admin dashboard for e-commerce management with real-time analytics, inventory management, order tracking, and sales visualization. Built with React.js and modern UI patterns.",
    longDescription:
      "This project involved building a complete e-commerce management system from scratch. Key challenges included real-time data updates, complex state management across multiple features, and ensuring performance with large datasets.",
    tags: ["React.js", "Tailwind CSS", "JavaScript", "Chart.js", "REST API"],
    category: "Web App",
    image: "/images/projects/ecommerce-dashboard.jpg",
    liveUrl: "https://project1.vercel.app",
    githubUrl: "https://github.com/jayrajsinhjadav/ecommerce-dashboard",
    featured: true,
    year: "2025",
    status: "Live",
    color: "#6366F1",
  },
  {
    id: 2,
    title: "Task Management App",
    subtitle: "Kanban-style project management tool",
    description:
      "A drag-and-drop task management application with Kanban boards, task assignments, priority levels, deadlines, and team collaboration features. Responsive design works seamlessly on all devices.",
    longDescription:
      "Built to solve real team productivity challenges. Implemented drag-and-drop with smooth animations, real-time updates, and a clean, intuitive interface that reduces cognitive load.",
    tags: ["React.js", "JavaScript", "CSS3", "LocalStorage", "Drag & Drop"],
    category: "Web App",
    image: "/images/projects/task-manager.jpg",
    liveUrl: "https://project2.vercel.app",
    githubUrl: "https://github.com/jayrajsinhjadav/task-manager",
    featured: true,
    year: "2025",
    status: "Live",
    color: "#10B981",
  },
  {
    id: 3,
    title: "Portfolio Website v1",
    subtitle: "Personal portfolio with modern animations",
    description:
      "My first personal portfolio website showcasing projects and skills. Built with pure HTML, CSS, and JavaScript with smooth scroll animations, responsive layouts, and interactive elements.",
    longDescription:
      "This was my entry into web development — a fully handcrafted portfolio site without any frameworks, teaching me the fundamentals deeply.",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive"],
    category: "Portfolio",
    image: "/images/projects/portfolio-v1.jpg",
    liveUrl: "https://project3.vercel.app",
    githubUrl: "https://github.com/jayrajsinhjadav/portfolio-v1",
    featured: false,
    year: "2024",
    status: "Live",
    color: "#F59E0B",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    subtitle: "Real-time weather app with beautiful UI",
    description:
      "A weather application consuming OpenWeather API displaying current conditions, 7-day forecasts, hourly breakdowns, and location-based weather with dynamic backgrounds matching weather conditions.",
    longDescription:
      "Focused heavily on API integration, error handling, and creating a UI that dynamically adapts to weather conditions — from sunny gradients to stormy dark themes.",
    tags: ["React.js", "API Integration", "Tailwind CSS", "Geolocation"],
    category: "Web App",
    image: "/images/projects/weather-app.jpg",
    liveUrl: "https://project4.vercel.app",
    githubUrl: "https://github.com/jayrajsinhjadav/weather-app",
    featured: true,
    year: "2024",
    status: "Live",
    color: "#0EA5E9",
  },
  {
    id: 5,
    title: "Restaurant Landing Page",
    subtitle: "Modern restaurant website with animations",
    description:
      "A premium restaurant website with smooth scroll animations, interactive menu, reservation system UI, gallery section, and fully responsive design across all breakpoints.",
    longDescription:
      "A client-focused project emphasizing visual appeal and conversion optimization. Every section was crafted to guide the user toward making a reservation.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    category: "Landing Page",
    image: "/images/projects/restaurant.jpg",
    liveUrl: "https://project5.vercel.app",
    githubUrl: "https://github.com/jayrajsinhjadav/restaurant-site",
    featured: false,
    year: "2024",
    status: "Live",
    color: "#EF4444",
  },
  {
    id: 6,
    title: "Quiz Application",
    subtitle: "Interactive quiz app with score tracking",
    description:
      "A feature-rich quiz application with multiple categories, timed questions, score tracking, leaderboard, and animated transitions between questions. Supports both light and dark themes.",
    longDescription:
      "Built to test and solidify JavaScript fundamentals. Implemented complex state logic, timer management, and local score persistence.",
    tags: ["JavaScript", "HTML5", "CSS3", "LocalStorage"],
    category: "Web App",
    image: "/images/projects/quiz-app.jpg",
    liveUrl: "https://project6.vercel.app",
    githubUrl: "https://github.com/jayrajsinhjadav/quiz-app",
    featured: false,
    year: "2024",
    status: "Live",
    color: "#8B5CF6",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Colleague at Aloqa",
    role: "Senior Developer",
    company: "Aloqa",
    avatar: "/images/testimonials/t1.jpg",
    text: "Jayrajsinh is a dedicated and quick learner. He picks up new concepts fast and delivers clean, well-structured code. A great team player who always brings positive energy.",
    rating: 5,
  },
  {
    id: 2,
    name: "Team Lead",
    role: "Tech Lead",
    company: "Harich Tech",
    avatar: "/images/testimonials/t2.jpg",
    text: "Working with Jayrajsinh has been a pleasure. His attention to detail in UI development and willingness to go beyond requirements sets him apart. Highly recommend.",
    rating: 5,
  },
  {
    id: 3,
    name: "University Professor",
    role: "Faculty",
    company: "LJ University",
    avatar: "/images/testimonials/t3.jpg",
    text: "One of the most enthusiastic students I have taught. Jayrajsinh has exceptional problem-solving skills and a genuine passion for web development that will take him far.",
    rating: 5,
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    id: 1,
    number: "01",
    title: "Frontend Development",
    description:
      "Building pixel-perfect, responsive web interfaces using React.js, Next.js, and Tailwind CSS with a focus on performance and user experience.",
    tags: ["React.js", "Next.js", "Tailwind CSS"],
    icon: "monitor",
    color: "#6366F1",
  },
  {
    id: 2,
    number: "02",
    title: "Responsive Web Design",
    description:
      "Creating mobile-first, fully responsive websites that look and perform flawlessly across all screen sizes and devices.",
    tags: ["HTML5", "CSS3", "Mobile-First"],
    icon: "smartphone",
    color: "#10B981",
  },
  {
    id: 3,
    number: "03",
    title: "API Integration",
    description:
      "Seamlessly integrating REST APIs into frontend applications with proper error handling, loading states, and data management.",
    tags: ["REST API", "Axios", "Fetch"],
    icon: "zap",
    color: "#F59E0B",
  },
  {
    id: 4,
    number: "04",
    title: "Performance Optimization",
    description:
      "Auditing and optimizing web applications for speed, accessibility, and Core Web Vitals to deliver the best user experience.",
    tags: ["Lighthouse", "Core Web Vitals", "SEO"],
    icon: "trending-up",
    color: "#EF4444",
  },
];
