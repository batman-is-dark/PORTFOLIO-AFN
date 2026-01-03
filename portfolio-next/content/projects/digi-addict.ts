import { Project } from '../../types/content';

export const digiAddictProject: Project = {
  slug: "digi-addict",
  title: "DigiAddict",
  role: "Full Stack Engineer",
  timeframe: "2024",
  stack: ["Next.js", "TypeScript", "Markov Chains", "Monte Carlo Simulation", "Behavioral Analysis"],
  problem: "Digital addiction is a growing problem, yet users lack quantitative tools to understand their behavioral patterns.",
  approach: "Developed a behavioral telemetry system using Markov Chain modeling to calculate state transition probabilities for digital engagement.",
  outcomes: "A comprehensive digital health dashboard that identifies addictive loops and suggests personalized hygiene plans.",
  impact: "Help users reduce problematic digital usage by providing scientifically-grounded behavioral insights.",
  three: {
    model: "/models/digi-addict.glb",
    fallbackImage: "/images/projects/digi-addict.png",
    width: 800,
    height: 600,
    alt: "DigiAddict Project"
  },
  links: [
    { label: "Github", url: "https://github.com/batman-is-dark/DigiAddict" },
    { label: "Live Demo", url: "https://digi-addict-cxne.vercel.app/" }
  ],
  featured: true
};
