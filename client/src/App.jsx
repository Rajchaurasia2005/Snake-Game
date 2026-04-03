import { useState } from "react";
import GameCanvas from "./components/GameCanvas";
import GameOverModal from "./components/GameOverModal";
import Leaderboard from "./components/Leaderboard";
import MobileControls from "./components/MobileControls";
import { useSnakeGame } from "./hooks/useSnakeGame";
import { GAME_STATES, CANVAS_SIZE } from "./utils/constants";
import "./App.css";
//test
export default function App() {
  const {
    snake,
    food,
    score,
    gameState,
    currentLevel,
    flash,
    startGame,
    pauseGame,
    setDirectionBySwipe,
    levels,
  } = useSnakeGame();

  const [lbRefreshKey, setLbRefreshKey] = useState(0);

  const handleScoreSaved = () => setLbRefreshKey((k) => k + 1);

  const isIdle = gameState === GAME_STATES.IDLE;
  const isPlaying = gameState === GAME_STATES.PLAYING;
  const isPaused = gameState === GAME_STATES.PAUSED;
  const isGameOver = gameState === GAME_STATES.GAME_OVER;

  const levelProgress = (() => {
    const idx = levels.findIndex((l) => l.level === currentLevel.level);
    const next = levels[idx + 1];
    if (!next) return 100;
    const start = currentLevel.scoreThreshold;
    const end = next.scoreThreshold;
    return Math.min(100, ((score - start) / (end - start)) * 100);
  })();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-snake">🐍</span> SNAKE
        </h1>
        <p className="app-sub">MERN EDITION</p>
      </header>

      <main className="app-main">
        <div className="game-panel">
          {/* HUD */}
          <div className="hud">
            <div className="hud-item">
              <span className="hud-label">SCORE</span>
              <span className="hud-value hud-score">{score.toLocaleString()}</span>
            </div>
            <div className="hud-item hud-center">
              <span className="hud-label">LEVEL</span>
              <span className="hud-value">{currentLevel.label}</span>
              <div className="level-bar">
                <div className="level-fill" style={{ width: `${levelProgress}%` }} />
              </div>
            </div>
            <div className="hud-item hud-right">
              <span className="hud-label">LENGTH</span>
              <span className="hud-value">{snake.length}</span>
            </div>
          </div>

          {/* Canvas wrapper */}
          <div className="canvas-wrapper" style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
            <GameCanvas snake={snake} food={food} gameState={gameState} flash={flash} />

            {/* Overlays */}
            {isIdle && (
              <div className="overlay">
                <div className="overlay-content">
                  <div className="overlay-icon">🐍</div>
                  <h2 className="overlay-title">READY?</h2>
                  <p className="overlay-hint">Use WASD or Arrow Keys to move</p>
                  <button className="btn-start" onClick={startGame}>
                    START GAME
                  </button>
                </div>
              </div>
            )}

            {isPaused && (
              <div className="overlay">
                <div className="overlay-content">
                  <h2 className="overlay-title overlay-pause">⏸ PAUSED</h2>
                  <button className="btn-start" onClick={pauseGame}>
                    RESUME
                  </button>
                </div>
              </div>
            )}

            {isGameOver && (
              <GameOverModal
                score={score}
                level={currentLevel.level}
                onRestart={startGame}
                onScoreSaved={handleScoreSaved}
              />
            )}
          </div>

          {/* Controls bar */}
          <div className="controls-bar">
            {isIdle ? (
              <button className="ctrl-action" onClick={startGame}>▶ START</button>
            ) : isGameOver ? (
              <button className="ctrl-action" onClick={startGame}>↺ RESTART</button>
            ) : (
              <button className="ctrl-action" onClick={pauseGame}>
                {isPaused ? "▶ RESUME" : "⏸ PAUSE"}
              </button>
            )}
            <span className="ctrl-hint">WASD / ↑↓←→</span>
          </div>

          <MobileControls onDirection={setDirectionBySwipe} />
        </div>

        {/* Leaderboard */}
        <div className="side-panel">
          <Leaderboard refreshKey={lbRefreshKey} />
        </div>
      </main>
    </div>
  );
}
