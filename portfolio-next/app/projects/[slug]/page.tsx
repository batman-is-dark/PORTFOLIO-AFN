import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { getProjectBySlug, allProjectSlugs } from '../../../content/projects';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return allProjectSlugs().map((slug) => ({ slug }));
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const hasMedia = Boolean(project.reel || project.three);

  return (
    <article className="container" aria-labelledby="project-heading">
      <header className={styles.header}>
        <h1 id="project-heading">{project.title}</h1>
        <dl className={styles.meta}>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Timeframe</dt>
            <dd>{project.timeframe}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.join(', ')}</dd>
          </div>
        </dl>
      </header>

      <section className={styles.section} aria-labelledby="problem-heading">
        <h2 id="problem-heading">Problem</h2>
        <p>{project.problem}</p>
      </section>

      <section className={styles.section} aria-labelledby="approach-heading">
        <h2 id="approach-heading">Approach</h2>
        <p>{project.approach}</p>
      </section>

      <section className={styles.section} aria-labelledby="outcomes-heading">
        <h2 id="outcomes-heading">Outcomes</h2>
        <p>{project.outcomes}</p>
      </section>

      <section className={styles.section} aria-labelledby="impact-heading">
        <h2 id="impact-heading">Impact</h2>
        <p>{project.impact}</p>
      </section>

      <section className={styles.media} aria-labelledby="media-heading">
        <h2 id="media-heading" className="visually-hidden">Media</h2>
        <figure>
          <div className={styles.placeholder} role="img" aria-label="Project media placeholder">
            Media will appear here
          </div>
          <figcaption>
            {hasMedia
              ? 'A reel or 3D asset is available for this project.'
              : 'No reel or 3D asset available yet.'}
          </figcaption>
        </figure>
      </section>
    </article>
  );
}