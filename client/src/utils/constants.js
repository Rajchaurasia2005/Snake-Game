export const GRID_SIZE = 20;
export const CELL_SIZE = 24;
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 480px

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const KEY_MAP = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  w: "UP",
  s: "DOWN",
  a: "LEFT",
  d: "RIGHT",
  W: "UP",
  S: "DOWN",
  A: "LEFT",
  D: "RIGHT",
};

export const OPPOSITE = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

export const LEVELS = [
  { level: 1, speed: 200, scoreThreshold: 0, label: "ROOKIE" },
  { level: 2, speed: 180, scoreThreshold: 50, label: "SOLDIER" },
  { level: 3, speed: 160, scoreThreshold: 120, label: "HUNTER" },
  { level: 4, speed: 140, scoreThreshold: 220, label: "PREDATOR" },
  { level: 5, speed: 115, scoreThreshold: 360, label: "APEX" },
<<<<<<< HEAD
  { level: 6, speed: 110, scoreThreshold: 550, label: "LEGEND" },
=======
  { level: 6, speed: 100, scoreThreshold: 550, label: "LEGEND" },
>>>>>>> cc01c4c1b75860dc3a991bdd9a9175788c7b5d4e
];

export const POINTS_PER_FOOD = 10;

export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const GAME_STATES = {
  IDLE: "IDLE",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
  GAME_OVER: "GAME_OVER",
};
