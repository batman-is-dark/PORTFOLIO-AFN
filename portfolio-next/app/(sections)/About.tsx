/**
 * About - Server component for the About section
 */

import Badge from '../../components/ui/Badge';
import { AboutImage } from './AboutImage';

export function About() {
  const interests = ['Machine Learning', 'Computer Vision', 'Natural Language Processing'];
  const coursework = [
    'Deep Learning',
    'Statistical Learning',
    'Data Structures & Algorithms',
    'Linear Algebra',
    'Probability & Statistics',
  ];

  return (
    <section aria-labelledby="about-heading" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          id="about-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
        >
          About Me
        </h2>
        
        <AboutImage />
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            I am an aspiring AI engineer with a strong foundation in computer science and mathematics,
            preparing to pursue advanced studies at Mohamed bin Zayed University of Artificial Intelligence (MBZUAI).
            My passion lies in developing intelligent systems that can understand, learn, and solve complex real-world problems.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300">
            Through hands-on projects and rigorous coursework, I have developed expertise in machine learning algorithms,
            neural network architectures, and data analysis. I am particularly interested in the intersection of computer vision
            and natural language processing, exploring how AI can better understand and interact with the world.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Research Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="default">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Relevant Coursework
          </h3>
          <div className="flex flex-wrap gap-2">
            {coursework.map((course) => (
              <Badge key={course} variant="outline">
                {course}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}