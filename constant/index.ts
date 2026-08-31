import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons";

export type SocialItem = {
  name: string;
  href: string;
  icon: IconType;
};

export const socials: SocialItem[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/razhaaf",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/firazhafiz/",
    icon: FaLinkedin,
  },
  { name: "GitHub", href: "https://github.com/firazhafiz/", icon: FaGithub },
];

export const servicesData = [
  {
    title: "FullStack Development",
    description:
      "Your business deserves a fast, secure, and future-proof digital foundation. I develop custom web apps with clean architecture, optimized databases, and seamless integrations—ensuring reliability at every layer.",
    items: [
      {
        title: "Frontend Excellence",
        description: "(React, Tailwind, TypeScript, Laravel, Next.js)",
      },
      {
        title: "Backend Engineering",
        description: "(REST/GraphQL APIs, Microservices, Auth Systems)",
      },
      {
        title: "Project Management",
        description: "(Agile, Scrum, Jira, Trello)",
      },
    ],
  },
  {
    title: "Creative Creator",
    description:
      "Turn ideas into captivating visuals that resonate. I deliver high-quality photography, videography, and graphic design using the latest industry-standard tools to bring your brand story to life.",
    items: [
      {
        title: "Photography",
        description: "(Adobe Lightroom, Capture One, Sony A7 series)",
      },
      {
        title: "Videography",
        description: "(DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro)",
      },
      {
        title: "Graphic Design",
        description: "(Figma, Adobe Photoshop, Illustrator)",
      },
    ],
  },
  {
    title: "Cinematography",
    description:
      "Craft cinematic stories with professional direction, lighting, and narrative depth. From concept to final cut, I bring film-grade production quality to your visual projects.",
    items: [
      {
        title: "Director",
        description: "(Storyboarding, Shot Composition, Creative Vision)",
      },
      {
        title: "Script Writer",
        description: "(Narrative Structure, Dialogue, Scene Breakdowns)",
      },
      {
        title: "Gaffer",
        description: "(Lighting Design, Cinematic Rigs, ARRI, Aputure Systems)",
      },
    ],
  },
];
export const projects = [
  {
    id: 1,
    name: "HRIS Toshin Prima Fine Blanking",
    description:
      "A comprehensive Human Resource Information System designed to manage employee attendance, payroll, and data specifically for Toshin Prima Fine Blanking.",
    preview: "https://angkutin-omega.vercel.app/",
    image: "/assets/hris-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "React Native" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Supabase" },
      { id: 4, name: "Express.js" },
    ],
  },
  {
    id: 2,
    name: "Angkutin",
    description:
      "A smart waste management system designed to optimize waste collection and monitoring through intelligent technology.",
    preview: "https://angkutin-ten.vercel.app/",
    image: "/assets/angkutin-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Nest.js" },
      { id: 3, name: "Tensorflow" },
      { id: 4, name: "Supabase" },
    ],
  },
  {
    id: 3,
    name: "Travel Gundul Trans",
    description:
      "A specialized transportation booking and management platform for Gundul Trans, facilitating seamless travel reservations and fleet scheduling.",
    preview: "https://pm-copilot.vercel.app/",
    image: "/assets/gundul-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Supabase" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Node.js" },
    ],
  },
  {
    id: 4,
    name: "Predictive Maintenance Copilot",
    description:
      "An AI powered predictive maintenance web application that leverages machine learning to forecast equipment failures, optimize maintenance schedules, and reduce downtime for industrial operations.",
    preview: "https://pm-copilot.vercel.app/",
    image: "/assets/copilot-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Gemini API" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Prometheus TSDB" },
    ],
  },
  {
    id: 5,
    name: "Dcoffee Cup",
    description:
      "A point of sale and inventory management system designed for coffee shops to streamline transactions and monitor real-time stock levels.",
    preview: "https://dcoffeecup.vercel.app/",
    image: "/assets/dcoffee-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Shadcn UI" },
    ],
  },
  {
    id: 6,
    name: "ShiftPlanner",
    description:
      "A dynamic employee scheduling dashboard that allows managers to organize work shifts, track employee hours, and optimize workforce distribution.",
    preview: "https://bankdash-indol.vercel.app/",
    image: "/assets/shiftplanner-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Shadcn UI" },
      { id: 4, name: "Dexie.js" },
    ],
  },
  {
    id: 7,
    name: "BankDash.",
    description:
      "Dashboard for bank for user to manage their accounts and transactions.",
    preview: "https://bankdash-indol.vercel.app/",
    image: "/assets/bankdash-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Shadcn UI" },
    ],
  },
  {
    id: 8,
    name: "Toko Kopi Padma",
    description:
      "Wesbite for coffee shop to manage their inventory and transactions.",
    preview: "https://kopipadma.vercel.app/",
    image: "/assets/padma-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Shadcn UI" },
    ],
  },
  {
    id: 9,
    name: "Berkat Sejahtera Mobil",
    description:
      "Car Showroom Website for Berkat Sejahtera Mobil to sell or buy cars.",
    preview: "https://berkatsejahteramobil.netlify.app/",
    image: "/assets/berkat-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Shadcn UI" },
    ],
  },

  {
    id: 10,
    name: "Sadari 4Life",
    description:
      "A hypertension screening website that allows users to perform self-assessments through interactive tests for early detection and management.",
    preview: "https://sadari4life.vercel.app/",
    image: "/assets/sadari4life-cover.png",
    category: "programming",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Prisma (ORM)" },
    ],
  },
  {
    id: 11,
    name: "Aftermovie BWAI x IWD 2026",
    description:
      "An aftermovie capturing the highlights, insights, and key moments from the Build With AI x International Women's Day 2026 workshop. ",
    preview:
      "https://www.instagram.com/reel/DYPKkJSzaYr/?igsh=cTh2OW9tZHo3eDY1",
    image: "/assets/aftermovie-bwai.png",
    category: "creative",
    frameworks: [
      { id: 1, name: "Coordinator" },
      { id: 2, name: "Photographer" },
      { id: 3, name: "Graphic Designer" },
    ],
  },
  {
    id: 12,
    name: "Catatan Akhir Sekolah 74 SMAN 1 Madiun",
    description:
      "A documentary film capturing the journey of the Class of 74 at SMAN 1 Madiun and preserving their final moments of high school years.",
    preview: "https://www.youtube.com/watch?v=KYcp1ZC5v-U&t=71s",
    image: "/assets/cas74.jpg",
    category: "creative",
    frameworks: [
      { id: 1, name: "Director" },
      { id: 2, name: "Script Writer" },
      { id: 3, name: "Gaffer" },
    ],
  },
  {
    id: 13,
    name: "BANGKIT - Cinematography SMA Awards",
    description:
      "A prestigious high school cinematography awards event celebrating outstanding filmmaking in the Indonesian education community.",
    preview: "https://www.youtube.com/watch?v=KTGtOQgDrOo&t=344s",
    image: "/assets/bangkit.jpg",
    category: "creative",
    frameworks: [
      { id: 1, name: "Director" },
      { id: 2, name: "Cinematographer" },
    ],
  },
  {
    id: 14,
    name: "Teaser PKKMB FT Unesa 2024",
    description:
      "A promotional teaser video for the Freshman Orientation Program (PKKMB) at the Faculty of Engineering, State University of Surabaya.",
    preview:
      "https://www.instagram.com/reel/C99mrI6pU8d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
    image: "/assets/teaser-ft.png",
    category: "creative",
    frameworks: [
      { id: 1, name: "Director" },
      { id: 2, name: "Cinematographer" },
      { id: 3, name: "Script Writer" },
    ],
  },
  {
    id: 15,
    name: "Aftermovie PKKMB FT Unesa 2024",
    description:
      "A cinematic aftermovie capturing the highlights and memorable moments from the Freshman Orientation Program (PKKMB) at the Faculty of Engineering, State University of Surabaya, celebrating the beginning of new students' academic journey.",
    preview:
      "https://www.instagram.com/reel/C_xt9xsAvCj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
    image: "/assets/aftermovie-ft.png",
    category: "creative",
    frameworks: [
      { id: 1, name: "Editor" },
      { id: 2, name: "Director" },
      { id: 3, name: "Videographer" },
    ],
  },
  {
    id: 16,
    name: "Aftermovie Google CNE Surabaya 2025",
    description:
      "Documenting a comprehensive tech workshop series on cloud computing, artificial intelligence, and data analytics held in Surabaya, featuring hands-on learning experiences and expert insights from industry leaders.",
    preview:
      "https://www.instagram.com/reel/DNDBqCfxHWb/?igsh=d3NzdjZtOGpwdmFx",
    image: "/assets/aftermovie-cne.png",
    category: "creative",
    frameworks: [
      { id: 1, name: "Editor" },
      { id: 2, name: "Director" },
      { id: 3, name: "Videographer" },
    ],
  },
];

