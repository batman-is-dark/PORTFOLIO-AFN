/**
 * About - Server component for the About section
 */

export function About() {
  return (
    <section aria-labelledby="about-heading" className="relative py-24 px-4 overflow-hidden bg-gray-900/30">
      <div className="relative max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          >
            About Me
          </h2>

          <div className="prose prose-lg dark:prose-invert">
            <p>
              I am an aspiring Artificial Intelligence undergraduate from The Indian High School, Dubai, with a strong passion for Machine Learning and Robotics.
            </p>
            <p>
              My journey involves hands-on experience with Python, TensorFlow, and Scikit-Learn, building impactful projects like a skin-disease detector and environmental analytics dashboards. I actively mentor peers in ML and coding, believing in the power of shared knowledge.
            </p>
            <p>
              Currently, I am deepening my mathematical foundations to excel in rigorous AI programs, with a specific goal of joining MBZUAI to contribute to the future of artificial intelligence.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/batman-is-dark"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            {/* Placeholder for user image - using a gradient for now if no image provided, but user uploaded images so we could use that if we knew the path, but for now a stylish placeholder is safer */}
            <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-purple-900 flex items-center justify-center text-white/20 text-6xl font-bold">
              AFNAN
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl -z-10 opacity-30 blur-xl"></div>
        </div>
      </div>
    </section>
  );
}