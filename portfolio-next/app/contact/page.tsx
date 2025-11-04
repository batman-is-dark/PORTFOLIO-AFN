import styles from './page.module.css';

export default function ContactPage() {
  return (
    <section className="container" aria-labelledby="contact-heading">
      <h1 id="contact-heading">Contact</h1>
      <ul className={styles.list}>
        <li>
          <a className={styles.link} href="mailto:hello@example.com">Email</a>
        </li>
        <li>
          <a className={styles.link} href="https://www.linkedin.com/in/example" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li>
          <a className={styles.link} href="https://github.com/example" target="_blank" rel="noopener noreferrer">GitHub</a>
        </li>
      </ul>
    </section>
  );
}