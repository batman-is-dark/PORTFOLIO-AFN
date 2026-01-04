/**
 * Academic - Server component for the Academic section
 */

export function Academic() {
    return (
        <section id="academic" aria-labelledby="academic-heading" className="relative py-40 px-6 overflow-hidden bg-bg border-t border-white/5">
            <div className="relative max-w-7xl mx-auto">
                <div className="space-y-6 mb-24">
                    <span className="text-accent font-sans text-xs tracking-[0.5em] uppercase block">
                        Foundations
                    </span>
                    <h2
                        id="academic-heading"
                        className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
                    >
                        Academic Summary
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-24">
                    {/* Education */}
                    <div className="lg:col-span-7 space-y-12">
                        <h3 className="text-[10px] font-sans font-bold text-accent uppercase tracking-[0.4em] flex items-center gap-4">
                            Education
                        </h3>
                        <div className="bg-surface p-12 border border-white/10 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <span className="text-6xl font-display font-bold text-primary/5 group-hover:text-accent/10 transition-colors">01</span>
                            </div>
                            <h4 className="text-4xl font-display font-bold text-primary leading-tight">The Indian High School, Dubai</h4>
                            <p className="text-secondary font-sans mt-4 text-lg italic">CBSE Curriculum (2012-2026)</p>
                            
                            <div className="mt-16 space-y-10">
                                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                                    <span className="font-sans text-secondary uppercase tracking-[0.2em] text-[10px] font-bold">Expected Aggregate</span>
                                    <span className="text-4xl font-display font-bold text-accent">85%</span>
                                </div>
                                
                                <div className="space-y-6">
                                    <h5 className="font-sans font-bold text-primary uppercase tracking-[0.2em] text-[10px]">Relevant Coursework</h5>
                                    <div className="flex flex-wrap gap-4">
                                        {['Calculus', 'Linear Algebra', 'Probability & Statistics', 'Matrices', 'Python Programming', 'Information Technology'].map(course => (
                                            <span key={course} className="px-4 py-2 bg-bg text-secondary border border-white/5 text-xs font-sans uppercase tracking-widest hover:border-accent hover:text-primary transition-all">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="lg:col-span-5 space-y-12">
                        <h3 className="text-[10px] font-sans font-bold text-accent uppercase tracking-[0.4em] flex items-center gap-4">
                            Certifications
                        </h3>
                        <div className="space-y-6">
                            {[
                                { name: 'CS50P: Introduction to Python', issuer: 'Harvard University' },
                                { name: 'Scientific Computing with Python', issuer: 'FreeCodeCamp' },
                                { name: 'Data Analysis with Python', issuer: 'FreeCodeCamp' },
                                { name: 'Machine Learning with Python', issuer: 'FreeCodeCamp' }
                            ].map((cert, i) => (
                                <div key={cert.name} className="bg-surface p-8 border border-white/10 flex justify-between items-center group hover:border-accent transition-all duration-500">
                                    <div>
                                        <h5 className="font-display font-bold text-xl text-primary group-hover:text-accent transition-colors">{cert.name}</h5>
                                        <p className="text-[10px] text-secondary font-sans uppercase tracking-[0.2em] mt-2 font-bold">{cert.issuer}</p>
                                    </div>
                                    <span className="text-primary/10 font-display font-bold text-2xl group-hover:text-accent/30 transition-colors">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
