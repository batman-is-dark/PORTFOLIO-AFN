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

      {project.dashboardUrl && (
        <section className={styles.section} aria-labelledby="dashboard-heading">
          <h2 id="dashboard-heading">Interactive Dashboard</h2>
          <div className="mt-6 rounded-lg overflow-hidden border border-accent/20">
            <iframe
              src={project.dashboardUrl}
              className="w-full"
              style={{ minHeight: '600px' }}
              allowFullScreen
              title="Project Dashboard"
            />
          </div>
        </section>
      )}

      {project.links && project.links.length > 0 && (
        <section className={styles.section} aria-labelledby="links-heading">
          <h2 id="links-heading">Links</h2>
          <div className="flex flex-wrap gap-4 mt-6">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest font-bold text-sm"
              >
                {link.label}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            ))}
          </div>
        </section>
      )}

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