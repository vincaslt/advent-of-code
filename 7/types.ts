export type Directory = { name: string; contents: Node[]; type: "dir" };
export type File = { name: string; size: number; type: "file" };
export type Node = Directory | File;
export type Command = { name: string; args: string[]; output: string[] };

export type DirTree = {
  activePath: string[];
  root: Directory;
};
