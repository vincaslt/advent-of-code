const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

type Operation = { left: string; operation: string; right: string };
const monkeys: Record<string, number | Operation> = {};

for (const line of lines) {
  const [name, operationOrNumber] = line.split(": ");

  if (Number.isNaN(Number(operationOrNumber))) {
    const [left, operation, right] = operationOrNumber.split(" ");
    monkeys[name] = { left, operation, right };
  } else {
    monkeys[name] = Number(operationOrNumber);
  }
}

function executeOperation(left: number, operation: string, right: number) {
  switch (operation) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "/":
      return left / right;
    case "*":
      return left * right;
  }
  throw new Error(`Unknown operation: ${operation}`);
}

function invertXonLeft(right: number, operation: string, expected: number) {
  switch (operation) {
    case "+":
      return expected - right;
    case "-":
      return expected + right;
    case "/":
      return expected * right;
    case "*":
      return expected / right;
  }
  throw new Error(`Unknown operation: ${operation}`);
}

function invertXonRight(left: number, operation: string, expected: number) {
  switch (operation) {
    case "+":
      return expected - left;
    case "-":
      return left - expected;
    case "/":
      return left / expected;
    case "*":
      return expected / left;
  }
  throw new Error(`Unknown operation: ${operation}`);
}

function getResult(monkey: string, humanName?: string): number | null {
  if (monkey === humanName) {
    return null;
  }

  const operationOrNumber = monkeys[monkey];

  if (typeof operationOrNumber === "number") {
    return operationOrNumber;
  }

  const left = getResult(operationOrNumber.left, humanName);
  const right = getResult(operationOrNumber.right, humanName);

  return (
    left && right && executeOperation(left, operationOrNumber.operation, right)
  );
}

console.log("First:", getResult("root"));

// const { left, right } = monkeys["root"] as Operation;

function solve(
  monkey: string,
  humanName: string,
  expectedValue: number
): number {
  if (monkey === humanName) {
    return expectedValue!;
  }

  const { left, operation, right } = monkeys[monkey] as Operation;

  const leftEval = getResult(left, humanName);
  const rightEval = getResult(right, humanName);

  if (leftEval === null && typeof rightEval === "number") {
    const inverted = invertXonLeft(rightEval, operation, expectedValue);
    return solve(left, humanName, inverted);
  }

  if (rightEval === null && typeof leftEval === "number") {
    const inverted = invertXonRight(leftEval, operation, expectedValue);
    return solve(right, humanName, inverted);
  }

  throw new Error("Cant reach human");
}

monkeys["root"] = {
  left: (monkeys["root"] as Operation).left,
  operation: "-",
  right: (monkeys["root"] as Operation).right,
};

console.log("Second:", solve("root", "humn", 0));
