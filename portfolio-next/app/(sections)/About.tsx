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
    <section aria-labelledby="about-heading" className="relative py-24 px-4 overflow-hidden">
      {/* Background with diagonal stripes */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(6, 182, 212, 0.05) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(124, 58, 237, 0.05) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(6, 182, 212, 0.05) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(124, 58, 237, 0.05) 75%)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }} />
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      
      <div className="relative max-w-4xl mx-auto">
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