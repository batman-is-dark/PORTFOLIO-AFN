import { Project } from '../../types/content';

export const skinDiseaseProject: Project = {
  slug: 'skin-disease-detection',
  title: 'Skin Disease Detection',
  role: 'ML Engineer',
  timeframe: '2025',
  stack: ['Python', 'TensorFlow', 'React', 'FastAPI'],
  problem: 'Early detection of skin conditions is often inaccessible without expensive specialist visits.',
  approach: 'Developed a convolutional neural network (CNN) trained on dermatological datasets to classify skin lesions from user-uploaded images, wrapped in an accessible web interface.',
  outcomes: 'Achieved high accuracy in identifying common conditions, providing users with instant preliminary assessments and care recommendations.',
  impact: 'Democratized access to basic dermatological screening tools.',
  reel: null,
  three: {
    type: 'model',
    model: 'BioCellArtifact',
    fallbackImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    width: 800,
    height: 600,
    alt: 'Skin disease detection visualization showing cellular analysis'
  },
  links: [
    { label: 'Live Demo', url: 'https://dermavision-12-sci-k.vercel.app' }
  ],
  featured: true,
  images: {
    hero: '/images/projects/skin-disease-hero-01.jpg',
    thumb: '/images/projects/skin-disease-hero-01.jpg'
  }
};
