export class Spacing {
  top?: number = 1;
  left?: number = 1;
  right?: number = 1;
  bottom?: number = 1;
}

export enum GravityValue {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export enum Position {
  BOOTON = "botton",
  TOP = 'top',
  CENTER = 'center'
}

export enum TextSize {
  SMALL = 1,
  MEDIUM = 2,
  BIG = 3,
  BIG_X = 4,
  BIG_XX = 5,
  BIG_XXX = 6,
}

export enum LayoutTypes {
    SCROLLING = 'scrolling',
    THREEPART = 'threePart'
}
