import { projects } from '../content/projects';
import { toCarouselItem } from '../lib/mappers';
import { Hero } from './(sections)/Hero';
import { ProjectsSection } from './(sections)/ProjectsSection';
import { About } from './(sections)/About';
import { Skills } from './(sections)/Skills';
import { Posts } from './(sections)/Posts';
import { Contact } from './(sections)/Contact';

export default function HomePage() {
  const carouselItems = projects.map(toCarouselItem);

  return (
    <main>
      <Hero />
      <ProjectsSection items={carouselItems} />
      <About />
      <Skills />
      <Posts />
      <Contact />
    </main>
  );
}