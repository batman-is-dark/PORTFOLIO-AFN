import { Project } from '../../types/content';

const zeta: Project = {
  slug: 'zeta',
  title: 'Time Series Forecasting System',
  role: 'ML Engineer',
  timeframe: '2023',
  stack: ['Python', 'Prophet', 'LSTM', 'Pandas', 'Streamlit'],
  problem:
    'Supply chain team lacked accurate demand forecasting, leading to 30% inventory waste.',
  approach:
    'Developed ensemble model combining Prophet and LSTM, capturing seasonal patterns and long-term trends.',
  outcomes:
    'Reduced forecast error (MAPE) from 45% to 12% across 500+ SKUs.',
  impact:
    'Saved $2M annually through optimized inventory management and reduced waste.',
  reel: null,
  three: null,
  links: [
    { label: 'Case Study', url: 'https://example.com/forecasting-case' },
    { label: 'Dashboard', url: 'https://example.com/forecasting-dash' }
  ],
  featured: false
};

export default zeta;