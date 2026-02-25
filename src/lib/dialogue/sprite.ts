// Maybe one day I'll get around to figuring this out.

export const SPRITE_PATHS: Record<string, string> = {
  front_still: "00",
  front_walk_a: "01",
  front_walk_b: "02",
  front_walk_c: "03",

  left_still: "04",
  left_walk_a: "05",
  left_walk_b: "06",
  left_walk_c: "07",

  right_still: "08",
  right_walk_a: "09",
  right_walk_b: "10",
  right_walk_c: "11",

  back_still: "12",
  back_walk_a: "13",
  back_walk_b: "14",
  back_walk_c: "15"
}

export const ANIM_CYCLES = {
  front_walk: [
    SPRITE_PATHS.front_still,
    SPRITE_PATHS.front_walk_a,
    SPRITE_PATHS.front_walk_b,
    SPRITE_PATHS.front_walk_a,
  ],

  left_walk: [
    SPRITE_PATHS.left_still,
    SPRITE_PATHS.left_walk_a,
    SPRITE_PATHS.left_walk_b,
    SPRITE_PATHS.left_walk_a,
  ],

  right_walk: [
    SPRITE_PATHS.right_still,
    SPRITE_PATHS.right_walk_a,
    SPRITE_PATHS.right_walk_b,
    SPRITE_PATHS.right_walk_a,
  ],

  back_walk: [
    SPRITE_PATHS.back_still,
    SPRITE_PATHS.back_walk_a,
    SPRITE_PATHS.back_walk_b,
    SPRITE_PATHS.back_walk_a,
  ]
};