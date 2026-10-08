export interface InterestItem {
  id: string;
  name: string;
  icon: "code" | "design" | "codexml" | "scansearch";
}

export interface EducationItem {
  id: string;
  institution: string;
  major: string;
  period: string;
  theme: "purple" | "teal";
  logo: string;
}

export interface AboutData {
  eyebrow: string;
  heading: string;
  bio: string;
  interestsHeading: string;
  educationHeading: string;
  interests: InterestItem[];
  education: EducationItem[];
}

export const ABOUT_DATA: AboutData = {
  eyebrow: "Get to know me",
  heading: "About Me",
  bio: "Saya adalah lulusan S1 Teknik Informatika Universitas Dian Nuswantoro yang memiliki pengalaman dalam pengembangan website dan desain antarmuka. Saya tertarik menciptakan website yang responsif, fungsional, dan user-friendly dengan menggabungkan kemampuan frontend development dan UI/UX design.",
  interestsHeading: "Interests",
  educationHeading: "Education",
  interests: [
    { id: "frontend", name: "Frontend Development", icon: "codexml" },
    { id: "uiux", name: "UI/UX Design", icon: "design" },
    { id: "seo", name: "Search Engine Optimization", icon: "scansearch" },
    { id: "webdev", name: "Web Development", icon: "code" },
  ],
  education: [
    {
      id: "udinus",
      institution: "Universitas Dian Nuswantoro",
      major: "Informatics Engineering",
      period: "2022 - 2026",
      theme: "purple",
      logo: "/assets/education/udinus.webp",
    },
    {
      id: "texmaco",
      institution: "SMK Texmaco Semarang",
      major: "Software Engineering",
      period: "2019 - 2022",
      theme: "teal",
      logo: "/assets/education/smk-texmaco-semarang.webp",
    },
  ],
};
