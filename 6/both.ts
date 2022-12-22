function areAllCharsDifferent(str: string) {
  const uniques = new Set(str.split(""));
  return uniques.size === str.length;
}

function lookup(line: string, numUnique: number) {
  for (let offset = numUnique; offset <= line.length; offset++) {
    const lastFourChars = line.slice(offset - numUnique, offset);
    if (areAllCharsDifferent(lastFourChars)) {
      return offset;
    }
  }
  return -1;
}

const input = await Deno.readTextFile("./input.txt");

console.log("first: ", lookup(input, 4));
console.log("second: ", lookup(input, 14));
