/**
 * Achievements - Server component for Awards and Volunteering
 */

export function Achievements() {
    return (
        <section id="achievements" aria-labelledby="achievements-heading" className="relative py-40 px-6 overflow-hidden bg-bg border-t border-white/5">
            <div className="relative max-w-7xl mx-auto">
                <div className="space-y-6 mb-24 text-center">
                    <span className="text-accent font-sans text-xs tracking-[0.5em] uppercase block">
                        Milestones
                    </span>
                    <h2
                        id="achievements-heading"
                        className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
                    >
                        Key Achievements
                    </h2>
                </div>

                <div className="grid gap-px bg-white/10 border border-white/10 md:grid-cols-3">
                    {/* TechFest */}
                    <div className="bg-bg p-12 hover:bg-surface transition-all duration-700 group relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-accent font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <span className="w-6 h-px bg-accent"></span>
                                3rd Place
                            </div>
                            <h3 className="text-3xl font-display font-bold text-primary mb-6 group-hover:text-accent transition-colors leading-tight">TechFest 2025</h3>
                            <p className="text-secondary font-sans text-lg leading-relaxed">Environmental Data Analysis Project focusing on sustainable urban development.</p>
                        </div>
                        <div className="absolute -bottom-6 -right-6 text-primary/5 font-display font-bold text-9xl group-hover:text-accent/10 transition-all duration-700">
                            01
                        </div>
                    </div>

                    {/* Innovista */}
                    <div className="bg-bg p-12 hover:bg-surface transition-all duration-700 group relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-accent font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <span className="w-6 h-px bg-accent"></span>
                                Nominee
                            </div>
                            <h3 className="text-3xl font-display font-bold text-primary mb-6 group-hover:text-accent transition-colors leading-tight">Best Innovation Award</h3>
                            <p className="text-secondary font-sans text-lg leading-relaxed">Innovista Robot Fish Project exploring biomimetic propulsion systems.</p>
                        </div>
                        <div className="absolute -bottom-6 -right-6 text-primary/5 font-display font-bold text-9xl group-hover:text-accent/10 transition-all duration-700">
                            02
                        </div>
                    </div>

                    {/* SciScape */}
                    <div className="bg-bg p-12 hover:bg-surface transition-all duration-700 group relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-accent font-sans font-bold text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <span className="w-6 h-px bg-accent"></span>
                                Volunteer
                            </div>
                            <h3 className="text-3xl font-display font-bold text-primary mb-6 group-hover:text-accent transition-colors leading-tight">Recognition (2024)</h3>
                            <p className="text-secondary font-sans text-lg leading-relaxed">SciScape Science Fair Logistics & Mentoring for junior researchers.</p>
                        </div>
                        <div className="absolute -bottom-6 -right-6 text-primary/5 font-display font-bold text-9xl group-hover:text-accent/10 transition-all duration-700">
                            03
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
