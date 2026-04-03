import { useEffect, useRef } from "react";
import { GRID_SIZE, CELL_SIZE, CANVAS_SIZE } from "../utils/constants";

const COLORS = {
  bg: "#0a0a0f",
  grid: "rgba(0, 255, 100, 0.04)",
  snakeHead: "#00ff64",
  snakeBody: "#00cc50",
  snakeOutline: "#003a18",
  food: "#ff3c6e",
  foodGlow: "rgba(255, 60, 110, 0.6)",
  eyeWhite: "#ffffff",
  eyePupil: "#0a0a0f",
};

export default function GameCanvas({ snake, food, gameState, flash }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Clear
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food with glow
    const fx = food.x * CELL_SIZE + CELL_SIZE / 2;
    const fy = food.y * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 2 - 2;

    ctx.shadowColor = COLORS.foodGlow;
    ctx.shadowBlur = 16;
    ctx.fillStyle = COLORS.food;
    ctx.beginPath();
    ctx.arc(fx, fy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Inner highlight on food
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.arc(fx - radius * 0.3, fy - radius * 0.3, radius * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Draw snake
    snake.forEach((segment, i) => {
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;
      const pad = i === 0 ? 1 : 2;
      const size = CELL_SIZE - pad * 2;

      // Body gradient based on position in snake
      const alpha = Math.max(0.4, 1 - i / snake.length);
      ctx.fillStyle =
        i === 0
          ? COLORS.snakeHead
          : `rgba(0, ${Math.floor(180 * alpha + 50)}, ${Math.floor(70 * alpha)}, 1)`;

      ctx.shadowColor = i === 0 ? "rgba(0,255,100,0.5)" : "transparent";
      ctx.shadowBlur = i === 0 ? 10 : 0;

      // Rounded rect for each segment
      const r = i === 0 ? 5 : 3;
      ctx.beginPath();
      ctx.roundRect(x + pad, y + pad, size, size, r);
      ctx.fill();

      ctx.strokeStyle = COLORS.snakeOutline;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Eyes on head
      if (i === 0) {
        const eyeSize = 3;
        const eyeOffset = CELL_SIZE / 2;

        let eye1, eye2;
        const cx = x + CELL_SIZE / 2;
        const cy = y + CELL_SIZE / 2;

        // Position eyes based on direction
        const next = snake[1] || { x: segment.x - 1, y: segment.y };
        const dx = segment.x - next.x;
        const dy = segment.y - next.y;

        if (dx === 1) {
          eye1 = { x: cx + 3, y: cy - 4 };
          eye2 = { x: cx + 3, y: cy + 4 };
        } else if (dx === -1) {
          eye1 = { x: cx - 3, y: cy - 4 };
          eye2 = { x: cx - 3, y: cy + 4 };
        } else if (dy === 1) {
          eye1 = { x: cx - 4, y: cy + 3 };
          eye2 = { x: cx + 4, y: cy + 3 };
        } else {
          eye1 = { x: cx - 4, y: cy - 3 };
          eye2 = { x: cx + 4, y: cy - 3 };
        }

        [eye1, eye2].forEach((eye) => {
          ctx.fillStyle = COLORS.eyeWhite;
          ctx.beginPath();
          ctx.arc(eye.x, eye.y, eyeSize, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = COLORS.eyePupil;
          ctx.beginPath();
          ctx.arc(eye.x + dx, eye.y + dy, eyeSize - 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });

    // Flash overlay on food eat
    if (flash) {
      ctx.fillStyle = "rgba(0, 255, 100, 0.06)";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }, [snake, food, gameState, flash]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{ display: "block" }}
    />
  );
}
