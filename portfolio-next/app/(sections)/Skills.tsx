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
    <section id="skills" aria-labelledby="skills-heading" className="relative py-40 px-6 overflow-hidden bg-bg border-t border-white/5">
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="space-y-6">
            <span className="text-accent font-sans text-xs tracking-[0.5em] uppercase block">
              Technical Stack
            </span>
            <h2
              id="skills-heading"
              className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tighter"
            >
              Expertise
            </h2>
          </div>
          <p className="text-secondary max-w-md font-sans text-xl leading-relaxed">
            A comprehensive toolkit developed through rigorous academic study and hands-on project engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-bg p-12 hover:bg-surface transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-500"></div>
              <h3 className="text-[10px] font-sans font-bold text-accent uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-5 py-2.5 bg-surface border border-white/5 text-primary font-sans text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}