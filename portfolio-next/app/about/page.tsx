import styles from './page.module.css';

export default function AboutPage() {
  return (
    <section className="container" aria-labelledby="about-heading">
      <div className={styles.container}>
        <h1 id="about-heading">About</h1>
        <p className={styles.copy}>
          Engineer focused on design systems, performance, and accessible interaction. I partner with teams to ship
          maintainable UI at scale.
        </p>

        <div className={styles.details}>
          <dl className={styles.dl}>
            <dt>Areas</dt>
            <dd>Design systems, performance budgets, a11y, DX tooling</dd>
          </dl>
          <dl className={styles.dl}>
            <dt>Stack</dt>
            <dd>TypeScript, Next.js, Node.js, CSS Modules, Zod</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}