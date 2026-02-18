import { Project } from '../../types/content';

export const poliseeProject: Project = {
  slug: "polisee",
  title: "PoliSEE",
  role: "Full Stack Developer",
  timeframe: "2023",
  stack: ["Vite", "React", "TypeScript", "Python", "TailwindCSS"],
  problem: "Policy decisions often involve complex variables that are difficult to visualize and communicate to stakeholders.",
  approach: "Built an interactive simulator that allows users to adjust policy parameters and see real-time visualizations of projected outcomes.",
  outcomes: "A robust simulation platform with a sleek dashboard and high-performance backend for modeling socio-economic impacts.",
  impact: "Enhanced transparency in policy analysis, enabling users to explore over 50 different simulation scenarios.",
  three: {
    model: "/models/polisee.glb",
    fallbackImage: "/images/projects/polisee.png",
    width: 800,
    height: 600,
    alt: "PoliSEE Project"
  },
  links: [
    { label: "Github", url: "https://github.com/batman-is-dark/PoliSEE" },
    { label: "Live Demo", url: "https://poli-see.vercel.app/" }
  ],
  featured: true,
  images: {
    hero: '/images/projects/polisee.png',
    thumb: '/images/projects/polisee.png'
  }
};
