import dynamic from 'next/dynamic';
import Image from 'next/image';

const ThreeScene = dynamic(() => import('../../components/three/ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-[color:var(--color-surface)] border border-[color:var(--color-border)] flex items-center justify-center">
      <div className="animate-pulse text-[color:var(--color-text-muted)]">
        Loading 3D visualization...
      </div>
    </div>
  ),
});

function FallbackImage() {
  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-[color:var(--color-surface)] border border-[color:var(--color-border)] relative">
      <Image
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
        alt="Abstract neural network visualization with interconnected nodes"
        fill
        className="object-cover opacity-60"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[color:var(--color-bg)] via-transparent to-transparent">
        <p className="text-[color:var(--color-text-muted)] text-sm px-4 text-center">
          Interactive 3D network visualization
        </p>
      </div>
    </div>
  );
}

export default function ThreeSection() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="portfolio-viz">
      <div className="container mx-auto px-4">
        <h2 id="portfolio-viz" className="text-3xl lg:text-4xl font-display font-bold text-[color:var(--color-text)] mb-4">
          Interactive Portfolio Visualization
        </h2>
        <p className="text-[color:var(--color-text-muted)] mb-8 max-w-2xl">
          Explore my AI and data science interests through an interactive 3D network.
          Drag to rotate, scroll to zoom.
        </p>
        
        <ThreeScene />
        
        <noscript>
          <FallbackImage />
        </noscript>
      </div>
    </section>
  );
}