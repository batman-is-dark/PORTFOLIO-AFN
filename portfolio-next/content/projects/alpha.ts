import { Project } from '../../types/content';

const alpha: Project = {
  slug: 'alpha',
  title: 'Design Tokens Pipeline',
  role: 'Lead Engineer',
  timeframe: '2024',
  stack: ['TypeScript', 'Next.js', 'Zod'],
  problem: 'Teams themed products independently, causing drift and duplication.',
  approach: 'Introduced a schema-validated token source and automated distribution to apps.',
  outcomes: 'Single source of truth for tokens with CI checks.',
  impact: 'Reduced theme regressions and accelerated rollout of brand updates.',
  reel: null,
  three: null,
  links: [
    { label: 'Overview', url: 'https://example.com/tokens-pipeline' },
    { label: 'Repository', url: 'https://github.com/example/tokens-pipeline' }
  ],
  featured: true
};

export default alpha;