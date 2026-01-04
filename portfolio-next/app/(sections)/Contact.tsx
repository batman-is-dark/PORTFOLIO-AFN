/**
 * Contact - Server component for the Contact section
 */

import Button from '../../components/ui/Button';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-40 px-6 bg-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-accent font-sans text-xs tracking-[0.5em] uppercase block">
                Contact
              </span>
              <h2
                id="contact-heading"
                className="text-7xl md:text-9xl font-display font-bold text-primary tracking-tighter"
              >
                Let&apos;s Talk.
              </h2>
            </div>

            <p className="text-2xl text-secondary font-sans leading-relaxed max-w-lg">
              I&apos;m always open to discussing new projects, research opportunities, or collaborations.
            </p>

            <div className="space-y-8 pt-8">
              <div className="group">
                <span className="text-accent font-sans text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Email</span>
                <a href="mailto:afnusha.r@gmail.com" className="text-primary text-3xl md:text-4xl font-display font-bold hover:text-accent transition-colors">
                  afnusha.r@gmail.com
                </a>
              </div>
              <div className="group">
                <span className="text-accent font-sans text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Phone</span>
                <a href="tel:+971558085931" className="text-primary text-3xl md:text-4xl font-display font-bold hover:text-accent transition-colors">
                  +971 55 808 5931
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="p-12 border border-white/10 relative group hover:border-accent transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-2 h-2 bg-accent animate-pulse"></div>
              </div>
              <h3 className="text-3xl font-display font-bold text-primary mb-6 italic">Current Status</h3>
              <p className="text-secondary font-sans text-lg leading-relaxed mb-10">
                Currently based in Dubai, UAE. Specializing in AI and Robotics. Available for remote collaboration worldwide.
              </p>
              <a
                href="mailto:afnusha.r@gmail.com"
                className="inline-flex items-center justify-center w-full py-6 bg-primary text-bg text-center font-sans font-bold uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-300"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}