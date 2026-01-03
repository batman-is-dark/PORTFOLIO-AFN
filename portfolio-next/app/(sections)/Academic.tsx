/**
 * Academic - Server component for the Academic section
 */

export function Academic() {
    return (
        <section aria-labelledby="academic-heading" className="relative py-24 px-4 overflow-hidden bg-gray-50 dark:bg-gray-900/50">
            <div className="relative max-w-4xl mx-auto">
                <h2
                    id="academic-heading"
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12"
                >
                    Academic Summary
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Education */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-cyan-500">Education</h3>
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">The Indian High School, Dubai</h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">CBSE Curriculum (2012-2026)</p>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Expected Aggregate</span>
                                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-bold border border-green-500/20">85%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Special Skill Subject</span>
                                    <span className="text-gray-900 dark:text-white">Artificial Intelligence</span>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <h5 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                                        Relevant Coursework
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {['Calculus', 'Linear Algebra', 'Probability & Statistics', 'Matrices', 'Python Programming', 'Information Technology'].map(course => (
                                            <span key={course} className="px-2 py-1 bg-white/5 text-gray-300 border border-white/10 rounded text-xs font-medium">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-purple-500">Certifications</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'CS50P: Introduction to Python', issuer: 'Harvard University' },
                                { name: 'Scientific Computing with Python', issuer: 'FreeCodeCamp' },
                                { name: 'Data Analysis with Python', issuer: 'FreeCodeCamp' },
                                { name: 'Machine Learning with Python', issuer: 'FreeCodeCamp' }
                            ].map((cert) => (
                                <div key={cert.name} className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
                                    <div>
                                        <h5 className="font-bold text-gray-900 dark:text-white">{cert.name}</h5>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.751zM8.829 7.251c.3-.48.741-.713 1.171-.713.43 0 .87.233 1.17.713.192.306.408.827.6 1.466.193.645.402 1.458.64 2.28.235.81.5 1.595.789 2.176.15.299.3.53.445.69.146.16.313.288.525.288.212 0 .38-.127.525-.288.145-.16.295-.391.445-.69.289-.581.554-1.366.789-2.176.238-.822.447-1.635.64-2.28.192-.639.408-1.16.6-1.466.3-.48.741-.713 1.171-.713.43 0 .87.233 1.17.713.301.48.083 1.226-.22 2.236-.306 1.02-.73 2.305-1.17 3.472-.428 1.136-.884 2.133-1.25 2.829-.365.696-.63 1.092-.78 1.232-.15.14-.27.207-.44.207-.17 0-.29-.067-.44-.207-.15-.14-.415-.536-.78-1.232-.366-.696-.822-1.693-1.25-2.829-.44-1.167-.864-2.452-1.17-3.472-.303-1.01-.52-1.756-.22-2.236z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
