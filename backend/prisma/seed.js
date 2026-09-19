// backend/prisma/seed.js

import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const projects = [
  {
    title: 'Portfolio v2',
    slug: 'portfolio-v2',
    type: 'Full Stack Developer Portfolio',
    description:
      'A premium full stack developer portfolio application with a public homepage, project details pages, contact form, analytics tracking, JWT authentication and a protected admin dashboard for managing projects and contact messages.',
    stack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Zustand',
      'Axios',
      'Express',
      'PostgreSQL',
      'Prisma',
      'JWT',
      'Docker',
      'Vercel',
      'Render',
      'Neon',
    ],
    highlights: [
      'Public Portfolio',
      'Project Details Pages',
      'Admin Dashboard',
      'Project CRUD',
      'Contact Messages',
      'Analytics Tracking',
      'JWT Auth',
      'Production Deployment',
    ],
    githubUrl: 'https://github.com/OvidijusRimkus/portfolio-v2',
    liveUrl: 'https://portfolio-v2-pi-vert.vercel.app',
    imageUrl: '/projects/portfolio-v2.png',
    status: 'Live',
    isFeatured: true,
    isPublished: true,
    sortOrder: 1,

    overview:
      'Portfolio v2 is a full stack developer portfolio built to present projects through a real backend-driven structure instead of static frontend-only data. The application includes a public landing page, dynamic project cards, individual project detail pages, contact form handling, analytics tracking and a protected admin dashboard. The goal was to build a portfolio that demonstrates not only UI skills, but also backend architecture, database modeling, authentication, deployment workflow and real project maintenance.',
    role:
      'I designed and built the project as a full stack developer. I was responsible for the React frontend, Express backend, PostgreSQL database structure, Prisma models, JWT authentication, admin dashboard, project CRUD logic, API integration, deployment configuration and GitHub workflow.',
    methodology:
      'The project was built step by step using a feature-based workflow. Each major area was developed in a separate Git branch, tested locally and merged through pull requests. The structure follows a practical full stack architecture with separated frontend and backend folders, shared API services, backend modules, validation layers and database migrations.',
    projectManagement:
      'Development was organized with a professional Git workflow using main for production, develop for integration and feature/fix/content branches for individual tasks. Main is connected to the deployed production version, while develop is used for testing and preparing future releases before merging into production.',
    developmentProcess:
      'The backend was built with Express, Prisma and PostgreSQL. It includes modular routes, controllers, services, validation schemas, centralized error handling and protected admin routes. The frontend was built with React, Vite, Tailwind CSS, React Router, Zustand and Axios. The public website loads project data from the backend API, while the admin dashboard allows managing project entries and contact messages. Later, deployment was added using Neon for PostgreSQL, Render for the backend API and Vercel for the frontend.',
    testingProcess:
      'The project was tested locally by running the PostgreSQL database with Docker, starting the backend API and loading the frontend through Vite. API health checks, project endpoints, contact form submission, admin login, protected routes and deployed frontend/backend communication were tested manually. Production deployment was verified by checking the Render health endpoint, Vercel frontend, project loading, CORS configuration and React Router SPA routing.',
    lessonsLearned:
      'This project helped me understand how a real portfolio can be built as a full stack product instead of a static page. I learned how to connect React with a backend API, structure backend modules, manage Prisma migrations, use environment variables safely, handle production CORS and cookies, deploy separated frontend/backend services and maintain a cleaner Git workflow with pull requests.',
    problemsSolved: [
      'Separated public portfolio content from backend-managed project data.',
      'Implemented protected admin routes using JWT stored in HttpOnly cookies.',
      'Solved production CORS issues between Vercel frontend and Render backend.',
      'Added SPA routing configuration for direct Vercel routes like /admin and /projects/:slug.',
      'Connected PostgreSQL production database through Neon and Prisma migrations.',
      'Improved project card rendering, screenshots and mobile animation timing.',
    ],
    techDetails: [
      'React and Vite were used for a fast frontend development setup.',
      'Tailwind CSS was used to create a dark premium UI with responsive layouts.',
      'React Router handles public pages, project details, login and admin routes.',
      'Zustand manages frontend authentication state.',
      'Axios centralizes API communication with credentials support.',
      'Express provides the backend REST API structure.',
      'Prisma manages database models, migrations and PostgreSQL access.',
      'JWT authentication is stored in HttpOnly cookies for safer admin sessions.',
      'Docker is used for local PostgreSQL development.',
      'Vercel, Render and Neon are used for production deployment.',
    ],
    images: [
  {
    url: '/projects/portfolio-v2.png',
    alt: 'Portfolio v2 homepage hero section',
    caption: 'Premium portfolio homepage with hero section and project positioning.',
    sortOrder: 1,
  },
  {
    url: '/projects/portfolio-v2-admin.png',
    alt: 'Portfolio v2 admin dashboard analytics overview',
    caption: 'Protected admin dashboard with analytics summary and portfolio management tabs.',
    sortOrder: 2,
  },
  {
    url: '/projects/portfolio-v2-case-study.png',
    alt: 'Portfolio v2 project case study details page',
    caption: 'Project details page rebuilt as a case study layout with summary, highlights and technical sections.',
    sortOrder: 3,
  },
],
  },
  {
  title: 'FitBook',
  slug: 'fitbook',
  type: 'Full Stack Booking Platform',
  description:
    'A full stack group training booking application built as a team project using Scrum-style workflow, Jira task management, testing feedback and bug fixing. Users can register, log in, browse training sessions, book sessions, manage their bookings and use an admin area for booking status management.',
  stack: [
    'React',
    'Vite',
    'Tailwind CSS',
    'Zustand',
    'Express',
    'PostgreSQL',
    'JWT',
    'Docker',
    'Jira',
    'Scrum',
  ],
  highlights: [
    'Team Project',
    'Scrum Workflow',
    'Jira Task Management',
    'User Authentication',
    'Booking Management',
    'Admin Dashboard',
    'Testing Feedback',
    'Bug Fixing',
    'Swagger API Docs',
  ],
  githubUrl: 'https://github.com/AugustinaCodes/pavasario-projektas-js.git',
  liveUrl: null,
  imageUrl: '/projects/fitbook.png',
  status: 'Completed',
  isFeatured: true,
  isPublished: true,
  sortOrder: 2,

  overview:
    'FitBook is a full stack booking application created for group training session management. Users can create an account, log in, browse available sessions, book training times and manage their personal reservations. The admin side allows reviewing bookings, changing booking statuses and monitoring activity through dashboard-style views. The project was built as a team project and focused not only on implementation, but also on collaboration, testing feedback and improving the product through bug fixing.',
  role:
    'I worked on the full stack implementation and helped connect the frontend booking flow with backend API logic. My work involved authentication, protected routes, booking management, admin functionality, database integration and API documentation. I also participated in team workflow, bug fixing and improving features based on testing feedback.',
  methodology:
    'The project followed a Scrum-style workflow with team collaboration, task planning and iterative development. Work was split into smaller tasks, discussed with the team and tracked through Jira. The focus was on building a working full stack product step by step instead of trying to complete everything at once.',
  projectManagement:
    'The project was organized as a team learning project using GitHub collaboration and Jira task tracking. Tasks were divided between team members, progress was reviewed regularly and testers helped identify bugs and usability issues. Reported problems were then discussed, prioritized and fixed during development.',
  developmentProcess:
    'The frontend was built with React, Vite, Tailwind CSS and Zustand for state management. The backend was built with Express and PostgreSQL, using JWT authentication and protected endpoints. Booking status logic was implemented so the admin could confirm, complete or cancel reservations. Swagger documentation was used to describe and test API endpoints. The project required connecting user-facing booking flows with backend data, admin management and real database persistence.',
  testingProcess:
    'Testing was performed manually by registering users, logging in, creating bookings, viewing personal reservations and checking admin booking status updates. Testers also reviewed the application and reported bugs or confusing user flows. Based on that feedback, issues were fixed, UI behavior was adjusted and the booking process was improved.',
  lessonsLearned:
    'FitBook helped me better understand full stack user flows, JWT authentication, admin/user separation, booking status logic and how frontend state connects with backend API responses. It also gave practical experience working in a team, using Scrum-style task planning, tracking work in Jira, receiving tester feedback and fixing bugs during development.',
  problemsSolved: [
    'Connected user authentication with protected frontend routes.',
    'Implemented booking creation and user booking history.',
    'Added admin booking status management.',
    'Handled frontend loading, empty and error states.',
    'Connected backend API responses with Zustand frontend state.',
    'Used Jira to organize tasks and track project progress.',
    'Fixed bugs reported during testing and improved the user flow.',
  ],
  techDetails: [
    'React and Vite were used for the frontend application.',
    'Tailwind CSS handled responsive UI styling.',
    'Zustand managed authentication and app state.',
    'Express provided REST API endpoints.',
    'PostgreSQL stored users, sessions and bookings.',
    'JWT was used for authentication and protected access.',
    'Docker supported local development setup.',
    'Swagger API docs helped document and test backend endpoints.',
    'Jira was used for task tracking and team workflow.',
    'Scrum-style planning helped organize team development work.',
  ],
  images: [
  {
    url: '/projects/fitbook.png',
    alt: 'FitBook available training sessions page',
    caption: 'Public training sessions page where users can browse and book available workouts.',
    sortOrder: 1,
  },
  {
    url: '/projects/fitbook-login.png',
    alt: 'FitBook login page',
    caption: 'Login page for users to access and manage their training schedule.',
    sortOrder: 2,
  },
  {
    url: '/projects/fitbook-register.png',
    alt: 'FitBook registration page',
    caption: 'Registration page for creating a new FitBook user profile.',
    sortOrder: 3,
  },
  {
    url: '/projects/fitbook-admin-bookings.png',
    alt: 'FitBook admin booking management page',
    caption: 'Admin booking management view for confirming, completing and cancelling user bookings.',
    sortOrder: 4,
  },
  {
    url: '/projects/fitbook-admin-sessions.png',
    alt: 'FitBook admin training session management page',
    caption: 'Admin session management page for creating, editing and deleting training sessions.',
    sortOrder: 5,
  },
  {
    url: '/projects/fitbook-analytics.png',
    alt: 'FitBook analytics dashboard',
    caption: 'Analytics dashboard showing users, sessions, bookings and booking status distribution.',
    sortOrder: 6,
  },
],
},
  {
    title: 'PetClinic Full Stack',
    slug: 'petclinic-fullstack',
    type: 'Veterinary Appointment System',
    description:
      'A full stack veterinary clinic management application with patient authentication, pet management, appointment booking, admin appointment control, role-based access and review management. The project uses a separated frontend and backend architecture with PostgreSQL persistence and Docker-based local development.',
    stack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Zustand',
      'Axios',
      'React Hook Form',
      'Zod',
      'Node.js',
      'Express',
      'PostgreSQL',
      'JWT',
      'bcryptjs',
      'Docker',
    ],
    highlights: [
      'Patient Authentication',
      'Pet Management',
      'Appointment Booking',
      'Admin Dashboard',
      'Role-based Access',
      'Review Management',
      'Docker Setup',
    ],
    githubUrl: 'https://github.com/OvidijusRimkus/petclinic-fullstack',
    liveUrl: null,
    imageUrl: '/projects/petclinic-fullstack.png',
    status: 'Completed',
    isFeatured: true,
    isPublished: true,
    sortOrder: 3,

    overview:
      'PetClinic Full Stack is a veterinary appointment management system with two main roles: patient and admin. Patients can register, manage pets, book appointments, view visit statuses and leave reviews after completed visits. Admin users can view clinic appointments, manage statuses, see registered users and monitor key clinic activity.',
    role:
      'I built and prepared this project as a full stack practice application. I worked with the React frontend, Express backend, PostgreSQL database, authentication logic, role-based access, appointment management and Docker-based local setup.',
    methodology:
      'The application was built around practical real-world flows: patient registration, pet CRUD, appointment booking, admin review and appointment status management. The project separates client and server code and uses REST API communication between the two parts.',
    projectManagement:
      'The project was organized as a standalone full stack repository with a clear README, screenshots, environment examples and Docker setup. It was prepared for GitHub presentation as a portfolio project, including documentation, project structure and setup instructions.',
    developmentProcess:
      'The frontend was developed with React, Vite, Tailwind CSS, React Router, Zustand, Axios, React Hook Form and Zod. The backend was developed with Node.js and Express using PostgreSQL persistence, JWT authentication, bcrypt password hashing, cookie handling and validation. Docker Compose was used to run the database and development services locally.',
    testingProcess:
      'Manual testing covered patient signup, login, pet creation, appointment booking, appointment filtering, admin login, appointment status changes and review management. Screenshots were captured from the homepage, patient dashboard and admin dashboard to document the finished application.',
    lessonsLearned:
      'PetClinic helped strengthen my understanding of role-based applications, appointment workflows, relational database usage, protected routes, form validation and Docker-based development. It also helped me practice preparing a project for GitHub with a professional README and screenshots.',
    problemsSolved: [
      'Built separate patient and admin experiences.',
      'Implemented pet CRUD functionality for logged-in patients.',
      'Created appointment booking with status management.',
      'Added role-based access between patient and admin routes.',
      'Prepared Docker and environment setup for local development.',
      'Improved README documentation with screenshots and setup instructions.',
    ],
    techDetails: [
      'React and Vite power the frontend application.',
      'Tailwind CSS is used for responsive dashboard styling.',
      'React Router handles patient, admin and authentication routes.',
      'Zustand manages client-side app state.',
      'Axios handles communication with the backend API.',
      'React Hook Form and Zod are used for form handling and validation.',
      'Express powers the backend API.',
      'PostgreSQL stores users, pets, appointments and reviews.',
      'JWT and bcryptjs are used for authentication and password security.',
      'Docker Compose provides a repeatable local development setup.',
    ],
    images: [
  {
    url: '/projects/petclinic-fullstack.png',
    alt: 'PetClinic homepage and login screen',
    caption:
      'Homepage with login, signup and demo access for the veterinary appointment system.',
    sortOrder: 1,
  },
  {
    url: '/projects/petclinic-patient-dashboard.png',
    alt: 'PetClinic patient dashboard',
    caption:
      'Patient dashboard for managing pets, booking appointments and viewing visit status.',
    sortOrder: 2,
  },
  {
    url: '/projects/petclinic-admin-dashboard.png',
    alt: 'PetClinic admin dashboard',
    caption:
      'Admin dashboard with clinic calendar, appointment overview and key statistics.',
    sortOrder: 3,
  },
],
  },
  {
  title: 'PayAPI Multi-page Website',
  slug: 'payapi-website',
  type: 'Frontend Multi-page Website',
  description:
    'A responsive team-built multi-page marketing website created with HTML, CSS and JavaScript. The project was developed with team collaboration, Scrum-style planning, Jira task tracking, testing feedback and bug fixing across Home, About, Pricing and Contact pages.',
  stack: [
    'HTML',
    'CSS',
    'JavaScript',
    'Responsive Design',
    'Multi-page Website',
    'Jira',
    'Scrum',
  ],
  highlights: [
    'Team Project',
    'Scrum Workflow',
    'Jira Task Management',
    'Responsive Layout',
    'Mobile Navigation',
    'Multi-page Structure',
    'Pricing Page',
    'Testing Feedback',
    'Bug Fixing',
  ],
  githubUrl: 'https://github.com/AugustinaCodes/techin_null_team',
  liveUrl: null,
  imageUrl: '/projects/payapi-website.png',
  status: 'Completed',
  isFeatured: true,
  isPublished: true,
  sortOrder: 4,

  overview:
    'PayAPI is a responsive multi-page marketing website built with HTML, CSS and JavaScript. The website includes Home, About, Pricing and Contact pages. It focuses on static website structure, responsive layouts, navigation behavior, reusable assets and polished frontend presentation. The project was completed as a team assignment with task planning, testing feedback and bug fixing.',
  role:
    'I contributed to the frontend implementation as part of a team project. The work focused on page layout, responsive behavior, styling, navigation and preparing the project for portfolio presentation. I also participated in fixing layout and usability issues that were discovered during testing.',
  methodology:
    'The project followed a Scrum-style team workflow with tasks divided between team members. Jira was used to track work, organize progress and make the development process clearer. The goal was to translate a marketing website design into a working responsive frontend while collaborating as a team.',
  projectManagement:
    'The project was completed as a team frontend assignment. Work was organized with Jira tasks, team discussions and testing feedback. Testers helped identify visual, responsive and usability problems, which were then fixed and reviewed during development.',
  developmentProcess:
    'The website was built using semantic HTML, CSS and JavaScript. Pages were separated by purpose, including Home, About, Pricing and Contact. CSS was used to create responsive sections, card layouts, navigation styling and visual consistency across the website. JavaScript handled interactive behavior such as navigation-related functionality.',
  testingProcess:
    'The website was tested manually by opening different pages, checking navigation links, reviewing layout behavior and comparing desktop/mobile responsiveness. Testing feedback helped identify spacing, layout and usability issues. The pricing page was selected as the portfolio screenshot because it has the clearest structure and strongest visual layout.',
  lessonsLearned:
    'This project helped improve static frontend fundamentals, responsive layout thinking, multi-page website structure, team collaboration and the importance of clean visual presentation in portfolio screenshots. It also gave more practice working with Jira, team planning, tester feedback and bug fixing.',
  problemsSolved: [
    'Created a responsive multi-page website structure.',
    'Built consistent navigation across pages.',
    'Implemented pricing card layout.',
    'Prepared static assets and page sections for presentation.',
    'Selected the strongest screenshot for portfolio display.',
    'Used Jira to organize frontend tasks.',
    'Fixed layout and usability issues found during testing.',
  ],
  techDetails: [
    'HTML was used for page structure and content.',
    'CSS handled layout, typography, spacing and responsiveness.',
    'JavaScript was used for interactive frontend behavior.',
    'Responsive design techniques were used to adapt the layout for different screens.',
    'The project was organized as a static multi-page website.',
    'Jira was used for task tracking and team coordination.',
    'Scrum-style workflow helped divide work into smaller frontend tasks.',
  ],
  images: [
    {
      url: '/projects/payapi-website.png',
      alt: 'PayAPI pricing page screenshot',
      caption: 'Pricing page layout showing a clean multi-column marketing website structure.',
      sortOrder: 1,
    },
  ],
},
];

