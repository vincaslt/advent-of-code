type Shape = "rock" | "paper" | "scissors";
type Outcome = "loss" | "win" | "draw";

function getShapeForOutcome(opponent: Shape, outcome: Outcome) {
  if (outcome === "draw") {
    return opponent;
  }

  if (outcome === "loss") {
    const lossConditions: Record<Shape, Shape> = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };

    return lossConditions[opponent];
  }

  const winConditions: Record<Shape, Shape> = {
    scissors: "rock",
    rock: "paper",
    paper: "scissors",
  };

  return winConditions[opponent];
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

function getOutcome(str: string): Outcome {
  const outcomeMap: Record<string, Outcome> = {
    X: "loss",
    Y: "draw",
    Z: "win",
  };

  const outcome = outcomeMap[str];

  if (outcome) {
    return outcome;
  }

  throw new Error(`Unknown outcome ${outcome}`);
}

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const total = lines.reduce((points, line) => {
  const [opponent, outcome] = line.split(" ");
  const requiredOutcome = getOutcome(outcome);
  const opponentShape = getOpponentShape(opponent);
  const playerShape = getShapeForOutcome(opponentShape, requiredOutcome);
  const roundTotal =
    getShapePoints(playerShape) + getOutcomePoints(requiredOutcome);
  return points + roundTotal;
}, 0);

console.log(total);
