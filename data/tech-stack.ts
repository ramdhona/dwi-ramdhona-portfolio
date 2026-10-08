export interface TechStackItem {
  id: string;
  name: string;
  image: string;
  darkImage?: string;
}

export interface TechStackData {
  eyebrow: string;
  heading: string;
  description: string;
  technologies: TechStackItem[];
}

export const TECH_STACK_DATA: TechStackData = {
  eyebrow: "MY TOOLKIT",
  heading: "Tech Stack",
  description:
    "Teknologi dan tools yang saya gunakan untuk membangun website, merancang antarmuka, dan mengembangkan solusi digital.",
  technologies: [
    { id: "figma", name: "Figma", image: "/assets/techstack/figma.webp" },
    { id: "html", name: "HTML", image: "/assets/techstack/html.webp" },
    { id: "css", name: "CSS", image: "/assets/techstack/css.webp" },
    { id: "javascript", name: "JavaScript", image: "/assets/techstack/javascript.webp" },
    { id: "react", name: "React", image: "/assets/techstack/react.webp" },
    {
      id: "nextjs",
      name: "Next.js",
      image: "/assets/techstack/next_js.webp",
      darkImage: "/assets/techstack/next_js_white.webp",
    },
    { id: "tailwindcss", name: "Tailwind CSS", image: "/assets/techstack/tailwind.webp" },
    { id: "laravel", name: "Laravel", image: "/assets/techstack/laravel.webp" },
    { id: "php", name: "PHP", image: "/assets/techstack/php.webp" },
    { id: "mysql", name: "MySQL", image: "/assets/techstack/mysql.webp" },
    { id: "git", name: "Git", image: "/assets/techstack/git.webp" },
    { id: "wordpress", name: "WordPress", image: "/assets/techstack/wordpress.webp" },
  ],
};
