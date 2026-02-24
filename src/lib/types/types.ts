export type Flags = Record<string, boolean>;

export interface DialogueOption {
  title: string;
  next: string;

  requiresFlags?: string[];
  setFlags?: string[];
}

export interface DialogueNode {
  id: string;
  text: string;
  expression: string;

  next?: string;

  pausePoints?: { index: number, ms: number }[];
  allDelay?: number; // pause points but for all indexes
  requiresFlags?: string[];
  setFlags?: string[];

  options?: DialogueOption[];
}

export type DialogueGraph = Record<string, DialogueNode>;
