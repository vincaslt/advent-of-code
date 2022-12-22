import { Command } from "./types.ts";

function parseCommands(lines: string[]) {
  let activeLine = 0;

  function isEOF() {
    return activeLine === lines.length;
  }

  function getOutput(): string[] {
    if (isEOF()) {
      return [];
    }

    const line = lines[activeLine];

    if (line.startsWith("$")) {
      return [];
    }

    activeLine += 1;

    return [line, ...getOutput()];
  }

  function parseNext(): Command {
    const line = lines[activeLine];

    const [, name, ...args] = line.split(" ");

    activeLine += 1;

    return {
      name,
      args,
      output: getOutput(),
    };
  }

  const commands: Command[] = [];

  while (!isEOF()) {
    commands.push(parseNext());
  }

  return commands;
}

export default parseCommands;
