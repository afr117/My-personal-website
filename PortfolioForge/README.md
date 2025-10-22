# Personal Portfolio Website

A modern, cyberpunk-themed portfolio website featuring a dramatic animated landing page and dynamic project showcase. Built for developers who want to make a bold first impression.

## Overview

This is a professional portfolio website with a hacker aesthetic, designed to showcase your software development projects with style. The site features a unique pixel-dissolving landing animation, neon green accents, and a sleek dark interface that stands out from typical portfolios.

## Key Features

### 🎬 Animated Landing Page
When visitors first arrive, they see a white hacker silhouette that dissolves pixel-by-pixel over 5 seconds before revealing your portfolio. This creates a memorable first impression and sets the cyberpunk tone.

### 🎨 Hacker Theme Design
- **Near-black backgrounds** for dramatic contrast
- **Neon green accents** (inspired by classic terminal interfaces)
- **Electric cyan highlights** for a cyberpunk feel
- **Smooth animations and glow effects** throughout

### 📱 Fully Responsive
The website adapts perfectly to all screen sizes—from mobile phones to desktop monitors—ensuring your portfolio looks great on any device.

### 🛠️ Admin Panel with File Upload
Easily manage your projects without touching code:
1. Navigate to `/admin` in your browser
2. Upload project screenshots directly from your computer
3. Fill out project details (title, description, technologies, GitHub link)
4. Add, edit, or delete projects instantly

### 🔗 Social Media Integration
Your LinkedIn and GitHub profiles are prominently displayed throughout the site:
- Navigation bar
- Hero section call-to-action buttons
- Contact section
- Footer

## What's Included

### Main Sections
1. **Hero Section** - Large welcome message with gradient text and clear call-to-action buttons
2. **About Section** - Your bio, skills, and areas of expertise
3. **Projects Section** - Grid showcasing your work with images, tech stacks, and links
4. **Contact Section** - Easy ways for visitors to reach you
5. **Footer** - Social links and copyright information

### Pre-loaded Projects
The portfolio comes with 6 sample projects demonstrating various technologies:
- Analytics Dashboard
- E-commerce Platform
- Task Management App
- Social Media Hub
- Weather Forecast App
- Portfolio Generator

You can keep these as examples or replace them with your own work via the admin panel.

## Technologies Used

**Frontend:**
- React - Modern JavaScript framework for building user interfaces
- TypeScript - Adds type safety to JavaScript
- Tailwind CSS - Utility-first styling framework
- Wouter - Lightweight routing

**Backend:**
- Express.js - Web server framework
- In-memory storage - Fast data persistence

**Design:**
- Custom pixel dissolution animation
- Glassmorphism effects (frosted glass appearance)
- Smooth transitions and hover effects

## Running Locally

If you've downloaded this project and want to run it on your computer:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   The `.env` file already contains your password (`password123333`) and is ready to use!
   
   **Important:** The `.env` file is in `.gitignore` so it won't be shared publicly.

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   Navigate to `http://localhost:5000`

The landing animation plays automatically, then you'll see your full portfolio after 5 seconds.

**Admin Access:** Visit `http://localhost:5000/admin/login` and use your password (`password123333`) to access the admin panel.

---

## Deploying to PythonAnywhere with GoDaddy Domain

Your portfolio is fully compatible with PythonAnywhere hosting. Here's how to deploy:

### Quick Start Commands

Once you've uploaded your files to PythonAnywhere, run these commands in order:

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Build for production
npm run build

