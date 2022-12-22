import parseCommands from "./commandParser.ts";
import createCommandRunner from "./commandRunner.ts";
import cd from "./commands/cd.ts";
import ls from "./commands/ls.ts";
import createDirTree, {
  getNodeSize,
  isDirectory,
  selectNodesInDirectory,
} from "./DirTree.ts";

const runner = createCommandRunner();

runner.register("cd", cd);
runner.register("ls", ls);

const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const commands = parseCommands(lines);

const resultTree = commands.reduce((dirTree, command) => {
  runner.run(dirTree, command);
  return dirTree;
}, createDirTree());

const partOneResult = selectNodesInDirectory(
  resultTree.root,
  (node) => isDirectory(node) && getNodeSize(node) <= 100000
).reduce((sum, node) => sum + getNodeSize(node), 0);

console.log("Part 1 result: ", partOneResult);

const freeSpace = 70000000 - getNodeSize(resultTree.root);
const minDirectorySizeToDelete = 30000000 - freeSpace;

const partTwoResult = selectNodesInDirectory(
  resultTree.root,
  (node) => isDirectory(node) && getNodeSize(node) >= minDirectorySizeToDelete
)
  .map(getNodeSize)
  .sort((a, b) => a - b)[0];

console.log("Part 2 result: ", partTwoResult);
