/**
 * Achievements - Server component for Awards and Volunteering
 */

export function Achievements() {
    return (
        <section aria-labelledby="achievements-heading" className="relative py-24 px-4 overflow-hidden">
            <div className="relative max-w-4xl mx-auto">
                <h2
                    id="achievements-heading"
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
                >
                    Key Achievements
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* TechFest */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
                                <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <div className="text-yellow-400 font-bold mb-2">3rd Place</div>
                            <h3 className="text-xl font-bold mb-2">TechFest 2025</h3>
                            <p className="text-gray-300 text-sm">Environmental Data Analysis Project</p>
                        </div>
                    </div>

                    {/* Innovista */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <div className="text-cyan-400 font-bold mb-2">Nominee</div>
                            <h3 className="text-xl font-bold mb-2">Best Innovation Award</h3>
                            <p className="text-gray-300 text-sm">Innovista Robot Fish Project</p>
                        </div>
                    </div>

                    {/* SciScape */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.75 3c1.99 0 3.757 1.008 4.75 2.543C13.493 4.008 15.26 3 17.25 3c3.036 0 5.5 2.322 5.5 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.47 0l-.003-.001z" />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <div className="text-pink-400 font-bold mb-2">Volunteer</div>
                            <h3 className="text-xl font-bold mb-2">Recognition (2024)</h3>
                            <p className="text-gray-300 text-sm">SciScape Science Fair Logistics & Mentoring</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
