import { projects } from '../content/projects';
import { Hero } from './(sections)/Hero';
import { ProjectsSection } from './(sections)/ProjectsSection';
import { About } from './(sections)/About';
import { Skills } from './(sections)/Skills';
import { ImpactSection } from './(sections)/ImpactSection';
import { Academic } from './(sections)/Academic';
import { Achievements } from './(sections)/Achievements';
import { Contact } from './(sections)/Contact';
import FilmGrain from '../components/ui/FilmGrain';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Academic />
      <Skills />
      <ImpactSection />
      <ProjectsSection />
      <Achievements />
      <Contact />
      
      <FilmGrain />
    </main>
  );
}