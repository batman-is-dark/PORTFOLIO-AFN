import styles from './page.module.css';
import { posts } from '../../content/writing';

export default function WritingPage() {
  return (
    <section className="container" aria-labelledby="writing-heading">
      <header className={styles.header}>
        <h1 id="writing-heading">Writing</h1>
        <p>Notes and posts on systems and UI engineering.</p>
      </header>

      <ul className={styles.list}>
        {posts.map((post) => {
          const date = new Date(post.dateISO).toISOString().slice(0, 10);
          return (
            <li key={post.slug} className={styles.item}>
              <h2>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </h2>
              <p className={styles.meta}>{date}</p>
              {post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag: string) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}