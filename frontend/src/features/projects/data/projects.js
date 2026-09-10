// frontend/src/features/projects/data/projects.js

/**
 * Laikini featured projektų duomenys.
 *
 * Kol neturime backend projects modulio, projektus laikome frontend data faile.
 * Vėliau šituos duomenis galėsime perkelti į PostgreSQL ir valdyti per Admin Dashboard.
 */
export const featuredProjects = [
  {
    id: 'fitbook',
    title: 'FitBook',
    type: 'Full Stack Booking Platform',
    description:
      'A training session booking application with authentication, admin dashboard, booking statuses and protected routes.',
    stack: ['React', 'Zustand', 'Express', 'Prisma', 'PostgreSQL'],
    status: 'Completed',
    metrics: ['JWT Auth', 'Admin Panel', 'Booking Flow'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio v2',
    type: 'Production Portfolio Application',
    description:
      'A premium full stack developer portfolio with analytics, contact forms, CV tracking and admin dashboard.',
    stack: ['React', 'Motion', 'Tailwind', 'Express', 'Docker'],
    status: 'In progress',
    metrics: ['Analytics', 'SEO', 'Dashboard'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'petclinic',
    title: 'PetClinic',
    type: 'Practice Management System',
    description:
      'A PetClinic-style full stack application focused on CRUD operations, clean architecture and real-world API structure.',
    stack: ['React', 'Axios', 'Node.js', 'Prisma', 'PostgreSQL'],
    status: 'Practice project',
    metrics: ['CRUD', 'REST API', 'Database'],
    githubUrl: '#',
    liveUrl: '#',
  },
];