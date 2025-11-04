import { Project } from '../../types/content';

const gamma: Project = {
  slug: 'gamma',
  title: 'Design System Audit Toolkit',
  role: 'Engineer',
  timeframe: '2022',
  stack: ['TypeScript', 'Node.js', 'CLI'],
  problem:
    'Legacy apps drifted from the design system with no objective way to quantify gaps.',
  approach:
    'Built a CLI to scan codebases for token and component usage, generating actionable reports.',
  outcomes:
    'Clear adoption metrics and prioritized backlogs per team.',
  impact:
    'Improved consistency and reduced UI maintenance overhead.',
  reel: null,
  three: null,
  links: [
    { label: 'Overview', url: 'https://example.com/ds-audit' },
    { label: 'Repository', url: 'https://github.com/example/ds-audit' }
  ],
  featured: false
};

export default gamma;