export type ExperienceItem = {
  id: number;
  year: number;
  title: string;
  description: string[];
  image: string;
};

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    year: 2026,
    title: "Google Student Ambassador 2026",
    description: [
      "Representing Google on campus and fostering a developer community",
      "Organizing workshops and events focused on Google technologies",
      "Connecting students with Google resources and career opportunities",
    ],
    image: "/assets/gsa26.png",
  },
  {
    id: 2,
    year: 2025,
    title: "Cohort of Asah by Dicoding",
    description: [
      "Began learning React, Backend, and AI fundamentals",
      "Created projects to apply learned concepts",
      "Explored React and modern frontend frameworks",
    ],
    image: "/assets/asah.png",
  },
  {
    id: 3,
    year: 2025,
    title: "Co-Director Creative Media of Google DGOC Unesa",
    description: [
      "Directed and produced video content for events",
      "Collaborated with teams on large-scale projects",
      "Expanded expertise in cloud computing and AI",
    ],
    image: "/assets/gdgoc.png",
  },
  {
    id: 4,
    year: 2024,
    title: "Hai.Volunteer Internship Batch 6.0",
    description: [
      "Volunteered as a photographer and videographer",
      "Worked as graphic designer for the event",
      "Make some contents for event media partnership",
    ],
    image: "/assets/haivo.png",
  },
  {
    id: 5,
    year: 2023,
    title: "Director of Catatan Akhir Sekolah 74 SMAN 1 Madiun",
    description: [
      "Directed and produced a documentary film",
      "Worked as a script writer and gaffer",
      "Collaborated with teams on the film production",
    ],
    image: "/assets/cas.JPG",
  },
];

