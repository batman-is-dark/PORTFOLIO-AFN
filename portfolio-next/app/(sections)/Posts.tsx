/**
 * Posts - Server component for the Writing section
 */

import { posts } from '../../content/writing';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export function Posts() {
  return (
    <section aria-labelledby="posts-heading" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          id="posts-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Writing & Articles
        </h2>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.slug}>
              <article>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400"
                  >
                    {post.title}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {new Date(post.dateISO).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </article>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}