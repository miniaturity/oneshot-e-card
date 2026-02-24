import type { DialogueGraph } from "$lib/types/types";

export const DIALOGUE: DialogueGraph = {
  start: {
    id: "start",
    text: "Hello..?",
    expression: "niko",
    next: "start_b"
  },

  start_b: {
    id: "start_b",
    text: "Am I.. Here again..?",
    expression: "niko_pancakes",
    next: "start_c",

    pausePoints: [
      {
        index: 5,
        ms: 200
      },
      {
        index: 6,
        ms: 250
      }
    ]
  },

  start_c: {
    id: "start_c",
    text: "Whats this in my pocket?",
    expression: "niko_speak"
  }

  // question: {
  //   id: "question",
  //   text: "What do you want to know?",
  //   expression: "niko",
  //   options: [
  //     {
  //       title: "Who are you?",
  //       next: "who",
  //       setFlags: ["askedWho"]
  //     },
  //     {
  //       title: "You're annoying.",
  //       next: "rude",
  //       setFlags: ["rude"]
  //     }
  //   ]
  // },

  // who: {
  //   id: "who",
  //   text: "I'm just a prototype.",
  //   expression: "niko",
  //   next: "after"
  // },

  // rude: {
  //   id: "rude",
  //   text: "...That's not very nice.",
  //   expression: "niko",
  //   next: "after"
  // },

  // after: {
  //   id: "after",
  //   text: "Anyway...",
  //   expression: "niko",
  //   next: "memoryCheck"
  // },

  // memoryCheck: {
  //   id: "memoryCheck",
  //   text: "I remember what you said earlier.",
  //   expression: "niko",
  //   requiresFlags: ["rude"],
  //   next: "end"
  // },

  // end: {
  //   id: "end",
  //   text: "See you later.",
  //   expression: "niko"
  // }
};
