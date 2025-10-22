# PythonAnywhere Deployment Guide

This guide will help you deploy your portfolio to PythonAnywhere with your GoDaddy domain.

## Quick Start Checklist

- [ ] Upload files to PythonAnywhere
- [ ] Copy `.env.example` to `.env`
- [ ] Install Node.js dependencies
- [ ] Configure the web app
- [ ] Connect your GoDaddy domain
- [ ] Start your application

---

## Step-by-Step Deployment

### 1. Upload to PythonAnywhere

**Option A: Upload via Files Tab**
1. Log into your PythonAnywhere account
2. Go to the "Files" tab
3. Create a new directory (e.g., `my-portfolio`)
4. Upload all your project files

**Option B: Use Git (Recommended)**
1. Open a Bash console in PythonAnywhere
2. Clone your repository:
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Set Up Environment Variables

**This is the most important step!**

```bash
# Copy the example file to create your .env
cp .env.example .env

# Verify it was created
ls -la | grep .env
```

Your `.env` file already contains:
- ✅ `ADMIN_PASSWORD=password123333`
- ✅ `SESSION_SECRET=` (secure random string)
- ✅ All required configuration

**For Production:** Edit .env and change NODE_ENV:
```bash
nano .env
# Change: NODE_ENV=development
# To: NODE_ENV=production
```

### 3. Install Dependencies

```bash
# Make sure you're in your project directory
cd ~/your-project-folder

# Install all packages
npm install
```

### 4. Build for Production

```bash
# Build the optimized production version
npm run build
```

This creates a `dist` folder with your compiled application.

### 5. Configure PythonAnywhere Web App

1. Go to the **Web** tab
2. Click **"Add a new web app"**
3. Choose your domain (or use the free subdomain)
4. Select **"Manual configuration"**
5. Choose **Node.js** as the framework

### 6. Set Up the Application

In the Web tab configuration:

**Source code directory:**
```
/home/yourusername/your-project-folder
```

**Working directory:**
```
/home/yourusername/your-project-folder
```

**WSGI configuration file:**
Since this is Node.js, you'll configure the process instead.

### 7. Configure the Start Command

PythonAnywhere needs to know how to run your app. Your project already has a production start command.

In the PythonAnywhere **Web** tab, look for the process manager or startup command section and use:

```bash
npm start
```

Or directly:
```bash
NODE_ENV=production node dist/index.js
```

### 8. Set the Port

PythonAnywhere typically uses specific ports. Check their documentation for the exact port.

If needed, update your `.env` file:
```
PORT=8000
```
(Replace 8000 with whatever port PythonAnywhere requires)

### 9. Connect Your GoDaddy Domain

#### In GoDaddy DNS Management:

1. Log into GoDaddy
2. Go to your domain → DNS Management
3. Add a **CNAME** record:
   - **Type:** CNAME
   - **Name:** `www` (or `@` for root domain)
   - **Value:** `yourusername.pythonanywhere.com`
   - **TTL:** 1 hour (or default)

4. If using root domain (@), you may need an **A Record** instead:
   - **Type:** A
   - **Name:** `@`
   - **Value:** (Get IP from PythonAnywhere docs)

#### In PythonAnywhere:

1. Go to the **Web** tab
2. In the "Add a new web app" or "Configure" section
3. Add your custom domain: `www.yourdomain.com`
4. Follow any verification steps PythonAnywhere provides

### 10. Start Your Application

```bash
# From your project directory
npm start
```

Or reload your web app from the PythonAnywhere Web tab.

### 11. Test Your Deployment

1. **Visit your site:** `https://www.yourdomain.com`
2. **Test the landing animation** (should play for 5 seconds)
3. **Test admin login:** Go to `/admin/login`
   - Password: `password123333`
   - Try adding a new project
4. **Verify it appears on the homepage**

---

## Troubleshooting

### .env File Not Loading
```bash
# Check if .env exists
ls -la .env

# Check if dotenv is installed
npm list dotenv

# Reinstall if needed
npm install dotenv
```

### Port Errors
- PythonAnywhere assigns specific ports
- Check PythonAnywhere documentation for required port
- Update `.env` with `PORT=correct_port`

### Build Fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Site Not Loading
- Check PythonAnywhere error logs (in Web tab)
- Verify Node.js version compatibility
- Ensure `npm start` runs without errors

### Admin Login Not Working
- Verify `.env` exists: `cat .env`
- Check `ADMIN_PASSWORD=password123333` is in the file
- Try logging in with exactly: `password123333`

### Domain Not Connecting
- DNS propagation can take 1-48 hours
- Use `nslookup www.yourdomain.com` to check DNS status
- Verify CNAME points to correct PythonAnywhere URL

---

## Important Files Checklist

Make sure these files are on PythonAnywhere:

- ✅ `.env` (copied from `.env.example`)
- ✅ `package.json`
- ✅ `node_modules/` (from `npm install`)
- ✅ `dist/` (from `npm run build`)
- ✅ All source files (`server/`, `client/`, etc.)

---

## Your Configuration Summary

| Setting | Value |
|---------|-------|
| Admin Password | `password123333` |
| Session Secret | *(auto-generated in .env.example)* |
| Default Port | `5000` (adjust for PythonAnywhere) |
| Admin URL | `/admin/login` |
| Environment | Production |

---

## Quick Commands Reference

```bash
# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start

# Check if server is running
ps aux | grep node

# View server logs
tail -f /var/log/yourdomain.com.error.log
```

---

## Need Help?

1. **PythonAnywhere Forums:** Check their community forums
2. **PythonAnywhere Help:** help.pythonanywhere.com
3. **GoDaddy Support:** For DNS/domain issues
4. **Your Project Logs:** Check the PythonAnywhere Web tab for error logs

---

## Success! 🎉

Once deployed, your portfolio will be live at:
- **Your Domain:** `https://www.yourdomain.com`
- **Admin Panel:** `https://www.yourdomain.com/admin/login`

Remember your password: **password123333**
