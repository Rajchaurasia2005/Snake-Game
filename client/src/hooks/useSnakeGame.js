import { useState, useEffect, useCallback, useRef } from "react";
import {
  DIRECTIONS,
  KEY_MAP,
  OPPOSITE,
  LEVELS,
  POINTS_PER_FOOD,
  INITIAL_SNAKE,
  GAME_STATES,
} from "../utils/constants";
import {
  randomPosition,
  checkCollision,
  moveSnake,
  growSnake,
  getLevelConfig,
} from "../utils/gameUtils";

const getInitialState = () => ({
  snake: INITIAL_SNAKE,
  food: randomPosition(INITIAL_SNAKE),
  direction: DIRECTIONS.RIGHT,
  pendingDirection: DIRECTIONS.RIGHT,
  score: 0,
  gameState: GAME_STATES.IDLE,
  currentLevel: LEVELS[0],
  flash: false,
});

export const useSnakeGame = () => {
  const [state, setState] = useState(getInitialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const intervalRef = useRef(null);

  const clearGameInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startGameLoop = useCallback((speed) => {
    clearGameInterval();
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.gameState !== GAME_STATES.PLAYING) return prev;

        const direction = prev.pendingDirection;
        const newHead = {
          x: prev.snake[0].x + direction.x,
          y: prev.snake[0].y + direction.y,
        };

        if (checkCollision(newHead, prev.snake)) {
          return { ...prev, gameState: GAME_STATES.GAME_OVER };
        }

        const ateFood = newHead.x === prev.food.x && newHead.y === prev.food.y;
        const newSnake = ateFood
          ? growSnake(prev.snake, direction)
          : moveSnake(prev.snake, direction);

        let newScore = prev.score;
        let newFood = prev.food;
        let flash = false;

        if (ateFood) {
          newScore += POINTS_PER_FOOD;
          newFood = randomPosition(newSnake);
          flash = true;
        }

        const newLevel = getLevelConfig(newScore, LEVELS);

        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          direction,
          score: newScore,
          currentLevel: newLevel,
          flash,
        };
      });
    }, speed);
  }, []);

  // Re-sync speed when level changes
  useEffect(() => {
    if (state.gameState === GAME_STATES.PLAYING) {
      startGameLoop(state.currentLevel.speed);
    }
  }, [state.currentLevel.speed, state.gameState, startGameLoop]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      const dirName = KEY_MAP[e.key];
      if (!dirName) return;

      e.preventDefault();

      setState((prev) => {
        const currentDirName = Object.keys(DIRECTIONS).find(
          (k) =>
            DIRECTIONS[k].x === prev.direction.x &&
            DIRECTIONS[k].y === prev.direction.y
        );
        if (dirName === OPPOSITE[currentDirName]) return prev;
        return { ...prev, pendingDirection: DIRECTIONS[dirName] };
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const startGame = useCallback(() => {
    clearGameInterval();
    const initial = getInitialState();
    const newState = { ...initial, gameState: GAME_STATES.PLAYING };
    setState(newState);
    startGameLoop(LEVELS[0].speed);
  }, [startGameLoop]);

  const pauseGame = useCallback(() => {
    setState((prev) => {
      if (prev.gameState === GAME_STATES.PLAYING) {
        clearGameInterval();
        return { ...prev, gameState: GAME_STATES.PAUSED };
      }
      if (prev.gameState === GAME_STATES.PAUSED) {
        startGameLoop(prev.currentLevel.speed);
        return { ...prev, gameState: GAME_STATES.PLAYING };
      }
      return prev;
    });
  }, [startGameLoop]);

  const setDirectionBySwipe = useCallback((dirName) => {
    setState((prev) => {
      const currentDirName = Object.keys(DIRECTIONS).find(
        (k) =>
          DIRECTIONS[k].x === prev.direction.x &&
          DIRECTIONS[k].y === prev.direction.y
      );
      if (dirName === OPPOSITE[currentDirName]) return prev;
      return { ...prev, pendingDirection: DIRECTIONS[dirName] };
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => clearGameInterval, []);

  return {
    ...state,
    startGame,
    pauseGame,
    setDirectionBySwipe,
    levels: LEVELS,
  };
};
