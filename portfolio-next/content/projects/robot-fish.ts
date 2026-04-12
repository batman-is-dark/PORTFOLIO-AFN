import { Project } from '../../types/content';

export const robotFishProject: Project = {
    slug: 'robot-fish',
    title: 'Bio-Mimetic Robotic Fish',
    role: 'Robotics Firmware Engineer',
    timeframe: '2025',
    stack: ['C++', 'Ultrasonic Sensors', 'L298N Drivers', 'Arduino', 'Embedded Systems'],
    problem: 'Marine waste collection and autonomous navigation in aquatic environments require bio-mimetic systems that are efficient, stable, and environmentally safe.',
    approach: 'Designed and debugged C++ firmware for a bio-mimetic robotic fish, integrating ultrasonic sensor fusion for advanced navigation and obstacle avoidance. Programmed motor control logic using L298N drivers with custom waterproof modular circuitry.',
    outcomes: 'Improved navigation efficiency by 25% through advanced sensor fusion algorithms and achieved 95% plastic collection rate during field testing.',
    impact: 'Validated system viability for large-scale maritime waste mitigation, demonstrating the effectiveness of bio-inspired robotics for environmental sustainability.',
    links: [
        { label: 'GitHub Repo', url: 'https://github.com/batman-is-dark' }
    ],
    featured: true,
    images: {
        hero: '/images/projects/robot-fish.png',
        thumb: '/images/projects/robot-fish.png'
    }
};

export default robotFishProject;
