function createCircularList(initial: number[]) {
  // remappedIndices[index] = index in initial list
  const remappedIndices = initial.map((_, i) => i);

  function wrappedIndexAt(index: number) {
    return (index + remappedIndices.length) % remappedIndices.length;
  }

  function getIndexMoveByNum(index: number, num: number) {
    const newIndex = wrappedIndexAt(index + num);

    if (num < 0 && newIndex === 0) {
      return remappedIndices.length;
    }

    return newIndex;
  }

  function move(index: number) {
    const num = initial[index];
    const indexOfOriginalInRemapped = remappedIndices.indexOf(index);
    remappedIndices.splice(indexOfOriginalInRemapped, 1);
    const newIndex = getIndexMoveByNum(indexOfOriginalInRemapped, num);
    remappedIndices.splice(newIndex, 0, index);
  }

  function mix(times = 1) {
    initial.forEach((_, index) => move(index));
    if (times > 1) {
      mix(times - 1);
    }
  }

  function wrappedAt(index: number) {
    return initial[remappedIndices[wrappedIndexAt(index)]];
  }

  function toArray() {
    return remappedIndices.map((_, index) => wrappedAt(index));
  }

  function wrappedAtAfter(after: number, num: number) {
    return wrappedAt(toArray().indexOf(after) + num);
  }

  return { mix, wrappedAtAfter };
}

const input = await Deno.readTextFile("./input.txt");

const getResult = (multiplyBy: number, mixTimes: number) => {
  const sequence = input
    .split("\n")
    .map(Number)
    .map((value) => value * multiplyBy);

  const circularList = createCircularList(sequence);

  circularList.mix(mixTimes);

  return (
    circularList.wrappedAtAfter(0, 1000) +
    circularList.wrappedAtAfter(0, 2000) +
    circularList.wrappedAtAfter(0, 3000)
  );
};

console.log("First:", getResult(1, 1));
console.log("Second:", getResult(811589153, 10));
