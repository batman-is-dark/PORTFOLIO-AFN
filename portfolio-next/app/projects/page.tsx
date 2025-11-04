import Link from 'next/link';
import styles from './page.module.css';
import { projects } from '../../content/projects';

export default function ProjectsPage() {
  return (
    <section className="container" aria-labelledby="projects-heading">
      <header className={styles.header}>
        <h1 id="projects-heading">Projects</h1>
        <p>Selected case studies from systems, performance, and tooling work.</p>
      </header>

      <div className={styles.grid}>
        {projects.map((p) => (
          <article key={p.slug} className={styles.card}>
            <h2>
              <Link href={`/projects/${p.slug}`}>{p.title}</Link>
            </h2>
            <p className={styles.meta}>
              {p.role} • {p.timeframe} • {p.stack.join(', ')}
            </p>
            <p>
              <Link className={styles.cta} href={`/projects/${p.slug}`}>
                Read case study
              </Link>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}