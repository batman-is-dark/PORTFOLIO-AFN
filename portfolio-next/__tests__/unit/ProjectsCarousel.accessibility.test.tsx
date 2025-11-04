import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectsCarousel } from '../../components/ProjectsCarousel/ProjectsCarousel';
import type { CarouselItem } from '../../lib/mappers';

// Mock embla-carousel-react
vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), null],
}));

describe('ProjectsCarousel Accessibility', () => {
  const mockItems: CarouselItem[] = [
    {
      slug: 'test-project',
      title: 'Test Project',
      role: 'Developer',
      timeframe: '2024',
      stack: ['React', 'TypeScript'],
      summary: 'A test project for carousel',
    },
  ];

  it('has region role with aria-label', () => {
    render(<ProjectsCarousel items={mockItems} />);
    const carousel = screen.getByRole('region', { name: /projects carousel/i });
    expect(carousel).toBeInTheDocument();
  });

  it('carousel wrapper is focusable for keyboard navigation', () => {
    render(<ProjectsCarousel items={mockItems} />);
    const carousel = screen.getByRole('region', { name: /projects carousel/i });
    expect(carousel).toHaveAttribute('tabIndex', '0');
  });

  it('renders project links with accessible labels', () => {
    render(<ProjectsCarousel items={mockItems} />);
    const link = screen.getByRole('link', { name: /test project/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/projects/test-project');
  });

  it('project cards have focus-visible outline classes', () => {
    render(<ProjectsCarousel items={mockItems} />);
    const link = screen.getByRole('link', { name: /test project/i });
    expect(link).toHaveClass('focus-visible:outline');
  });
});