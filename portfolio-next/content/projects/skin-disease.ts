import { Project } from '../../types/content';

const skinDisease: Project = {
  slug: 'skin-disease-detection',
  title: 'Skin Disease Detection',
  role: 'Full Stack Engineer',
  timeframe: '2025',
  stack: ['TensorFlow', 'Keras', 'MobileNetV2', 'Python', 'React'],
  problem: 'Dermatological conditions require quick and accurate diagnosis, which can be slow or inaccessible in some regions.',
  approach: 'Engineered a CNN-based image classification model trained on 5,000+ dermatology images using Transfer Learning (MobileNetV2).',
  outcomes: 'Achieved 89% validation accuracy across 4 conditions and reduced diagnostic review time by 70%.',
  impact: 'Demonstrated potential for accessible AI-driven healthcare diagnostics.',
  reel: null, // Placeholder for video if available
  three: null,
  links: [
    { label: 'Live Demo', url: 'https://dermavision-12-sci-k.vercel.app' },
    { label: 'GitHub', url: 'https://github.com/batman-is-dark' } // Using profile link as repo link wasn't specific
  ],
  featured: true
};

export default skinDisease;