# 4. Start the application
npm start
```

That's it! Your portfolio will be running. Continue below for detailed setup instructions.

### Step 1: Upload Your Files to PythonAnywhere

1. **Create a PythonAnywhere Account**
   - Go to [www.pythonanywhere.com](https://www.pythonanywhere.com)
   - Sign up for a Web Developer account

2. **Upload Your Project**
   - Open a Bash console in PythonAnywhere
   - Upload your project files via the Files tab or use git:
   ```bash
   git clone your-repository-url
   cd your-project-folder
   ```

3. **Install Node.js and Dependencies**
   ```bash
   npm install
   ```

### Step 2: Configure Environment Variables

1. **Create the `.env` file on PythonAnywhere**
   ```bash
   cp .env.example .env
   ```

2. **Your `.env` is already configured** with:
   - `ADMIN_PASSWORD=password123333`
   - `SESSION_SECRET=` (already has a secure random key)
   - `NODE_ENV=production` (change this to production when deploying)
   - `PORT=5000` (or whatever PythonAnywhere assigns)

3. **Edit .env for production**
   ```bash
   nano .env
   ```
   Change `NODE_ENV=development` to `NODE_ENV=production`

### Step 3: Set Up the Web App

1. **Configure PythonAnywhere Web App**
   - Go to the "Web" tab
   - Click "Add a new web app"
   - Choose "Manual configuration" and select Node.js
   - Set the working directory to your project folder

2. **Configure the WSGI/Start Command**
   PythonAnywhere needs to run your Node.js app. Set the command to:
   ```bash
   npm start
   ```

3. **Update package.json** (if needed)
   Make sure your `package.json` has a start script:
   ```json
   "scripts": {
     "start": "NODE_ENV=production node --loader tsx server/index.ts",
     "dev": "NODE_ENV=development tsx server/index.ts"
   }
   ```

### Step 4: Connect Your GoDaddy Domain

1. **In GoDaddy:**
   - Go to your domain's DNS management
   - Add a CNAME record:
     - Type: `CNAME`
     - Name: `@` (or `www`)
     - Value: `yourusername.pythonanywhere.com`
     - TTL: 1 hour

2. **In PythonAnywhere:**
   - Go to the "Web" tab
   - Add your GoDaddy domain in the "Add a new web app" section
   - Follow the verification steps

3. **Wait for DNS propagation** (can take 1-48 hours)

### Step 5: Start Your Application

```bash
npm start
```

Your portfolio will be live at your GoDaddy domain! 🎉

### Troubleshooting PythonAnywhere

- **Port Issues:** PythonAnywhere may require a specific port. Check their docs for the correct port.
- **Build Errors:** Run `npm run build` if needed for production
- **.env Not Loading:** Make sure `dotenv` is installed and `.env` exists in the root folder
- **Admin Login:** Use `password123333` at `/admin/login`

### Important Notes

✅ Your `.env` file is **compatible** with PythonAnywhere  
✅ Your password is already set in `.env.example`  
✅ Just copy `.env.example` to `.env` and you're ready to deploy!


## Customization Guide

### Updating Personal Information
- **Social Links**: Look for LinkedIn and GitHub URLs in the navigation and hero components
- **Bio**: Edit the About section component
- **Skills**: Modify the skills array in the About section
- **Contact Email**: Update the Contact section component

### Managing Projects

**Using the Admin Panel (Recommended):**
1. Navigate to `/admin` in your browser
2. You'll be prompted to login with your admin password (password123333)
3. Once logged in, you can:
   - **Add New Projects:** Upload a screenshot, fill out the form on the left and click "Add Project"
   - **Edit Existing Projects:** Click the Edit button on any project in the list
   - **Delete Projects:** Click the Delete button to remove a project
   - **View All Projects:** See all your projects listed on the right side

**Form Fields:**
- **Project Image:** Upload screenshot directly (max 5MB, jpg/png/gif/webp)
- **Title:** Your project name
- **Description:** What it does and technologies used
- **Technologies:** Comma-separated list (e.g., React, TypeScript, Node.js)
- **GitHub URL:** Link to your repository (optional)
- **Featured:** Check to display prominently on homepage

**Features:**
- Direct file upload - no need to host images elsewhere
- Real-time updates - changes appear instantly on your portfolio
- Two-column layout - form on left, project list on right
- Edit mode - click Edit to populate the form with existing project data
- Image preview - see your uploaded image before submitting
- Confirm delete - prevents accidental deletions

**Example Images Available:**
The project includes 4 example project screenshots in `attached_assets/generated_images/` that you can use as placeholders or reference while building your portfolio.

**Security Note:** The admin panel is password-protected. Only you (with the correct ADMIN_PASSWORD) can manage projects. The system uses server-side session management with secure HttpOnly cookies to prevent unauthorized access.

### Changing Colors
The color scheme is defined in `client/src/index.css` under the `.dark` section:
- Primary (neon green): `--primary: 140 90% 50%`
- Secondary (cyan): `--accent: 180 85% 55%`
- Background: `--background: 0 0% 4%`

## Deployment

This website is ready to be deployed to any hosting platform that supports Node.js applications:
- Replit (easiest - just click "Publish")
- Vercel
- Netlify
- Heroku
- DigitalOcean

The site will work out of the box—no additional configuration needed.

## Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

For the best experience viewing the pixel dissolution animation, use an updated browser version.

## License

This portfolio template is open for personal and commercial use. Feel free to customize it to match your personal brand.

---

**Questions or Issues?**
This portfolio is designed to be simple and straightforward. If something isn't working as expected, ensure you've run `npm install` and that all dependencies are properly installed.
