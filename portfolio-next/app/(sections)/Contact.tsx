/**
 * Contact - Server component for the Contact section
 */

import Button from '../../components/ui/Button';

export function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          id="contact-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Get In Touch
        </h2>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          I'm always open to discussing new projects, research opportunities, or collaborations.
          Feel free to reach out through email or connect with me on LinkedIn and GitHub.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            as="a"
            href="mailto:contact@example.com"
            variant="primary"
            size="lg"
            aria-label="Send email"
          >
            Email Me
          </Button>
          
          <Button
            as="a"
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            aria-label="Visit LinkedIn profile (opens in new tab)"
          >
            LinkedIn
          </Button>
          
          <Button
            as="a"
            href="https://github.com/yourusername"
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