import { Project } from '../../types/content';

const theta: Project = {
  slug: 'theta',
  title: 'Recommendation Engine',
  role: 'ML Engineer',
  timeframe: '2022',
  stack: ['Python', 'Scikit-learn', 'Redis', 'FastAPI', 'PostgreSQL'],
  problem:
    'Content platform had 15% click-through rate on recommendations, users complained about irrelevant suggestions.',
  approach:
    'Built hybrid recommender combining collaborative filtering and content-based features with real-time update pipeline.',
  outcomes:
    'Increased CTR to 42% and average session time by 3.5 minutes.',
  impact:
    'Generated 25% revenue increase through better content discovery and user retention.',
  reel: null,
  three: null,
  links: [
    { label: 'Article', url: 'https://example.com/recommendation-engine' },
    { label: 'Presentation', url: 'https://example.com/rec-slides' }
  ],
  featured: false
};

export default theta;