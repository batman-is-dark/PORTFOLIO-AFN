import { Project } from '../../types/content';

export const misinformationSimulatorProject: Project = {
  slug: "misinformation-cascade-simulator",
  title: "Viral Predictor",
  role: "Lead Developer",
  timeframe: "2024",
  stack: ["Next.js 14", "D3.js", "Prisma", "SQLite", "Galton-Watson Process", "Framer Motion"],
  problem: "The spread of misinformation happens too quickly for manual intervention, requiring automated predictive models.",
  approach: "Utilized Galton-Watson branching processes and Poisson regression to estimate the reproduction number (R₀) of content cascades.",
  outcomes: "A real-time simulation tool with an interactive D3.js tree visualization showing the potential reach of viral content.",
  impact: "Enables early identification of high-risk viral content, aiding in the proactive mitigation of misinformation spread.",
  three: {
    model: "/models/misinformation-simulator.glb",
    fallbackImage: "/images/projects/misinformation-simulator.png",
    width: 800,
    height: 600,
    alt: "Viral Predictor Project"
  },
  links: [
    { label: "Github", url: "https://github.com/batman-is-dark/Misinformation-Cascade-Simulator" },
    { label: "Live Demo", url: "https://misinformation-cascade-simulator.vercel.app/" }
  ],
  featured: true,
  images: {
    hero: '/images/projects/misinformation-simulator.png',
    thumb: '/images/projects/misinformation-simulator.png'
  }
};
