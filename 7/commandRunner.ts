import { Command, DirTree } from "./types.ts";

export type CommandExecutor = (
  tree: DirTree,
  args: string[],
  output: string[]
) => void;

function createCommandRunner() {
  const commands: Record<string, CommandExecutor> = {};

  function register(name: string, run: CommandExecutor) {
    commands[name] = run;
  }

  function run(tree: DirTree, command: Command) {
    const executor = commands[command.name];
    if (!executor) {
      throw new Error(`Unknown command: ${command.name}`);
    }
    executor(tree, command.args, command.output);
  }

  return { register, run };
}

export default createCommandRunner;
