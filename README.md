<!-- README.md -->

# Portfolio v2

A premium full stack developer portfolio built with React, Express, PostgreSQL, Prisma and Docker.

This project is more than a static portfolio website. It includes a real backend API, database-backed projects, contact form submissions, analytics tracking, authentication and an admin dashboard for managing portfolio content.

---

## Overview

Portfolio v2 is a full stack application designed to showcase developer projects, technical skills and practical application architecture.

The public website presents selected projects, project details, technical background, development process and contact form. The admin dashboard allows managing projects, viewing contact messages and checking analytics data.

---

## Features

### Public Website

- Premium responsive landing page
- About section
- Development process section
- Tech stack section
- Featured projects loaded from backend API
- Public project details pages
- Contact form
- Custom 404 and error pages
- SEO meta basics
- Custom favicon
- CV download link

### Backend API

- Express REST API
- PostgreSQL database
- Prisma ORM
- Zod validation
- JWT authentication with HttpOnly cookies
- Protected admin routes
- Contact message storage
- Analytics event tracking
- Project CRUD API

### Admin Dashboard

- Admin login
- Dashboard tabs
- Analytics overview
- Contact message management
- Project management
- Create, edit and delete portfolio projects
- Publish / hide projects
- Featured project control

---

## Screenshots

Screenshots will be added in the next documentation step.

### Homepage

![Homepage](docs/screenshots/homepage.png)

### Projects Section

![Projects section](docs/screenshots/projects-section.png)

### Project Details Page

![Project details](docs/screenshots/project-details.png)

### Admin Dashboard

![Admin dashboard](docs/screenshots/admin-dashboard.png)

### Admin Projects Management

![Admin projects](docs/screenshots/admin-projects.png)

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Zustand
- Axios
- Motion React
- React Icons

### Backend

- Node.js
- Express
- PostgreSQL
- Prisma
- JWT
- bcryptjs
- cookie-parser
- cors
- dotenv
- zod
- helmet
- express-rate-limit

### Dev Tools

- Docker
- Docker Compose
- Git
- GitHub
- ESLint
- Prettier
- Nodemon

---

## Project Structure

```txt
portfolio-v2/
  backend/
    prisma/
      migrations/
      schema.prisma
      seed.js
    src/
      config/
      db/
      middleware/
      modules/
        admin/
        analytics/
        auth/
        contact/
        projects/
      utils/
      app.js
      server.js

  frontend/
    public/
      cv/
      favicon.svg
    src/
      app/
      features/
        admin/
        analytics/
        auth/
        contact/
        home/
        projects/
      shared/
        api/
        components/
        hooks/
        layouts/
        pages/
      main.jsx

  docs/
    screenshots/

  docker-compose.yml
  .env.example
  README.md
```

---

## API Endpoints

### Health

```txt
GET /api
GET /api/health
```

### Auth

```txt
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Contact

```txt
POST /api/contact
```

### Admin Contact Messages

```txt
GET /api/admin/contact-messages
PATCH /api/admin/contact-messages/:id/read
```

### Analytics

```txt
POST /api/analytics/events
GET /api/analytics/summary
```

### Projects

```txt
GET /api/projects
GET /api/projects/:slug
GET /api/projects/admin/all
POST /api/projects
PATCH /api/projects/:id
DELETE /api/projects/:id
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/OvidijusRimkus/portfolio-v2.git
cd portfolio-v2
```

### 2. Create environment file

Copy `.env.example` to `backend/.env`:

```bash
cp .env.example backend/.env
```

Example environment variables:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5433/portfolio_db?schema=public"

JWT_SECRET="change_this_to_a_long_random_secret"
JWT_EXPIRES_IN="7d"
JWT_COOKIE_NAME="portfolio_token"

ADMIN_USERNAME="admin"
ADMIN_PASSWORD="change_this_password"

COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
```

---

## Running Locally

### 1. Start PostgreSQL with Docker

```bash
docker compose up -d
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Generate Prisma client and run migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Seed admin user and initial projects

```bash
npm run prisma:seed
```

### 5. Start backend

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

### 6. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 7. Start frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Admin Access

Default development admin credentials are created from environment variables:

```txt
username: admin
password: change_this_password
```

Admin dashboard:

```txt
http://localhost:5173/login
```

---

## Database Models

Current Prisma models:

```txt
Admin
ContactMessage
AnalyticsEvent
Project
```

The application uses PostgreSQL as the main database and Prisma as the ORM.

---

## Main Functionality

### Public Portfolio

The public side of the application allows visitors to:

- View the developer profile
- Read about technical background
- Browse featured projects
- Open detailed project pages
- Submit contact messages
- Download CV
- Navigate through a responsive header
- See custom error pages instead of default router errors

### Admin Dashboard

The admin dashboard allows the owner to:

- Log in securely
- View analytics summary
- View contact form submissions
- Mark messages as read
- Create new portfolio projects
- Edit existing projects
- Delete projects
- Publish or hide projects
- Mark projects as featured

---

## What I Built

This project demonstrates practical full stack development skills:

- Planning a modular full stack architecture
- Building REST APIs with Express
- Designing PostgreSQL database models with Prisma
- Implementing authentication with JWT and HttpOnly cookies
- Creating protected admin routes
- Building responsive React UI with reusable components
- Managing client state with Zustand
- Connecting frontend and backend with Axios
- Handling forms, validation, loading states and errors
- Tracking analytics events
- Managing project content through an admin dashboard
- Using Docker for local database development
- Working with Git branches and pull requests

---

## Future Improvements

- Production deployment
- Real CV PDF integration
- Better analytics charts
- Contact email notifications
- Image upload support for projects
- More detailed project case studies
- Profile README and additional GitHub project documentation
- Automated tests

---

## Author

**Ovidijus Rimkus**

Junior Full Stack Developer focused on React, Express, PostgreSQL, Prisma, Docker and clean full stack architecture.

- GitHub: [OvidijusRimkus](https://github.com/OvidijusRimkus)
- LinkedIn: [OvidijusRimkus](www.linkedin.com/in/ovidijus-rimkus)
- Portfolio: add deployed portfolio link here