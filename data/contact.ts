export interface ContactCardItem {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: "email" | "github" | "linkedin" | "instagram";
  fullWidth?: boolean;
}

export interface ContactData {
  eyebrow: string;
  heading: string;
  description: string;
  items: ContactCardItem[];
}

export const CONTACT_DATA: ContactData = {
  eyebrow: "LET'S TALK",
  heading: "Get In Touch",
  description:
    "Punya ide, proyek, atau peluang kolaborasi? Mari terhubung dan wujudkan bersama.",
  items: [
    {
      id: "email",
      label: "Email",
      value: "ramdhona13@gmail.com",
      href: "mailto:ramdhona13@gmail.com",
      icon: "email",
      fullWidth: true,
    },
    {
      id: "github",
      label: "Github",
      value: "ramdhona",
      href: "https://github.com/ramdhona",
      icon: "github",
      fullWidth: false,
    },
    {
      id: "linkedin",
      label: "Linkedin",
      value: "Dwi Ramdhona",
      href: "https://www.linkedin.com/in/dwi-ramdhona-300560188/",
      icon: "linkedin",
      fullWidth: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "ramdhona_666",
      href: "https://instagram.com/ramdhona_666",
      icon: "instagram",
      fullWidth: true,
    },
  ],
};
