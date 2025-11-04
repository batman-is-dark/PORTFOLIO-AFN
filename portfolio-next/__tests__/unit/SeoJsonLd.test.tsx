/**
 * SeoJsonLd component tests
 * Validates that structured data (JSON-LD) is correctly rendered
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SeoJsonLd } from '../../components/SeoJsonLd';

describe('SeoJsonLd', () => {
  it('renders JSON-LD script tags', () => {
    const { container } = render(<SeoJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    
    expect(scripts.length).toBeGreaterThan(0);
  });

  it('includes Person schema with correct type', () => {
    const { container } = render(<SeoJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    
    let foundPersonSchema = false;
    scripts.forEach((script) => {
      const content = script.textContent;
      if (content && content.includes('"@type":"Person"')) {
        foundPersonSchema = true;
        const data = JSON.parse(content);
        expect(data['@context']).toBe('https://schema.org');
        expect(data['@type']).toBe('Person');
        expect(data.name).toBeDefined();
        expect(data.url).toBeDefined();
      }
    });
    
    expect(foundPersonSchema).toBe(true);
  });

  it('includes Website schema with correct type', () => {
    const { container } = render(<SeoJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    
    let foundWebsiteSchema = false;
    scripts.forEach((script) => {
      const content = script.textContent;
      if (content && content.includes('"@type":"WebSite"')) {
        foundWebsiteSchema = true;
        const data = JSON.parse(content);
        expect(data['@context']).toBe('https://schema.org');
        expect(data['@type']).toBe('WebSite');
        expect(data.name).toBeDefined();
        expect(data.url).toBeDefined();
      }
    });
    
    expect(foundWebsiteSchema).toBe(true);
  });
});