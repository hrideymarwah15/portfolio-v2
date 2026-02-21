export const SITE_CONFIG = {
  name: "Hridey Marwah",
  role: "Full-Stack Developer",
  tagline: "Building digital experiences that matter.",
  description:
    "I craft performant, aesthetic web applications with modern tooling. Open-source contributor, problem solver, and lifelong learner.",
  github: "hrideymarwah15",
  leetcode: "hrideymarwah15",
  email: "hrideymarwah15@gmail.com",
  linkedin: "https://linkedin.com/in/hrideymarwah",
  resume: "/resume.pdf",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = {
  Languages: ["TypeScript", "Python", "JavaScript", "Java", "SQL"],
  Frameworks: ["Next.js", "React", "Node.js", "Express", "Flask"],
  Tools: ["Git", "Docker", "Vercel", "Supabase", "PostgreSQL"],
  Libraries: ["Tailwind CSS", "Framer Motion", "shadcn/ui", "Three.js"],
};

export const PROJECTS = [
  {
    id: 1,
    title: "Portfolio V1",
    description:
      "My first portfolio featuring 3D keyboard interactions, LeetCode/GitHub integrations, and a custom blog powered by Supabase.",
    longDescription:
      "Built with Next.js 14 and Supabase as the sole backend. Features a 3D interactive keyboard rendered with Three.js, real-time GitHub contribution graphs, and a full MDX-powered blog with a dashboard for content management.",
    techStack: ["Next.js", "Supabase", "Three.js", "Tailwind CSS", "MDX"],
    liveUrl: "https://hrideymarwah.vercel.app",
    githubUrl: "https://github.com/hrideymarwah15/portfolio",
    image: "/projects/portfolio-v1.png",
    featured: true,
  },
  {
    id: 2,
    title: "RealmConnect",
    description:
      "A real-time multiplayer platform with matchmaking, chat, and game lobbies.",
    longDescription:
      "Full-stack real-time application built for seamless multiplayer experiences. Features WebSocket-based matchmaking, persistent game states, and an intuitive lobby system.",
    techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    liveUrl: "#",
    githubUrl: "https://github.com/hrideymarwah15/RealmConnect",
    image: "/projects/realmconnect.png",
    featured: true,
  },
  {
    id: 3,
    title: "Study Assistant",
    description:
      "An AI-powered study companion that generates flashcards, quizzes, and summaries from your notes.",
    longDescription:
      "Leverages LLM APIs to parse uploaded notes and automatically generate study materials. Built with a focus on UX — clean interface, spaced repetition tracking, and export capabilities.",
    techStack: ["Python", "Flask", "React", "OpenAI API", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/hrideymarwah15/Studyassistant",
    image: "/projects/studyassistant.png",
    featured: false,
  },
  {
    id: 4,
    title: "WaoTribe",
    description:
      "A community-driven platform for collaborative learning and mentorship.",
    longDescription:
      "Social platform connecting learners with mentors across disciplines. Features group discussions, resource sharing, and progress tracking with gamification elements.",
    techStack: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
    liveUrl: "#",
    githubUrl: "https://github.com/hrideymarwah15/WaoTribe",
    image: "/projects/waotribe.png",
    featured: false,
  },
];

export const EXPERIENCE = [
  {
    role: "Open Source Contributor",
    company: "JAX / Google DeepMind",
    period: "2025 - Present",
    description:
      "Contributing to the JAX numerical computing library. Implemented companion matrix functionality, refined error checking logic, and collaborated with core maintainers on PR reviews.",
    techStack: ["Python", "JAX", "NumPy"],
  },
  {
    role: "Full-Stack Developer",
    company: "Freelance & Personal Projects",
    period: "2024 - Present",
    description:
      "Designed and built multiple production web applications including real-time platforms, AI-powered tools, and community platforms. Focus on Next.js, Supabase, and modern frontend architecture.",
    techStack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
  },
  {
    role: "Computer Science Student",
    company: "Rishihood University",
    period: "2023 - Present",
    description:
      "Pursuing B.Tech in Computer Science. Organized the university sports fest, built internal tools for academic tracking, and led multiple technical initiatives.",
    techStack: ["Data Structures", "Algorithms", "System Design"],
  },
];
