/**
 * SeoJsonLd - Server component for structured data (JSON-LD)
 * Renders Person and Website schemas for enhanced SEO
 */

export function SeoJsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'AI/Data Science Applicant',
    url: 'https://example.com',
    sameAs: [
      'https://github.com/yourhandle',
      'https://www.linkedin.com/in/yourhandle',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI/Data Science Portfolio – MBZUAI Applicant',
    url: 'https://example.com',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}