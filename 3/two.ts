function getPriority(item: string) {
  if (item === item.toLowerCase()) {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }

  return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

function getSameItems([firstBag, ...others]: string[]) {
  const firstItems = firstBag.split("");
  const sameItems = firstItems.reduce<Set<string>>((itemsInAll, item) => {
    const isItemInAll = others.every((other) => {
      const items = other.split("");
      return items.includes(item);
    });

    if (isItemInAll) {
      itemsInAll.add(item);
    }

    return itemsInAll;
  }, new Set<string>());

  return Array.from(sameItems);
}

function getGroups(lines: string[]): string[][] {
  return lines.reduce<string[][]>((groups, items) => {
    const group = groups[groups.length - 1];
    if (group && group.length < 3) {
      group.push(items);
    } else {
      groups.push([items]);
    }
    return groups;
  }, []);
}

function getTotalPriority(items: string[]) {
  return items.reduce((total, item) => total + getPriority(item), 0);
}

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const groups = getGroups(lines);

const total = groups.reduce((result, group) => {
  const badges = getSameItems(group);
  const total = getTotalPriority(badges);
  return result + total;
}, 0);

console.log(total);
