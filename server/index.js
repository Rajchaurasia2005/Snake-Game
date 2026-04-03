const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "scores.json");

app.use(cors());
app.use(express.json());

// Serve React build in production
app.use(express.static(path.join(__dirname, "../client/build")));

// Initialize scores file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ highScores: [] }, null, 2));
}

const readScores = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { highScores: [] };
  }
};

const writeScores = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET top 10 high scores
app.get("/api/scores", (req, res) => {
  const data = readScores();
  const sorted = data.highScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(sorted);
});

// POST a new score
app.post("/api/scores", (req, res) => {
  const { name, score, level } = req.body;
  if (!name || score === undefined) {
    return res.status(400).json({ error: "Name and score are required" });
  }

  const data = readScores();
  const entry = {
    id: Date.now().toString(),
    name: name.trim().slice(0, 15),
    score,
    level: level || 1,
    date: new Date().toISOString(),
  };

  data.highScores.push(entry);
  // Keep only top 100 entries to avoid bloat
  data.highScores = data.highScores.sort((a, b) => b.score - a.score).slice(0, 100);
  writeScores(data);

  const rank = data.highScores.findIndex((e) => e.id === entry.id) + 1;
  res.json({ ...entry, rank });
});

// DELETE all scores (reset)
app.delete("/api/scores", (req, res) => {
  writeScores({ highScores: [] });
  res.json({ message: "Scores reset successfully" });
});

// Catch-all for React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🐍 Snake Game server running on http://localhost:${PORT}`);
});
