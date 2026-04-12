import { Project } from '../../types/content';

export const aeroLogicProject: Project = {
  slug: 'aero-logic',
  title: 'Aero-Logic',
  role: 'Lead Developer',
  timeframe: '2026',
  stack: ['K2 Think V2', 'Reasoning Models', 'Python', 'FastAPI', 'Interactive Dashboard'],
  problem: 'Airport ground operations are reactive rather than proactive, leading to delays, inefficient resource allocation, and suboptimal fuel consumption in aviation logistics.',
  approach: 'Architected a reasoning-driven decision intelligence system powered by K2 Think V2 to transform reactive airport operations into proactive, optimization-focused decision pathways. Implemented counterfactual simulation to evaluate three distinct strategies: Delay-minimizing, Fuel-minimizing, and Balanced approaches.',
  outcomes: 'A hybrid optimization layer integrating mathematical cost functions with multi-step AI reasoning to sequence tightly coupled tasks (fueling, catering, boarding) while maintaining strict safety and operational constraints.',
  impact: 'Explainable AI dashboard visualizing Gantt timelines and resource usage, making optimal vs. rational decisions explicit, interpretable, and auditable through reasoning output.',
  links: [
    { label: 'Live Demo', url: 'https://aero-logi.vercel.app' },
    { label: 'Video Overview', url: 'https://drive.google.com/file/d/1ALSwp2gwu_Z76KpvQbJh7a0zAKSH1wmf/view?usp=drive_link' }
  ],
  featured: true,
  images: {
    hero: '/images/projects/aero-logic.png',
    thumb: '/images/projects/aero-logic.png'
  }
};
