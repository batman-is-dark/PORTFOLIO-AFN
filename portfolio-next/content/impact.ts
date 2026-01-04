/**
 * Impact Data - Real-life leadership and skills evidence
 * Aviation Theme: Waypoints on a flight path
 */

export interface ImpactRole {
  id: string;
  title: string;
  agency: string;
  description: string;
  impactPoints: string[];
  category: 'Leadership' | 'Technical' | 'Community' | 'Editorial';
  coordinates: [number, number, number]; // Isometric positions
  color: string;
}

export const impactRoles: ImpactRole[] = [
  {
    id: 'sciscape-lead',
    title: 'Team Lead',
    agency: 'SciScape Hackathon (Grade 11)',
    description: 'Directed a student team in a high-pressure hackathon environment, coordinating project development from ideation to final prototype.',
    impactPoints: [
      'Led team strategy and delegation',
      'Managed rapid prototyping timeline',
      'Facilitated cross-functional collaboration'
    ],
    category: 'Leadership',
    coordinates: [-10, 5, -10], // Top Left
    color: '#FF3300' // International Orange
  },
  {
    id: 'magazine-editor',
    title: 'Editor & Proofreader',
    agency: 'Class Magazine (Grade 11)',
    description: 'Oversaw the editorial process for the class publication, ensuring linguistic precision and compelling narrative flow.',
    impactPoints: [
      'Curated content and article selection',
      'Enforced rigorous quality standards',
      'Refined visual layout and typography'
    ],
    category: 'Editorial',
    coordinates: [-5, 2.5, -5], // Mid-Left
    color: '#A1A1AA' // Zinc
  },
  {
    id: 'arduino-programmer',
    title: 'Arduino Programmer',
    agency: 'Innovista (Grade 12)',
    description: 'Engineered custom embedded systems solutions, optimizing hardware-software integration for reliability.',
    impactPoints: [
      'Developed efficient C++ control logic',
      'Integrated sensor arrays and actuators',
      'Debugged hardware constraints in real-time'
    ],
    category: 'Technical',
    coordinates: [0, 0, 0], // Center
    color: '#FFFFFF' // White
  },
  {
    id: 'sciscape-volunteer',
    title: 'Volunteer',
    agency: 'SciScape (Grade 11)',
    description: 'Supported event logistics and participant experience, demonstrating commitment to the scientific community.',
    impactPoints: [
      'Managed on-site event operations',
      'Assisted judicial panels and guests',
      'Solved clear logistical bottlenecks'
    ],
    category: 'Community',
    coordinates: [5, -2.5, 5], // Mid-Right
    color: '#71717A' // Zinc
  },
  {
    id: 'class-monitor',
    title: 'Class Monitor',
    agency: 'Student Council (Grade 12)',
    description: 'Served as principal liaison between faculty and the student body, maintaining discipline and fostering a productive academic environment.',
    impactPoints: [
      'Mediated student-faculty communications',
      'Organized classroom resources and schedules',
      'Upholded school code of conduct'
    ],
    category: 'Leadership',
    coordinates: [10, -5, 10], // Bottom Right
    color: '#FF3300' // International Orange
  }
];
