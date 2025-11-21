/**
 * Skills - Server component for the Skills section
 */

import Badge from '../../components/ui/Badge';

export function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'C++', 'SQL', 'HTML', 'JavaScript', 'Arabic', 'English'],
    },
    {
      title: 'AI & Machine Learning',
      skills: ['TensorFlow', 'Keras', 'Scikit-Learn', 'NLTK', 'Pandas', 'NumPy', 'OpenCV'],
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'Power BI', 'Streamlit', 'Arduino', 'Robotics', 'IBM Data Science'],
    },
    {
      title: 'Core Competencies',
      skills: ['Data Analysis', 'Deductive Reasoning', 'Circuit Design', 'Scientific Computing'],
    }
  ];

  return (
    <section aria-labelledby="skills-heading" className="relative py-24 px-4 overflow-hidden">
      {/* Hexagon pattern background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, rgba(6, 182, 212, 0.15) 2px, transparent 0),
            radial-gradient(circle at 60px 60px, rgba(124, 58, 237, 0.15) 2px, transparent 0)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Animated gradient waves */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50" style={{
        animation: 'shimmer 3s linear infinite',
        backgroundSize: '200% 100%'
      }} />

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full" />

      <div className="relative max-w-4xl mx-auto">
        <h2
          id="skills-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Skills & Technologies
        </h2>

        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}