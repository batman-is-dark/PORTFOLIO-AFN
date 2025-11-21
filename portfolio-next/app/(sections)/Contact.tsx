/**
 * Contact - Server component for the Contact section
 */

import Button from '../../components/ui/Button';

export function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="relative py-24 px-4 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)
          `
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h2
          id="contact-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Get In Touch
        </h2>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, research opportunities, or collaborations.
          Feel free to reach out through email or connect with me on GitHub.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            as="a"
            href="mailto:afnusha.r@gmail.com"
            variant="primary"
            size="lg"
            aria-label="Send email"
          >
            Email Me
          </Button>

          <Button
            as="a"
            href="tel:+971558085931"
            variant="secondary"
            size="lg"
            aria-label="Call me"
          >
            Call Me
          </Button>

          <Button
            as="a"
            href="https://github.com/batman-is-dark"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="lg"
            aria-label="Visit GitHub profile (opens in new tab)"
          >
            GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}