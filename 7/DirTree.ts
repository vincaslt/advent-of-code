import { Directory, DirTree, Node } from "./types.ts";

function createDirTree(): DirTree {
  return {
    activePath: ["/"],
    root: { name: "/", contents: [], type: "dir" },
  };
}

export function isDirectory(node: Node): node is Directory {
  return node.type === "dir";
}

export function getChildDir(directory: Directory, name: string) {
  return directory.contents
    .filter(isDirectory)
    .find((child) => child.name === name);
}

export function getActiveDir(tree: DirTree) {
  let currentDirectory = tree.root;

  for (const name of tree.activePath) {
    if (name === "/") {
      currentDirectory = tree.root;
      continue;
    }

    const newDir = getChildDir(currentDirectory, name);

    if (!newDir) {
      throw new Error(
        `Directory ${name} not found in path ${tree.activePath.join("/")}`
      );
    }

    currentDirectory = newDir;
  }

  return currentDirectory;
}

export function getNodeSize(node: Node): number {
  if (node.type === "file") {
    return node.size;
  }

  return node.contents.reduce((total, node) => {
    if (node.type === "file") {
      return total + node.size;
    }
    return total + getNodeSize(node);
  }, 0);
}

export function selectNodesInDirectory(
  directory: Directory,
  filterFn: (node: Node) => boolean
): Node[] {
  return [
    ...directory.contents.filter(filterFn),
    ...directory.contents
      .filter(isDirectory)
      .flatMap((node) => selectNodesInDirectory(node, filterFn)),
  ];
}

export default createDirTree;
