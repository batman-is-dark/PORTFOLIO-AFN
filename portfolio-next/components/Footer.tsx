import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>&copy; {new Date().getFullYear()} Portfolio</span>
      <nav aria-label="Footer">
        <Link href="/about" className={styles.link}>
          About
        </Link>
      </nav>
    </footer>
  );
}