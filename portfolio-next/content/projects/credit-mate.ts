import { Project } from '../../types/content';

export const creditMateProject: Project = {
  slug: "credit-mate",
  title: "Credit Mate",
  role: "Lead Developer",
  timeframe: "2023 - Present",
  stack: ["Vite", "React", "TypeScript", "Tesseract.js", "PWA"],
  problem: "Manual expense tracking is tedious and prone to errors, especially when dealing with physical receipts.",
  approach: "Developed a Progressive Web App (PWA) that leverages OCR technology to automate receipt data extraction and categorize expenses automatically.",
  outcomes: "A highly responsive task management and expense tracking tool that works offline and provides real-time financial insights.",
  impact: "Streamlined financial management for users, reducing manual entry time by over 70%.",
  three: {
    model: "/models/credit-mate.glb",
    fallbackImage: "/images/projects/credit-mate.png",
    width: 800,
    height: 600,
    alt: "Credit Mate Project"
  },
  links: [
    { label: "Github", url: "https://github.com/batman-is-dark/credit-mate" },
    { label: "Live Demo", url: "https://batman-is-dark.github.io/credit-mate/" }
  ],
  featured: true,
  images: {
    hero: '/images/projects/credit-mate.png',
    thumb: '/images/projects/credit-mate.png'
  }
};
