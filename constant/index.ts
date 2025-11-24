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
    name: "Diary Food",
    description:
      "A website used as inspiration for finding various local and international recipes for food and drinks.",
    preview: "https://diary-food1222.vercel.app/",
    github: "https://github.com/firazhafiz/FE-DiaryFood",
    image: "/assets/diaryfood.png",
    bgImage: "/images/kitchen.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "AI Integration" },
    ],
  },
  {
    id: 2,
    name: "Nesavent",
    description:
      "Landing page website for an event management platform at Surabaya State University.",
    preview: "https://nesavent.vercel.app/",
    github: "https://github.com/firazhafiz/landingpage-nesavent",
    image: "/assets/nesavent.png",
    bgImage: "/images/event.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Angkutin",
    description:
      "A smart waste management system designed to optimize waste collection and monitoring through intelligent technology.",
    preview: "https://angkutin-omega.vercel.app/",
    github: "https://github.com/firazhafiz/fe-angkutin",
    image: "/assets/angkutin.png",
    bgImage: "/images/trash.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Laravel as BE" },
      { id: 4, name: "Express.js" },
    ],
  },
  {
    id: 4,
    name: "Sadari 4Life",
    description:
      "A hypertension screening website that allows users to perform self-assessments through interactive tests for early detection and management.",
    preview: "https://sadari4life.vercel.app/",
    github: "https://github.com/firazhafiz/fe-sadari",
    image: "/assets/sadari.png",
    bgImage: "/images/hospital.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Prisma (ORM)" },
    ],
  },
  {
    id: 5,
    name: "Catatan Akhir Sekolah 74 SMAN 1 Madiun",
    description:
      "A documentary film capturing the journey of the Class of 74 at SMAN 1 Madiun and preserving their final moments of high school years.",
    preview: "https://www.youtube.com/watch?v=KYcp1ZC5v-U&t=71s",
    image: "/assets/cas74.jpg",
    bgImage: "/images/cas.JPG", // Placeholder
    frameworks: [
      { id: 1, name: "Director" },
      { id: 2, name: "Script Writer" },
      { id: 3, name: "Gaffer" },
    ],
  },
  {
    id: 6,
    name: "BANGKIT - Cinematography SMA Awards",
    description:
      "A prestigious high school cinematography awards event celebrating outstanding filmmaking in the Indonesian education community.",
    preview: "https://www.youtube.com/watch?v=KTGtOQgDrOo&t=344s",
    image: "/assets/bangkit.jpg",
    bgImage: "/images/cinemato.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Director" },
      { id: 2, name: "Cinematographer" },
    ],
  },
  {
    id: 7,
    name: "Teaser PKKMB FT Unesa 2024",
    description:
      "A promotional teaser video for the Freshman Orientation Program (PKKMB) at the Faculty of Engineering, State University of Surabaya.",
    preview:
      "https://www.instagram.com/reel/C99mrI6pU8d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
    image: "/assets/teaser-ft.png",
    bgImage: "/images/ft.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Director" },
      { id: 2, name: "Cinematographer" },
      { id: 3, name: "Script Writer" },
    ],
  },
  {
    id: 8,
    name: "Aftermovie PKKMB FT Unesa 2024",
    description:
      "A cinematic aftermovie capturing the highlights and memorable moments from the Freshman Orientation Program (PKKMB) at the Faculty of Engineering, State University of Surabaya, celebrating the beginning of new students' academic journey.",
    preview:
      "https://www.instagram.com/reel/C_xt9xsAvCj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
    image: "/assets/aftermovie-ft.png",
    bgImage: "/images/aftermovie-ft.JPG", // Placeholder
    frameworks: [
      { id: 1, name: "Editor" },
      { id: 2, name: "Director" },
      { id: 3, name: "Videographer" },
    ],
  },
  {
    id: 9,
    name: "Aftermovie Google CNE Surabaya 2025",
    description:
      "Documenting a comprehensive tech workshop series on cloud computing, artificial intelligence, and data analytics held in Surabaya, featuring hands-on learning experiences and expert insights from industry leaders.",
    preview:
      "https://www.instagram.com/reel/DNDBqCfxHWb/?igsh=d3NzdjZtOGpwdmFx",
    image: "/assets/aftermovie-cne.png",
    bgImage: "/images/cne.JPG", // Placeholder
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    image: "/images/es2.jpg",
    title:
      "Event Series 2 Building Smarter Website: AI Powered Solutions with Google Cloud Integration",
    author: "Google Developer Group on Campus Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/mernwpu.png",
    title: "Mern Stack Course",
    author: "WPU Course",
    credentialUrl: "https://learn.wpucourse.id/certificate/TK1D1IFD",
  },
  {
    image: "/images/companyvisit.jpg",
    title:
      "Company Visit - Exploring Technology and Work Culture in the Digital Industry",
    author: "Google Developer Group on Campus Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/pznhtmlcssjs.jpg",
    title: "HTML, CSS, dan Javascipt : Pemula sampai Mahir",
    author: "Progammer Zaman Now",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-af1b562f-3085-4aba-981e-7260d40d5503/",
  },
  {
    image: "/images/es3.png",
    title:
      "Event Series 3 - Exploring AI and Blockchain for a Smarter Digital Economy",
    author: "Google Developer Group on Campus Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/pznreact.jpg",
    title: "React.js : Pemula sampai Mahir",
    author: "Progammer Zaman Now",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-4fd37fe3-f98e-4054-a7ef-90c608999a87/",
  },
  {
    image: "/images/konaspi.jpg",
    title: "Konvensi Nasional Pendidikan Indonesia 2024",
    author: "Kece Media Unesa",
    credentialUrl: "",
  },
  {
    image: "/images/pzntypescript.jpg",
    title: "Pemrograman TypeScript : Pemula sampai Mahir",
    author: "Progammer Zaman Now",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-9a07da83-6e60-4cd2-aeb6-b4a894adb681/",
  },
  {
    image: "/images/dicoding-ai.jpg",
    title: "Belajar Dasar AI",
    author: "Dicoding Academy",
    credentialUrl: "https://www.dicoding.com/certificates/N9ZO2D8DRPG5",
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
