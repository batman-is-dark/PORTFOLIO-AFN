import { Project } from '../../types/content';

const epsilon: Project = {
  slug: 'epsilon',
  title: 'NLP Sentiment Analyzer',
  role: 'Data Scientist',
  timeframe: '2024',
  stack: ['Python', 'PyTorch', 'BERT', 'Hugging Face', 'Docker'],
  problem:
    'E-commerce platform needed real-time sentiment analysis for customer reviews across multiple languages.',
  approach:
    'Fine-tuned multilingual BERT model on 500K labeled reviews, implemented batch processing pipeline.',
  outcomes:
    '91% accuracy on test set, processing 1M reviews/hour.',
  impact:
    'Enabled automated review moderation and product insights dashboard used by 50+ teams.',
  reel: null,
  three: null,
  links: [
    { label: 'Demo', url: 'https://example.com/sentiment-demo' },
    { label: 'Blog Post', url: 'https://example.com/sentiment-blog' }
  ],
  featured: true
};

export default epsilon;