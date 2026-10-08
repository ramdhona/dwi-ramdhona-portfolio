export type TimelineIconType = "education" | "work" | "project" | "organization";

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  skills: string[];
  icon: TimelineIconType;
}

export interface TimelineData {
  eyebrow: string;
  heading: string;
  description: string;
  items: TimelineItem[];
}

export const TIMELINE_DATA: TimelineData = {
  eyebrow: "My Journey",
  heading: "A Journey of Growth",
  description:
    "Menelusuri perjalanan pendidikan, pengalaman, dan berbagai proses yang membantu saya berkembang hingga menjadi pribadi dan profesional seperti sekarang.",
  items: [
    // 1. Freelance
    {
      id: "freelance",
      period: "2023 – Sekarang",
      title: "Web Developer & UI/UX Designer",
      organization: "Freelance",
      description:
        "Menangani berbagai project digital mulai dari perancangan UI/UX hingga pengembangan website sesuai kebutuhan klien.",
      skills: ["UI/UX Design", "Web Development", "Figma", "Frontend Dev", "Responsive Design"],
      icon: "work",
    },

    // 2. BTIK Universitas Dian Nuswantoro — Kuliah Kerja Industri / Web Developer
    {
      id: "btik-udinus-kki",
      period: "1 Juni 2025 – 31 Januari 2026",
      title: "Kuliah Kerja Industri — Web Developer",
      organization: "BTIK Universitas Dian Nuswantoro",
      description:
        "Melaksanakan Kuliah Kerja Industri sebagai Web Developer dengan terlibat dalam pengembangan dan implementasi website serta solusi digital.",
      skills: ["Web Development", "Frontend Dev", "Digital Solutions", "Teamwork", "Problem Solving"],
      icon: "project",
    },

    // 3. Universitas Dian Nuswantoro — Teknik Informatika
    {
      id: "udinus-ti",
      period: "September 2022 – September 2026",
      title: "Teknik Informatika",
      organization: "Universitas Dian Nuswantoro",
      description:
        "Menempuh pendidikan Teknik Informatika dengan mempelajari pemrograman, pengembangan web, basis data, dan rekayasa perangkat lunak.",
      skills: ["Pemrograman Web", "Basis Data", "Rekayasa Perangkat Lunak", "Algoritma", "UI/UX Design"],
      icon: "education",
    },

    // 4. CV. Seven Media Technology — Part-time UI/UX Designer
    {
      id: "smt-parttime-uiux",
      period: "Agustus 2022 – Juli 2023",
      title: "Part-time UI/UX Designer",
      organization: "CV. Seven Media Technology",
      description:
        "Merancang antarmuka dan pengalaman pengguna untuk berbagai kebutuhan digital dengan pendekatan UI/UX dan prototyping.",
      skills: ["UI/UX Design", "Figma", "Prototyping", "Wireframing", "Design System"],
      icon: "work",
    },

    // 5. CV. Seven Media Technology — Internship Frontend Developer
    {
      id: "smt-intern-frontend",
      period: "Juni 2022 – Juli 2022",
      title: "Internship Frontend Developer",
      organization: "CV. Seven Media Technology",
      description:
        "Berfokus pada pengembangan antarmuka website menggunakan HTML, CSS, JavaScript, dan penerapan responsive web design.",
      skills: ["HTML5", "CSS3", "JavaScript", "Frontend Dev", "Responsive Web Design"],
      icon: "project",
    },

    // 6. CV. Seven Media Technology — Praktik Kerja Lapangan
    {
      id: "smt-pkl",
      period: "Januari 2021 – Maret 2021",
      title: "Praktik Kerja Lapangan",
      organization: "CV. Seven Media Technology",
      description:
        "Mendapatkan pengalaman awal di lingkungan kerja profesional serta menerapkan pengetahuan pengembangan perangkat lunak.",
      skills: ["Pengembangan Perangkat Lunak", "Web Basics", "Teamwork", "Problem Solving"],
      icon: "organization",
    },

    // 7. SMK Texmaco Semarang — Rekayasa Perangkat Lunak
    {
      id: "texmaco-rpl",
      period: "2019 – 2022",
      title: "Rekayasa Perangkat Lunak",
      organization: "SMK Texmaco Semarang",
      description:
        "Mempelajari dasar-dasar pemrograman, pengembangan website, basis data, dan rekayasa perangkat lunak.",
      skills: ["HTML & CSS", "JavaScript", "PHP", "MySQL", "Rekayasa Perangkat Lunak"],
      icon: "education",
    },
  ],
};
