# Personal Portfolio Website

## Overview
A modern, stunning personal portfolio website showcasing software development projects with an impressive animated landing page. Built with React, TypeScript, and Tailwind CSS featuring glassmorphism effects, smooth animations, and responsive design.

## Recent Changes
- **October 22, 2025**: Initial implementation and hacker theme update
  - Created animated landing overlay with pixel dissolution effect (5s duration)
  - Built responsive navigation with glassmorphism effect
  - Implemented hero section with gradient text and floating background elements
  - Created about section with expertise cards and skill badges
  - Built project showcase with hover effects and glassmorphism cards
  - Added contact section with social media links
  - Integrated LinkedIn and GitHub links throughout (navigation, hero, contact, footer)
  - Generated project images for portfolio showcase
  - Implemented backend API for project data
  - **Added Admin Page** - Full-featured project management interface at `/admin`
    - Two-column layout: form on left, project list on right
    - Direct file upload for project images (multer integration, max 5MB)
    - Add new projects with validation
    - Edit existing projects (click Edit to populate form)
    - Delete projects with confirmation
    - View all projects with thumbnails and tech badges
    - Image preview before submission
    - Real-time updates to homepage after changes
    - Mobile-responsive admin interface
    - Navigation links from desktop and mobile menus
    - Removed live URL field (only GitHub URL remains)
  - **Updated to Hacker Theme** - Darker cyberpunk aesthetic
    - Near-black backgrounds (4% lightness) for dramatic contrast
    - Neon green primary accent (140° 90% 50%) - classic hacker/terminal color
    - Electric cyan secondary accent (180° 85% 55%)
    - Darker cards and elevated surfaces (7% lightness)
    - Green glow effects on hover states
    - Added JetBrains Mono as monospace font option
  - **Secured Admin Authentication** - Production-ready security implementation
    - Server-side session management using express-session
    - HttpOnly cookies to prevent XSS attacks
    - SameSite=lax cookies to prevent CSRF attacks
    - requireAdmin middleware protecting POST /api/projects endpoint
    - Login/logout endpoints with proper session handling
    - 24-hour session expiration
    - Environment secrets: ADMIN_PASSWORD and SESSION_SECRET required

## Project Architecture

### Frontend Structure
- **LandingOverlay**: Hacker-themed animated entry screen with white hacker logo that dissolves pixel by pixel (no fading), pixels removed randomly over 5s using canvas-based masking
- **Navigation**: Sticky glassmorphism navbar with smooth scroll, mobile menu, admin link
- **HeroSection**: Large gradient text, floating background elements, prominent CTAs
- **AboutSection**: Bio, skills grid, expertise cards with icons
- **ProjectsSection**: Grid of project cards with images, tech badges, links
- **ContactSection**: Email, social links, glassmorphism card design
- **Footer**: Minimal design with social icons and copyright
- **AdminPage**: Project management interface with form to add new projects

### Data Model
```typescript
Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: string
}
```

### Design System
- **Primary Color**: Neon Green (140 90% 50%) - hacker/terminal aesthetic for CTAs and accents
- **Secondary Color**: Electric Cyan (180 85% 55%) - cyberpunk highlights
- **Backgrounds**: Near-black (4%) base, Dark charcoal (7%) elevated surfaces
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (code/monospace)
- **Effects**: Dark glassmorphism, green gradient text, neon glow effects, pixel dissolution
- **Animations**: Fade-in, green glow hover, pixel-dissolve landing

## Key Features
1. **Animated Landing Page**: Full-screen gradient overlay with fade transition
2. **Responsive Design**: Mobile-first, works on all screen sizes
3. **Glassmorphism UI**: Modern frosted glass effects on cards and navigation
4. **Smooth Animations**: Fade-ins, hover effects, floating elements
5. **Social Integration**: LinkedIn and GitHub links in multiple locations
6. **Project Showcase**: 6 featured projects with images and tech stacks
7. **Smooth Scrolling**: Anchor links with smooth scroll behavior
8. **Admin Interface**: Easy-to-use page to add new projects to the portfolio

## Technologies Used
- React 18 with TypeScript
- Tailwind CSS for styling
- Wouter for routing
- TanStack Query for data fetching
- Framer Motion concepts (via Tailwind animations)
- Shadcn UI components
- Express.js backend
- In-memory data storage

## API Endpoints
- `GET /api/projects` - Returns all projects
- `GET /api/projects/featured` - Returns featured projects only
- `POST /api/projects` - Creates a new project (admin only)
- `PATCH /api/projects/:id` - Updates an existing project (admin only)
- `DELETE /api/projects/:id` - Deletes a project (admin only)
- `POST /api/upload` - Upload project image file (admin only, multer middleware)
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - Admin logout

## User Preferences
- Modern, contemporary design with smooth animations
- Professional portfolio aesthetic
- Prominent social media presence (LinkedIn, GitHub)
- Glassmorphism and gradient effects

## Deployment Configuration
- **Hosting:** PythonAnywhere with GoDaddy domain
- **Environment Variables:** Using `.env` file (compatible with PythonAnywhere)
- **Admin Password:** password123333 (stored in .env)
- **Environment Package:** dotenv for loading .env files
- **Production Ready:** Full deployment guide in DEPLOYMENT.md and README.md
