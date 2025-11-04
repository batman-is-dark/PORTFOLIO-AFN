import { Project } from '../../types/content';

const beta: Project = {
  slug: 'beta',
  title: 'Performance Budget CI',
  role: 'Engineer',
  timeframe: '2023',
  stack: ['TypeScript', 'Lighthouse', 'GitHub Actions'],
  problem:
    'Pages grew heavier over time without visibility, risking LCP and CLS regressions.',
  approach:
    'Added CI checks using Lighthouse CI with budgets and PR annotations for deltas.',
  outcomes:
    'Consistent performance baselines with automated guardrails on each PR.',
  impact:
    'Kept core pages under budget and prevented regressions from reaching production.',
  reel: null,
  three: null,
  links: [
    { label: 'Overview', url: 'https://example.com/perf-budget-ci' },
    { label: 'Repository', url: 'https://github.com/example/perf-budget-ci' }
  ],
  featured: false
};

export default beta;