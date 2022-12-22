type Shape = "rock" | "paper" | "scissors";
type Outcome = "loss" | "win" | "draw";

function computeOutcome(player: Shape, opponent: Shape): Outcome {
  if (player === opponent) {
    return "draw";
  }

  const winConditions: Record<Shape, Shape> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winConditions[player] === opponent ? "win" : "loss";
}

function getShapePoints(shape: Shape) {
  return {
    rock: 1,
    paper: 2,
    scissors: 3,
  }[shape];
}

function getOutcomePoints(outcome: Outcome) {
  return {
    loss: 0,
    draw: 3,
    win: 6,
  }[outcome];
}

function getOpponentShape(str: string): Shape {
  const shapeMap: Record<string, Shape> = {
    A: "rock",
    B: "paper",
    C: "scissors",
  };

  const shape = shapeMap[str];

  if (shape) {
    return shape;
  }

  throw new Error(`Unknown opponent shape ${shape}`);
}

function getPlayerShape(str: string): Shape {
  const shapeMap: Record<string, Shape> = {
    X: "rock",
    Y: "paper",
    Z: "scissors",
  };

  const shape = shapeMap[str];

  if (shape) {
    return shape;
  }

  throw new Error(`Unknown player shape ${shape}`);
}

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const total = lines.reduce((points, line) => {
  const [opponent, player] = line.split(" ");
  const playerShape = getPlayerShape(player);
  const opponentShape = getOpponentShape(opponent);
  const roundTotal =
    getShapePoints(playerShape) +
    getOutcomePoints(computeOutcome(playerShape, opponentShape));
  return points + roundTotal;
}, 0);

console.log(total);
