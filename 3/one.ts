function getPriority(item: string) {
  if (item === item.toLowerCase()) {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }

  return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

function getCompartments(str: string): [string, string] {
  const mid = str.length / 2;
  return [str.slice(0, mid), str.slice(mid)];
}

function getSameItems(compartments: [string, string]) {
  const firstItems = compartments[0].split("");
  const secondItems = compartments[1].split("");
  const sameItems = firstItems.reduce<Set<string>>((itemsInBoth, item) => {
    if (secondItems.includes(item)) {
      itemsInBoth.add(item);
    }
    return itemsInBoth;
  }, new Set<string>());

  return Array.from(sameItems);
}

function getTotalPriority(items: string[]) {
  return items.reduce((total, item) => total + getPriority(item), 0);
}

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const total = lines.reduce((result, line) => {
  const compartments = getCompartments(line);
  const sameItems = getSameItems(compartments);
  const total = getTotalPriority(sameItems);
  return result + total;
}, 0);

console.log(total);
