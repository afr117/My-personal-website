🧩 PortfolioForge – Local Setup Guide

A modern developer portfolio website with admin controls, project uploads, and a smooth dark-cyberpunk UI.
This guide explains exactly how to download, set up, and run the website locally on Windows using Visual Studio Code.

🧠 Requirements

Before starting, make sure you have these installed:

Node.js (v18 or higher) → https://nodejs.org/

npm (comes with Node)

Visual Studio Code

Git (optional but recommended)

⚙️ 1. Download the Project

If you have a ZIP:

Download → Extract → Open in VS Code


If using Git:

git clone https://github.com/yourusername/PortfolioForge.git
cd PortfolioForge

📦 2. Install Dependencies

Open the integrated terminal in VS Code and run:

npm install


This installs both backend and frontend dependencies listed in package.json.

⚡ 3. Create Environment File

In the root folder (PortfolioForge), create a file called .env
and paste this content:

PORT=5000
SESSION_SECRET=your_secret_key_here
NODE_ENV=development


💡 You can generate a random secret with any password generator — it’s used to secure sessions.

🧱 4. Build the Frontend

Before running the server, you need to build the React client:

npm run build


This creates the production-ready site in:

dist/public/

▶️ 5. Run the Server

To start the backend and serve your built site:

set NODE_ENV=development && npx tsx server/index.ts


If successful, you’ll see:

🟢 Starting PortfolioForge backend...
✅ Routes registered
📦 Serving static files from: C:\Users\...\PortfolioForge\dist\public
🚀 PortfolioForge running at http://localhost:5000
🌍 Environment: development


Now open your browser at 👉 http://localhost:5000

🧰 6. Common Issues
Problem	Fix
'NODE_ENV' is not recognized	Use the Windows version of the command (with set NODE_ENV=...)
Cannot find module 'dotenv'	Run npm install dotenv
Could not find the build directory	Run npm run build before starting the server
Blank page	Check the browser console; ensure dist/public exists
💡 Developer Shortcuts
Command	Description
npm run dev	Start in development mode (if script is added)
npm run build	Build the frontend
npm start	Run production server (after building)

You can also make a shortcut batch file called start_website.bat:

@echo off
cd /d "%~dp0"
set NODE_ENV=development
npx tsx server/index.ts
pause


Double-click it to launch the website automatically.

🧾 Notes

The app runs locally at http://localhost:5000

Works on Windows 10/11, Linux, and macOS

Built with React, TypeScript, Express, and Vite

Supports admin login and project uploads (see /admin route)
