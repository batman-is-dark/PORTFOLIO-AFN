/**
 * HeroImage - Server component for hero section image
 * Uses next/image with priority loading for above-the-fold content
 */

import Image from 'next/image';

export function HeroImage() {
  return (
    <div className="hidden lg:block mb-8">
      <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"
          alt="Abstract data center server racks with neon lighting"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className="object-cover"
        />
      </div>
    </div>
  );
}