type Instruction = {
  from: number;
  to: number;
  amount: number;
};

function parseCrates(lines: string[]) {
  const parseLine = (line: string) => {
    const result = [];
    for (let i = 1; i < line.length; i += 4) {
      result.push(line[i]);
    }
    return result;
  };

  return lines.reduce<string[][]>((crates, line) => {
    if (!line.includes("[")) {
      return crates;
    }

    const crateStrings = parseLine(line);
    return crateStrings.map((crate, i) => {
      if (!crates[i]) {
        return crate !== " " ? [crate] : [];
      }

      return crate !== " " ? [crate, ...crates[i]] : crates[i];
    });
  }, []);
}

function parseInstructions(lines: string[]): Instruction[] {
  const parseLine = (line: string) => {
    const [, amount, , from, , to] = line.split(" ");
    return {
      amount: +amount,
      from: +from,
      to: +to,
    };
  };
  return lines.map(parseLine);
}

function simulate(crates: string[][], instructions: Instruction[]) {
  for (const { amount, from, to } of instructions) {
    const moving = crates[from - 1].splice(crates[from - 1].length - amount);
    crates[to - 1].push(...moving.reverse());
  }
  return crates;
}

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");
const separator = lines.indexOf("");

const initialCrates = parseCrates(lines.slice(0, separator));
const instructions = parseInstructions(lines.slice(separator + 1));
const resultCrates = simulate(initialCrates, instructions);

const result = resultCrates.map((crates) => crates[crates.length - 1]).join("");
console.log(result);
// const total = lines.reduce((result, line) => {

//   const range1 = simulate(first);
//   const range2 = stringToRange(second);
//   if (contains(range1, range2) || contains(range2, range1)) {
//     result += 1;
//   }
//   return result;
// }, 0);

// console.log(total);
