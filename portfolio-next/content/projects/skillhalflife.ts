import { Project } from '../../types/content';

export const skillhalflifeProject: Project = {
  slug: 'skillhalflife',
  title: 'SkillHalfLife',
  role: 'Full Stack AI Developer',
  timeframe: '2025',
  stack: ['React', 'Next.js', 'Gemini AI', 'TypeScript', 'Vector DBs', 'LLM Orchestration'],
  problem: 'Tech professionals struggle to predict which skills will become obsolete and miss critical learning opportunities in a rapidly evolving market.',
  approach: 'Built an immersive AI dashboard using Google Gemini 1.5 that visualizes skill decay through Cox Proportional Hazards modeling and generates personalized 5-week survival roadmaps based on market data.',
  outcomes: 'An intelligent learning companion that combines skill decay visualization, neural extraction for unstructured text, and survival analysis to map skill obsolescence timelines.',
  impact: 'Empowers developers with data-driven career guidance using advanced statistical modeling and generative AI to stay ahead of skill deprecation trends.',
  links: [
    { label: 'Live Demo', url: 'https://skillhalflife.vercel.app' },
    { label: 'GitHub', url: 'https://github.com/batman-is-dark/skillhalflife' }
  ],
  featured: true,
  images: {
    hero: '/images/projects/skillhalflife.png',
    thumb: '/images/projects/skillhalflife.png'
  }
};
