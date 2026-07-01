# Aditya OS - Cyberpunk Portfolio

An interactive, responsive cyberpunk HUD portfolio built with React, Vite, Tailwind v4, Express, and Google Gemini.

## ⚠️ IMPORTANT: Repository History Rewrite

On July 1, 2026, this repository underwent a git history rewrite to remove sensitive files (`.venv/`, `Assets/`).

**If you have a local clone from before this date:**
```bash
git fetch origin
git reset --hard origin/main
git clean -fd
```
Or: Delete your local clone and re-clone from scratch. Failure to do this will cause merge conflicts on all future git operations.

## Setup: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Click **Create API Key**
3. Select "Create in existing project" or create a new one
4. Copy the key
5. Paste into `.env` file: `GEMINI_API_KEY=your_key_here`
6. Run local workstation

## Prerequisites
- Node.js 18+ installed (check with `node --version`)
- npm 9+ installed (check with `npm --version`)

## Quick Start (3 Steps)
```bash
# 1. Clone the repository
git clone https://github.com/CodeCrafterAdi2006/horizon-portfolio.git
cd horizon-portfolio

# 2. Set up environment
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 3. Launch
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting

### Port Already in Use
If you get a "Port 3000 already in use" error:
```bash
# macOS/Linux: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows: Use Task Manager or:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Gemini API Key Error
If you see "[UPLINK FAILURE]" in the AI widget:
- Verify `GEMINI_API_KEY` is set in `.env`.
- Check that the key is active and valid at Google AI Studio.
- Restart with `npm run dev`.

### Build Fails on Windows
If `npm run build` fails, try:
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
npm run build
```

## Monitoring Health
To check if the backend is running locally:
```bash
curl http://localhost:3001/api/health
```
On Render, you can set up health checks in the Dashboard:
- **Health Check Path**: `/api/health`
- **Health Check Protocol**: `HTTP`
- **Initial Delay**: `30s`

## Media Asset Optimization
To compress heavy audio files to 50% size, use the following `ffmpeg` guidelines:
```bash
ffmpeg -i public/Horizons.mp3 -c:a libvorbis -q:a 4 public/Horizons.webm
```

## Production Deployment

### Option A: Deploy Both on Render.com (Recommended)
1. Create a new Web Service on Render linked to this repo.
2. Set Build Command: `npm install`
3. Set Start Command: `node server.js`
4. Set Environment Variables:
   - `GEMINI_API_KEY` = Your API key
   - `NODE_ENV` = `production`
   - `CLIENT_URL` = `https://yourdomain.onrender.com` (Your Render deployment domain)
   - (Optional) `SERVER_PORT` = Leave blank; Render sets `PORT` automatically.

### Option B: Separate Frontend (Vercel) + Backend (Render)
1. Frontend on Vercel: Connect your repo, set build command to `npm run build` and output folder to `dist`.
2. Backend on Render: Create a web service with Start Command `node server.js` and configure CORS settings (`CLIENT_URL`) to allow requests from your Vercel URL.
