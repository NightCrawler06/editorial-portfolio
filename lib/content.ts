export const profile = {
  name: "Franc Emmanuel Villavicencio",
  shortName: "Euel",
  role: "Student / Part-Time Developer",
  location: "Philippines",
  email: "villavicencio.franc@gmail.com",
  github: "https://github.com/NightCrawler06",
  headline: "Hi, I'm Euel Villavicencio",
  tagline:
    "A student and part-time developer creating apps, dashboards, APIs, and automation tools from the Philippines.",
};

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/franc-emmanuel-villavicencio/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/euel.dev/",
  },
  {
    label: "GitHub",
    href: "https://github.com/NightCrawler06/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/night.crawler06",
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
};

export const projects: Project[] = [
  {
    name: "Gym QR Credit System",
    description:
      "Python desktop admin system for member credits, QR scanning, attendance, and payments.",
    tags: ["Python", "PyQt6", "MySQL", "OpenCV"],
    href: "https://github.com/NightCrawler06/gym-qr-credit-system",
    image: "/assets/projects-pics/gym.png",
  },
  {
    name: "FervAPI Menu Platform",
    description:
      "Next.js REST API platform with categorized menu endpoints, OTP access, and a testing dashboard.",
    tags: ["Next.js", "TypeScript", "API"],
    href: "https://ferv-api.vercel.app",
    image: "/assets/projects-pics/ferv-api.png",
  },
  {
    name: "MERN Admin Dashboard",
    description:
      "Role-based management dashboard with organized data views and full CRUD workflows.",
    tags: ["MongoDB", "Express", "React", "Node"],
    href: "https://admin-dashboard-7812.onrender.com/",
    image: "/assets/projects-pics/admin-dashboard.png",
  },
  {
    name: "React Native Weather App",
    description:
      "Mobile weather app built with Expo and React Native for clean weather presentation.",
    tags: ["React Native", "Expo"],
    href: "https://github.com/NightCrawler06/Simple_Weather_App",
    image: "/assets/projects-pics/weatherApp.png",
  },
  {
    name: "Python Password Generator",
    description:
      "Tkinter desktop utility for generating personalized secure passwords.",
    tags: ["Python", "Tkinter"],
    href: "https://github.com/NightCrawler06/simple-password-generator",
    image: "/assets/projects-pics/passgen.png",
  },
  {
    name: "Python QR Tools",
    description:
      "Focused utilities for generating and decoding QR codes from custom input.",
    tags: ["Python", "QR"],
    href: "https://github.com/NightCrawler06",
    image: "/assets/projects-pics/qrcodegenerator.png",
  },
  {
    name: "First Web Portfolio",
    description:
      "Original personal website built with HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    href: "https://nightcrawler06.github.io",
    image: "/assets/projects-pics/portfolio(first).jpg",
  },
  {
    name: "React Developer Portfolio",
    description:
      "React portfolio iteration focused on component structure and presentation.",
    tags: ["React", "Portfolio"],
    href: "https://euel.vercel.app",
    image: "/assets/projects-pics/portfolio(react).jpg",
  },
  {
    name: "Python QR Code Decoder",
    description:
      "Python utility for reading QR codes and returning decoded content.",
    tags: ["Python", "QR"],
    href: "https://github.com/NightCrawler06/qr_code_decoder",
    image: "/assets/projects-pics/qrcodedecoder.png",
  },
  {
    name: "Python Video Downloader CLI",
    description:
      "Command-line video downloader for a lightweight terminal workflow.",
    tags: ["Python", "CLI"],
    href: "https://github.com/NightCrawler06/vdl",
    image: "/assets/projects-pics/code3.png",
  },
];

export const stack = [
  "Tailwind CSS",
  "React",
  "Next.js",
  "Python",
  "MongoDB",
  "TypeScript",
  "Express",
  "Node.js",
  "React Native",
  "Expo",
  "Zoho",
  "MySQL",
];

export const experience = [
  {
    type: "Experience",
    title: "Part-Time Zoho Developer",
    place: "The CRM Carpenters",
    date: "Feb 2025 - Present",
    detail:
      "Building and supporting CRM workflows, automations, and business tools for operational teams.",
    href: "https://thecrmcarpenters.com",
  },
  {
    type: "Education",
    title: "BS Information Technology",
    place: "Batangas State University ARASOF - Nasugbu",
    date: "2024 - Present",
    detail:
      "Studying systems, software, and the technical foundations behind modern applications.",
  },
  {
    type: "Education",
    title: "TVL - ICT",
    place: "Tuy Senior High School",
    date: "2022 - 2024",
    detail:
      "Early technical track focused on information and communication technology.",
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  image: string;
};

export const certificates: Certificate[] = [
  {
    title: "Microsoft Office Specialist",
    issuer: "Microsoft",
    image: "/assets/certs/mos.png",
  },
  {
    title: "Certificate 01",
    issuer: "Technical certification",
    image: "/assets/certs/cert-1.jpg",
  },
  {
    title: "Certificate 02",
    issuer: "Technical certification",
    image: "/assets/certs/cert-2.jpg",
  },
  {
    title: "Certificate 03",
    issuer: "Technical certification",
    image: "/assets/certs/cert-3.jpg",
  },
  {
    title: "Certificate 04",
    issuer: "Technical certification",
    image: "/assets/certs/cert-4.jpg",
  },
  {
    title: "Certificate 05",
    issuer: "Technical certification",
    image: "/assets/certs/cert-5.jpg",
  },
  {
    title: "Certificate 06",
    issuer: "Technical certification",
    image: "/assets/certs/cert-6.jpg",
  },
  {
    title: "Certificate 07",
    issuer: "Technical certification",
    image: "/assets/certs/cert-7.jpg",
  },
  {
    title: "Certificate 08",
    issuer: "Technical certification",
    image: "/assets/certs/cert-8.png",
  },
];
