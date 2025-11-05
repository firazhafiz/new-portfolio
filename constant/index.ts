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
        description: "(React, Vue, TypeScript, Interactive UI/UX)",
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
        description: "(Figma, Adobe Photoshop, Illustrator, Blender)",
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
    name: "Mobile Accessories E-commerce",
    description:
      "An online store specializing in phone accessories including cases, chargers, cables, and power banks with MagSafe compatibility.",
    href: "",
    image: "/assets/projects/mobile-accessories-store.jpg",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "Plant Shop E-commerce",
    description:
      "An online store specializing in rare and decorative plants with a clean, user-friendly interface.",
    href: "",
    image: "/assets/projects/plant-shop.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Stripe API" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Apple Tech Marketplace",
    description:
      "An e-commerce platform for Apple products and accessories with deals and category filtering.",
    href: "",
    image: "/assets/projects/apple-tech-store.jpg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Blazor" },
      { id: 2, name: "ASP.NET Core" },
      { id: 3, name: "SQL Server" },
      { id: 4, name: "Bootstrap" },
    ],
  },
  {
    id: 4,
    name: "Electronics & Gadgets Store",
    description:
      "A multi-category online shop featuring electronics, home appliances, and gaming gear with special offers.",
    href: "",
    image: "/assets/projects/electronics-store.jpg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Vue.js" },
      { id: 2, name: "Laravel" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "SCSS" },
    ],
  },
  {
    id: 5,
    name: "Home Decor Marketplace",
    description:
      "A curated collection of designer home decor items, including furniture and artisan vases.",
    href: "",
    image: "/assets/projects/home-decor-store.jpg",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Angular" },
      { id: 2, name: "Firebase" },
      { id: 3, name: "GraphQL" },
      { id: 4, name: "Material UI" },
    ],
  },
  {
    id: 6,
    name: "Digital Game Store",
    description:
      "A gaming platform featuring discounted titles, top sellers, and genre-based browsing.",
    href: "",
    image: "/assets/projects/game-store.jpg",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Svelte" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Chakra UI" },
    ],
  },
];
