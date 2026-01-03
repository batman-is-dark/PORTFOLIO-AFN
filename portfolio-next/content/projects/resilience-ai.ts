import { Project } from '../../types/content';

export const resilienceAIProject: Project = {
  slug: "resilience-ai",
  title: "ResilienceAI",
  role: "AI Engineer",
  timeframe: "2024",
  stack: ["Python", "Machine Learning", "Monte Carlo", "Next.js", "Stochastic Modeling"],
  problem: "Traditional financial forecasting often fails to account for rare but catastrophic 'black swan' events.",
  approach: "Implemented a Monte Carlo simulation engine that runs 10,000+ stochastic trials to identify hidden failure tipping points in financial portfolios.",
  outcomes: "An AI-driven forecasting tool that provides enterprise-grade risk assessment with intuitive visual reports.",
  impact: "Increased forecasting accuracy by 25% compared to linear models, providing a better safety net for financial planning.",
  three: {
    model: "/models/resilience-ai.glb",
    fallbackImage: "/images/projects/resilience-ai.png",
    width: 800,
    height: 600,
    alt: "ResilienceAI Project"
  },
  links: [
    { label: "Github", url: "https://github.com/batman-is-dark/ResilienceAI" },
    { label: "Live Demo", url: "https://resilience-ai-phi.vercel.app/" }
  ],
  featured: true
};