/**
 * Seed sukuria:
 * - vieną admin vartotoją iš .env;
 * - pradinius portfolio projektus;
 * - projekto case study galerijos nuotraukas.
 *
 * Registracijos portfolio projekte nebus.
 */
async function main() {
  await seedAdmin();
  await seedProjects();
}

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env');
  }

  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters long');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: {
      username,
    },
    update: {
      passwordHash,
    },
    create: {
      username,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log('✅ Admin seeded successfully');
  console.log(admin);
}

async function seedProjects() {
  for (const project of projects) {
    const { images, ...projectData } = project;

    const seededProject = await prisma.$transaction(async (tx) => {
      const savedProject = await tx.project.upsert({
        where: {
          slug: projectData.slug,
        },
        update: projectData,
        create: projectData,
        select: {
          id: true,
          title: true,
          slug: true,
          isFeatured: true,
          isPublished: true,
        },
      });

      await tx.projectImage.deleteMany({
        where: {
          projectId: savedProject.id,
        },
      });

      if (images.length > 0) {
        await tx.projectImage.createMany({
          data: images.map((image) => ({
            ...image,
            projectId: savedProject.id,
          })),
        });
      }

      return savedProject;
    });

    console.log(`✅ Project seeded: ${seededProject.title}`);
  }
}

main()
  .catch((error) => {
    console.error('❌ Seed failed');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });