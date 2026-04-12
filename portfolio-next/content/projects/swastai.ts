import { Project } from '../../types/content';

export const swastaiProject: Project = {
  slug: 'swastai',
  title: 'SwastAI',
  role: 'AI Research Engineer',
  timeframe: '2025',
  stack: ['PyTorch', 'Python', 'Data Pipeline', 'Model Optimization', 'Edge Deployment'],
  problem: 'Healthcare systems struggle with high-dimensional clinical datasets and the inability to process real-time patient tracking data efficiently.',
  approach: 'Engineered a multi-modal health intelligence platform using PyTorch to analyze 15+ heterogeneous health metrics. Developed scalable data pipelines for real-time cleaning and normalization with longitudinal patient tracking.',
  outcomes: 'Improved preliminary diagnostic speed by 40% through advanced multi-modal analysis and reduced inference latency by 30% using post-training quantization and model pruning.',
  impact: 'Top 3% global standing in innovation challenges, enabling rapid diagnostic modules deployment across edge devices with minimal resource footprint.',
  links: [
    { label: 'Research Paper', url: '#' }
  ],
  featured: true,
  images: {
    hero: '/images/projects/swastai.png',
    thumb: '/images/projects/swastai.png'
  }
};
