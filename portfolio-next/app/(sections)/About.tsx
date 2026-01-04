/**
 * About - Server component for the About section
 */

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-40 px-6 overflow-hidden bg-bg border-t border-white/5">
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <span className="text-accent font-sans text-xs tracking-[0.5em] uppercase block">
              The Narrative
            </span>
            <h2
              id="about-heading"
              className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
            >
              About Me
            </h2>
          </div>

          <div className="prose prose-xl dark:prose-invert font-sans text-secondary leading-relaxed space-y-8">
            <p className="text-2xl">
              I am an aspiring Artificial Intelligence undergraduate from The Indian High School, Dubai, with a strong passion for <span className="text-primary font-bold italic">Machine Learning</span> and <span className="text-primary font-bold italic">Robotics</span>.
            </p>
            <p>
              My journey involves hands-on experience with Python, TensorFlow, and Scikit-Learn, building impactful projects like a skin-disease detector and environmental analytics dashboards. I actively mentor peers in ML and coding, believing in the power of shared knowledge.
            </p>
            <p>
              Currently, I am deepening my mathematical foundations to excel in rigorous AI programs, with a specific goal of joining <span className="text-accent font-bold">MBZUAI</span> to contribute to the future of artificial intelligence.
            </p>
          </div>

          <div className="flex gap-12 pt-8">
            <a
              href="https://github.com/batman-is-dark"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-primary font-sans font-bold uppercase tracking-[0.3em] text-xs"
            >
              <div className="p-3 bg-surface border border-white/10 group-hover:border-accent transition-colors">
                <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] bg-surface border border-white/10 p-6 relative group overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 blur-3xl rounded-full"></div>
            <div className="w-full h-full bg-bg flex items-center justify-center text-primary/5 text-6xl font-display font-bold border border-white/5 relative z-10">
              AFNAN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}