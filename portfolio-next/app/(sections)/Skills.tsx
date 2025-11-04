/**
 * Skills - Server component for the Skills section
 */

import Badge from '../../components/ui/Badge';

export function Skills() {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'R', 'C++'],
    },
    {
      title: 'ML/AI Frameworks',
      skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'OpenCV', 'spaCy'],
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'Docker', 'Jupyter', 'NumPy', 'Pandas', 'React', 'Next.js', 'Node.js'],
    },
  ];

  return (
    <section aria-labelledby="skills-heading" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
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