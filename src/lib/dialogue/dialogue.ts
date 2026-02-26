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
    text: "I'm.. back here?",
    expression: "niko_speak",
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
    text: "Wait.. is this another dream?",
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
    text: "Then.. who are you..?",
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
    text: "Are you Emmy?",
    expression: "niko2",

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
    text: "Okay, I'll read it out for you..",

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
    text: "Ahem.. \"Dear Emmy...\"",
    expression: "niko_speak",
    next: "note_c",

    pausePoints: [
      {
        index: 5,
        ms: 250,
      },
      {
        index: 6,
        ms: 250,
      }
    ],
  },

  note_c: {
    id: "note_c",
    text: "\"I hope this card finds you well..\"",
    expression: "niko",
    next: "note_f"
  },

  note_f: {
    id: "note_f",
    text: "\"I wanted to write to you because.. I think you're pretty cool!\"",
    expression: "niko_speak",

    next: "note_g"
  },

  note_g: {
    id: "note_g",
    text: "Aww...",
    expression: "niko_83c",
    requiresFlags: ["isEmmy"],
    next: "note_h"
  },

  note_h: {
    id: "note_h",
    text: "\"And I wanted to make this OneShot themed because you bought me it..\"",
    expression: "niko_speak",
    next: "note_i"
  },

  note_i: {
    id: "note_i",
    text: "\"So I thought that I'd make something for you in return!\"",
    expression: "niko",
    next: "note_l"
  },

  note_l: {
    id: "note_l",
    text: "\"You're the nicest girl I know, and I am very very grateful for your gift..\"",
    expression: "niko_speak",
    next: "note_m"
  },

  note_m: {
    id: "note_m",
    text: "\"OneShot is like, my favorite indie story game. I loove it so much!!\"",
    expression: "niko",
    next: "note_n"
  },

  note_n: {
    id: "note_n",
    text: "\"Anyways, thanks for taking the time to read.\"",
    expression: "niko_speak",
    next: "note_p"
  },

  note_p: {
    id: "note_p",
    text: "\"Lots of love, Miniaturity.\"",
    expression: "niko_speak",
    next: "note_q"
  },

  note_q: {
    id: "note_q",
    text: "That's the end of the note..",
    expression: "niko",
    next: "goodbye_knows"
  },

  goodbye_knows: {
    id: "goodbye_knows",
    requiresFlags: ["isEmmy"],
    text: "Well, it was nice knowing you Emmy! I've got to get back home before mama starts worrying..",
    expression: "niko_83c",
    next: "goodbye_random",

    pausePoints: [
      {
        index: 35,
        ms: 500
      }
    ]
  },

  goodbye_random: {
    id: "goodbye_random",
    requiresFlags: ["notEmmy"],
    text: "..Um, I've gotta go home.. Goodbye, stranger!",
    expression: "niko_speak",

    end: true,
    next: "bye_c",

    pausePoints: [
      {
        index: 26,
        ms: 250
      },
      {
        index: 27,
        ms: 250
      }
    ]
  },

  bye_c: {
    id: "bye_c",
    text: "Goodbye. I hope I can come back here again, soon.",
    expression: "niko_smile",
    end: true,
    requiresFlags: ["isEmmy"]
  }
};
