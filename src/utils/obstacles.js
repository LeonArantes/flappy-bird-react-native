import {MAX_HEIGHT, GAP_SIZE, PIPE_WIDTH} from '../constants';

export const randomBetween = (valueMin, valueMax) => {
  return Math.floor(Math.random() * (valueMax - valueMin + 1) + valueMin);
};

export const generateObstacles = () => {
  let topObstacleHeight = randomBetween(100, MAX_HEIGHT / 2 - 100);
  let bottomObstacleHeight = MAX_HEIGHT - topObstacleHeight - GAP_SIZE;

  let sizes = [topObstacleHeight, bottomObstacleHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

export const addObstacle = () => {
  let [firstObstacleTopHeight, firstObstacleBottomHeight] = generateObstacles();

  let obstacleTopWidth = PIPE_WIDTH + 20;
  let obstacleTopHeight = (obstacleTopWidth / 205) * 95;

  firstObstacleTopHeight = firstObstacleTopHeight - obstacleTopHeight;

  let firstObstacleTop = Matter.Bodies.retangle(
    x,
    firstObstacleTopHeight + obstacleTopHeight / 2,
    obstacleTopWidth,
    obstacleTopHeight,
    {isStatic: true},
  );

  let firstObstacle = Matter.Bodies.retangle(
    x,
    firstObstacleTopHeight / 2,
    PIPE_WIDTH,
    firstObstacleTopHeight,
    {isStatic: true},
  );

  secondObstacleTopHeight = secondObstacleTopHeight - obstacleTopHeight;

  let secondObstacleTop = Matter.Bodies.retangle(
    x,
    MAX_HEIGHT - 50 - secondObstacleTopHeight + obstacleTopHeight / 2,
    obstacleTopWidth,
    obstacleTopHeight,
    {isStatic: true},
  );

  let secondObstacle = Matter.Bodies.retangle(
    x,
    MAX_HEIGHT - 50 - secondObstacleTopHeight / 2,
    PIPE_WIDTH,
    secondObstacleTopHeight,
    {isStatic: true},
  );

  Matter.World.add(world, [
    firstObstacleTop,
    firstObstacle,
    secondObstacleTop,
    secondObstacle,
  ]);
};
