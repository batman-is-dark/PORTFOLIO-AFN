/**
 * Posts - Server component for the Writing section
 */

import { posts } from '../../content/writing';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

export function Posts() {
  return (
    <section aria-labelledby="posts-heading" className="relative py-24 px-4 overflow-hidden">
      {/* Topography pattern background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topography" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M20 20c20 0 20 20 40 20s20-20 40-20 20 20 40 20 20-20 40-20" stroke="currentColor" strokeWidth="1" fill="none" className="text-cyan-500"/>
              <path d="M20 60c20 0 20 20 40 20s20-20 40-20 20 20 40 20 20-20 40-20" stroke="currentColor" strokeWidth="1" fill="none" className="text-purple-500"/>
              <path d="M20 100c20 0 20 20 40 20s20-20 40-20 20 20 40 20 20-20 40-20" stroke="currentColor" strokeWidth="1" fill="none" className="text-pink-500"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topography)" />
        </svg>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-purple-500/10 rounded-full blur-2xl" />
      
      <div className="relative max-w-4xl mx-auto">
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