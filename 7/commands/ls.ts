import { CommandExecutor } from "../commandRunner.ts";
import { getActiveDir, getChildDir } from "../DirTree.ts";
import { Node } from "../types.ts";

function parseOutputLine(line: string): Node {
  if (line.startsWith("dir")) {
    const [, name] = line.split(" ");
    return { name, type: "dir", contents: [] };
  }
  const [size, name] = line.split(" ");
  return { name, type: "file", size: +size };
}

const ls: CommandExecutor = (tree, _, output) => {
  const activeDirectory = getActiveDir(tree);
  const newNodes = output
    .map(parseOutputLine)
    .filter((node) => !getChildDir(activeDirectory, node.name));
  activeDirectory.contents.push(...newNodes);
};

export default ls;
