import Link from 'next/link';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header>
      <nav className={styles.nav} aria-label="Primary">
        <div className={styles.links}>
          <div className={styles.brand}>
            <Link href="/" className={styles.link}>
              Portfolio
            </Link>
          </div>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/projects" className={styles.link}>Projects</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/writing" className={styles.link}>Writing</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>
        <div className={styles.actions} aria-label="Display options">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}