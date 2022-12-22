function stringToRange(rangeStr: string): [number, number] {
  const [start, end] = rangeStr.split("-");
  return [+start, +end];
}

function isInRange(point: number, [start, end]: [number, number]) {
  return point <= end && point >= start;
}

function overlaps(first: [number, number], second: [number, number]) {
  return (
    isInRange(first[0], second) ||
    isInRange(first[1], second) ||
    isInRange(second[0], first) ||
    isInRange(second[1], first)
  );
}

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const total = lines.reduce((result, line) => {
  const [first, second] = line.split(",");
  const range1 = stringToRange(first);
  const range2 = stringToRange(second);
  if (overlaps(range1, range2)) {
    result += 1;
  }
  return result;
}, 0);

console.log(total);
