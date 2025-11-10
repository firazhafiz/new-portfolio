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
    image: "/assets/angkutin.png",
    bgImage: "/images/trash.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Express.js" },
    ],
  },
  {
    id: 4,
    name: "Sadari 4Life",
    description:
      "A hypertension screening website that allows users to perform self-assessments through interactive tests for early detection and management.",
    preview: "https://sadari4life.vercel.app/",
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
    preview: "https://sadari4life.vercel.app/",
    image: "/assets/cas74.jpg",
    bgImage: "/images/cas.jpg", // Placeholder
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
    preview: "https://sadari4life.vercel.app/",
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
    preview: "https://sadari4life.vercel.app/",
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
    preview: "https://sadari4life.vercel.app/",
    image: "/assets/aftermovie-ft.png",
    bgImage: "/images/aftermovie-ft.jpg", // Placeholder
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
    preview: "https://sadari4life.vercel.app/",
    image: "/assets/aftermovie-cne.png",
    bgImage: "/images/cne.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Editor" },
      { id: 2, name: "Director" },
      { id: 3, name: "Videographer" },
    ],
  },
];
