import { Project } from '../../types/content';

const environmentalAnalysis: Project = {
    slug: 'environmental-data-analysis',
    title: 'Environmental Data Analysis',
    role: 'Data Analyst',
    timeframe: '2025',
    stack: ['Python', 'Pandas', 'NLTK', 'Power BI', 'PRAW'],
    problem: 'Understanding public sentiment on environmental topics requires analyzing vast amounts of unstructured social media data.',
    approach: 'Developed an automated pipeline to scrape and clean 10,000+ Reddit posts, applying NLP for sentiment classification.',
    outcomes: 'Achieved 87% classification accuracy and visualized trends via an interactive Power BI dashboard.',
    impact: 'Won 3rd Place at TechFest 2025; insights viewed by 150+ attendees.',
    reel: null,
    three: null,
    links: [
        { label: 'GitHub', url: 'https://github.com/batman-is-dark' }
    ],
    featured: true
};

export default environmentalAnalysis;
