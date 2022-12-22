function stringToRange(rangeStr: string): [number, number] {
  const [start, end] = rangeStr.split("-");
  return [+start, +end];
}

function contains(container: [number, number], contained: [number, number]) {
  return container[0] <= contained[0] && container[1] >= contained[1];
}

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const total = lines.reduce((result, line) => {
  const [first, second] = line.split(",");
  const range1 = stringToRange(first);
  const range2 = stringToRange(second);
  if (contains(range1, range2) || contains(range2, range1)) {
    result += 1;
  }
  return result;
}, 0);

console.log(total);
