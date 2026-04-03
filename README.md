# 🐍 Snake Game — MERN Stack

A retro cyberpunk Snake game built with MongoDB-ready MERN architecture. Scores are currently persisted locally via `server/scores.json` — swap in MongoDB any time with minimal changes.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# From the root directory
npm run install-all
```

### 2. Run in Development

```bash
npm run dev
```

This starts:
- **Express server** on `http://localhost:5000`
- **React dev server** on `http://localhost:3000` (proxied to Express)

### 3. Build for Production

```bash
npm run build
npm start
```

The Express server serves the React build at `http://localhost:5000`.

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| `W` / `↑` | Move Up |
| `S` / `↓` | Move Down |
| `A` / `←` | Move Left |
| `D` / `→` | Move Right |
| `P` | Pause / Resume |

On mobile, use the on-screen D-pad.

---

## 🌐 Deployment

### Deploy to Render (Free Tier)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo
4. Set:
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

> ⚠️ Note: Render's free tier spins down after inactivity. Use a paid plan or Railway for always-on hosting.

### Deploy to Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Railway auto-detects Node.js
4. Set start command: `npm start`
5. Add build command: `npm run install-all && npm run build`

### Deploy to Heroku

```bash
# Install Heroku CLI, then:
heroku create your-snake-game
git push heroku main
```

---

## 🗄️ Adding MongoDB Later

When you're ready to replace the local JSON file with MongoDB:

1. Install mongoose:
```bash
npm install mongoose
```

2. Replace `server/index.js` score read/write functions with Mongoose model calls.

3. Create a `.env` file:
```
MONGODB_URI=mongodb+srv://your-connection-string
PORT=5000
```

4. Add `dotenv` and load it at the top of `server/index.js`:
```js
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
```

---

## 📁 Project Structure

```
snake-game/
├── package.json              # Root — scripts for both server & client
├── server/
│   ├── index.js              # Express API
│   └── scores.json           # Local score storage (replaces MongoDB for now)
└── client/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.jsx            # Root component
        ├── App.css            # Global game styles
        ├── index.js           # React entry point
        ├── index.css          # Base CSS reset
        ├── hooks/
        │   └── useSnakeGame.js    # Core game loop & state
        ├── utils/
        │   ├── constants.js       # Grid size, levels, directions
        │   ├── gameUtils.js       # Collision, movement helpers
        │   └── api.js             # Backend API calls
        └── components/
            ├── GameCanvas.jsx     # Canvas renderer
            ├── GameOverModal.jsx  # Score save modal
            ├── Leaderboard.jsx    # Top 10 scores
            └── MobileControls.jsx # Touch D-pad
```

---

## 🎯 Features

- ✅ 6 progressive speed levels (Rookie → Legend)
- ✅ Live leaderboard with top 10 scores
- ✅ Score save with player name on game over
- ✅ Pause / Resume support
- ✅ Mobile-friendly D-pad controls
- ✅ Retro cyberpunk visual theme
- ✅ Canvas-based rendering with animated snake eyes
- ✅ Score reset button for leaderboard
- ✅ Local file persistence (MongoDB-ready)
