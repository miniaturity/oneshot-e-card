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
    text: "Am I.. here again..?",
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
    text: "Wait.. Is this another dream?",
    expression: "niko_eyeclosed",

    options: [
      {
        title: "I am here.",
        next: "wow"
      }
    ],

    pausePoints: [
      {
        index: 6,
        ms: 200
      },
      {
        index: 7,
        ms: 250
      }
    ]
  },

  wow: {
    id: "wow",
    text: "Miniaturity?!",
    expression: "niko_pancakes",

    options: [
      {
        title: "I am not Miniaturity.",
        next: "who"
      },
      {
        title: "Yeah?",
        next: "fake"
      }
    ]
  },

  who: {
    id: "who",
    text: "Then.. Who are you..?",
    expression: "niko2",

    pausePoints: [
      {
        index: 5,
        ms: 200
      },
      {
        index: 6,
        ms: 200
      }
    ],

    next: "found_note"
  },

  fake: {
    id: "fake",
    text: "You aren't Miniaturity.. he sounds different.",
    expression: "niko_eyeclosed",

    pausePoints: [
      {
        index: 23,
        ms: 200
      },
      {
        index: 24,
        ms: 200
      }
    ],

    next: "fake_who"
  },

  fake_who: {
    id: "fake_who",
    text: "Who are you really?",
    expression: "niko_distressed",

    next: "found_note"
  },

  found_note: {
    id: "found_note",
    text: "Wait.. there's something in my pocket.",
    expression: "niko",

    pausePoints: [
      {
        index: 6,
        ms: 200
      },
      {
        index: 7,
        ms: 250
      }
    ]
  },

  note: {
    id: "note",
    text: "It says.. \"From Miniaturity to Emmy.\"",
    expression: "niko_speak",
    next: "emmy",

    pausePoints: [
      {
        index: 8,
        ms: 200
      },
      {
        index: 9,
        ms: 250
      }
    ]
  },

  emmy: {
    id: "emmy",
    text: "Are you Emmy?..",
    expression: "niko_smile",

    options: [
      {
        title: "Yeah.",
        next: "friend"
      },
      {
        title: "Nah.",
        next: "anyways"
      }
    ]
  },

  friend: {
    id: "friend",
    text: "A friend of Miniaturity is a friend of mine...",

    expression: "niko_83c",
    setFlags: ["isEmmy"],

    next: "note_b"
  },

  anyways: {
    id: "stop",
    text: "...Well, I guess I might as well read it.",
    expression: "niko_what",
    setFlags: ["notEmmy"],

    pausePoints: [
      {
        index: 0,
        ms: 250,
      },
      {
        index: 1,
        ms: 250,
      },
      {
        index: 2,
        ms: 250
      }
    ],

    next: "note_b"
  },

  note_b: {
    id: "note_b",
    text: "\"Dear Emmy...\"",
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