export type CertificationItem = {
  image: string;
  title: string;
  author: string;
  credentialUrl: string;
};

export const certifications: CertificationItem[] = [
  {
    image: "/images/gsa.png",
    title: "Google Student Ambassador 2026",
    author: "Google Indonesia",
    credentialUrl: "",
  },
  {
    image: "/images/asah.jpg",
    title: "Cohort of Asah 2025 React Backend & AI",
    author: "Dicoding Academy",
    credentialUrl: "",
  },
  {
    image: "/images/gdgoc.jpg",
    title:
      "Core Team Google Developer Group on Campus State University of Surabaya",
    author: "GDGOC Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/companyvisit.jpg",
    title:
      "Company Visit - Exploring Technology and Work Culture in the Digital Industry",
    author: "Google Developer Group on Campus Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/gemini.jpg",
    title: "Gemini Student University",
    author: "Google",
    credentialUrl:
      "https://edu.google.accredible.com/a24f1459-9a23-4b0b-944c-4a0975079ca4#acc.aKn9tPvb",
  },
  {
    image: "/images/mernwpu.png",
    title: "Mern Stack Course",
    author: "WPU Course",
    credentialUrl: "https://learn.wpucourse.id/certificate/TK1D1IFD",
  },
  {
    image: "/images/es3.png",
    title:
      "Event Series 3 - Exploring AI and Blockchain for a Smarter Digital Economy",
    author: "Google Developer Group on Campus Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/konaspi.jpg",
    title: "Konvensi Nasional Pendidikan Indonesia 2024",
    author: "Kece Media Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/hackerank.jpg",
    title: "Software Engineer",
    author: "HackerRank",
    credentialUrl: "https://www.hackerrank.com/certificates/456edf13e03b",
  },
  {
    image: "/images/pzntypescript.jpg",
    title: "Pemrograman TypeScript : Pemula sampai Mahir",
    author: "Progammer Zaman Now",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-9a07da83-6e60-4cd2-aeb6-b4a894adb681/",
  },
  {
    image: "/images/pemateri.png",
    title: "Pemateri Youth Public Innovation Research",
    author: "YPIR Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/fundamental-be.jpg",
    title: "Belajar Fundamental Backend dengan JavaScript",
    author: "Dicoding Academy",
    credentialUrl: "https://www.dicoding.com/certificates/KEXL2WMVWZG2",
  },
];

export default certifications;

export const contactInfo = {
  email: "firazfulvianhafiz05@gmail.com",
  phone: "0823-3267-6848",
  socials: [
    {
      icon: "linkedin",
      href: "https://linkedin.com/in/firazhafiz",
      label: "LinkedIn",
    },
    {
      icon: "github",
      href: "https://github.com/firazhafiz",
      label: "GitHub",
    },
    {
      icon: "instagram",
      href: "https://instagram.com/razhaaf",
      label: "Instagram",
    },
    {
      icon: "whatsapp",
      href: "https://wa.me/6282332676848",
      label: "WhatsApp",
    },
  ],
};
