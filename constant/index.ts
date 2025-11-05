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
    href: "https://diary-food1222.vercel.app/",
    image: "/assets/diaryfood.png",
    bgImage: "/images/kitchen.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Tailwind CSS" },
      { id: 5, name: "AI Integration" },
    ],
  },
  {
    id: 2,
    name: "Nesavent",
    description:
      "Landing page website for an event management platform at Surabaya State University.",
    href: "https://nesavent.vercel.app/",
    image: "/assets/nesavent.png",
    bgImage: "/images/event.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Tailwind CSS" },
    ],
  },
  // {
  //   id: 3,
  //   name: "Personal Portfolio",
  //   description:
  //     "A personal portfolio website to document my journey and track record as a programmer.",
  //   href: "https://razdev-navy.vercel.app/",
  //   image: "/assets/portfoliofiraz.png",
  //   bgImage: "/images/portfolio.jpg", // Placeholder
  //   frameworks: [
  //     { id: 1, name: "Next.js" },
  //     { id: 2, name: "React" },
  //     { id: 3, name: "Tailwind CSS" },
  //     { id: 4, name: "Aceternity UI" },
  //   ],
  // },
  {
    id: 3,
    name: "Angkutin",
    description:
      "A smart waste management system designed to optimize waste collection and monitoring through intelligent technology.",
    href: "https://angkutin-omega.vercel.app/",
    image: "/assets/angkutin.png",
    bgImage: "/images/trash.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Prisma (ORM)" },
      { id: 5, name: "IoT Sensors" },
    ],
  },
  {
    id: 4,
    name: "Sadari 4Life",
    description:
      "A hypertension screening website that allows users to perform self-assessments through interactive tests for early detection and management.",
    href: "https://sadari4life.vercel.app/",
    image: "/assets/sadari.png",
    bgImage: "/images/hospital.jpg", // Placeholder
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React" },
      { id: 3, name: "Express.js" },
      { id: 4, name: "Prisma (ORM)" },
    ],
  },
];
