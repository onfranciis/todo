export interface IList {
  Title: string;
  Body: string;
  Time: string;
  Id: string;
}

export type Mode = "Edit" | "Preview";

export type handleToolsArg = Mode | "Prev" | "Next" | "Copy" | "Update";
