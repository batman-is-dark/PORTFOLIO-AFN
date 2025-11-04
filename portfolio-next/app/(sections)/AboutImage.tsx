/**
 * AboutImage - Server component for about section image
 * Uses next/image with lazy loading for below-the-fold content
 */

import Image from 'next/image';

export function AboutImage() {
  return (
    <div className="mb-8">
      <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&q=80"
          alt="Abu Dhabi skyline at dusk with modern architecture"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
          className="object-cover"
        />
      </div>
    </div>
  );
}