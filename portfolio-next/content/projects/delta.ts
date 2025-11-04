import { Project } from '../../types/content';

const delta: Project = {
  slug: 'delta',
  title: 'Image Classification Model',
  role: 'ML Engineer',
  timeframe: '2024',
  stack: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI'],
  problem:
    'Medical imaging dataset lacked automated classification, requiring manual expert review for thousands of images.',
  approach:
    'Built CNN-based classification model with transfer learning using ResNet50, achieving 94% accuracy on validation set.',
  outcomes:
    'Reduced manual review time by 80% while maintaining diagnostic accuracy.',
  impact:
    'Deployed API serving 10K+ predictions daily with <100ms latency.',
  reel: null,
  three: null,
  links: [
    { label: 'Paper', url: 'https://example.com/image-classification' },
    { label: 'GitHub', url: 'https://github.com/example/image-classifier' }
  ],
  featured: true
};

export default delta;