const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const totals: number[] = [];

let total = 0

for (const line of lines) {
  if (!line.length) {
    totals.push(total);
    total = 0
    continue;
  }
  total += +line;
}
totals.push(total)

const max = totals.sort().slice(-3).reduce((sum, num) => sum + num, 0)

console.log(max)