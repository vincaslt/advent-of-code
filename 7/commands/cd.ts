import { CommandExecutor } from "../commandRunner.ts";
import { getActiveDir, getChildDir } from "../DirTree.ts";

const cd: CommandExecutor = (tree, [name]) => {
  if (name === "/") {
    tree.activePath = ["/"];
  }

  if (name === "..") {
    tree.activePath = tree.activePath.slice(0, tree.activePath.length - 1);
  }

  const childDir = getChildDir(getActiveDir(tree), name);

  if (!childDir) {
    return;
  }

  tree.activePath.push(childDir.name);
};

export default cd;
