export interface CarouselItem {
  id: string;
  slug: string;
  title: string;
  role: string;
  timeframe?: string;
  summary?: string;
  description?: string;
  image?: string;
  link?: string;
  stack: string[];
}
