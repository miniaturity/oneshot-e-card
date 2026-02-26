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
  nextDelay?: number; // delay next dialogue (box disappears until then)
  end?: boolean;
  requiresFlags?: string[];
  setFlags?: string[];

  options?: DialogueOption[];
}

export type DialogueGraph = Record<string, DialogueNode>;

export interface Item {
  id: string;
  name: string;
  desc: string;
  icon: string;

  onUse: () => void;
}
