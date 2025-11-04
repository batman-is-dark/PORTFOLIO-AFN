import { Project } from '../../types/content';

const eta: Project = {
  slug: 'eta',
  title: 'Object Detection Pipeline',
  role: 'Computer Vision Engineer',
  timeframe: '2023',
  stack: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'AWS'],
  problem:
    'Security system required real-time object detection for 100+ camera feeds with low latency.',
  approach:
    'Optimized YOLOv8 model with quantization, deployed on edge devices with cloud fallback for complex scenes.',
  outcomes:
    'Achieved 60 FPS processing with 88% mAP on custom dataset.',
  impact:
    'Reduced false alarms by 75% and enabled automated threat detection across facilities.',
  reel: null,
  three: null,
  links: [
    { label: 'Technical Report', url: 'https://example.com/object-detection' },
    { label: 'GitHub', url: 'https://github.com/example/yolo-pipeline' }
  ],
  featured: true
};

export default eta;