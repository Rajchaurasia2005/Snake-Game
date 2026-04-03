import { GRID_SIZE } from "./constants";

export const randomPosition = (snake = []) => {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
};

export const checkCollision = (head, snake) => {
  // Wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }
  // Self collision (skip head)
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) return true;
  }
  return false;
};

export const moveSnake = (snake, direction) => {
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };
  return [newHead, ...snake.slice(0, -1)];
};

export const growSnake = (snake, direction) => {
  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };
  return [newHead, ...snake];
};

export const getLevelConfig = (score, levels) => {
  let current = levels[0];
  for (const lvl of levels) {
    if (score >= lvl.scoreThreshold) current = lvl;
  }
  return current;
};

export const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
