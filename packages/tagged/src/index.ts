declare const __tags: unique symbol;

export type Tagged<T, Tags extends string> = T & {
  readonly [__tags]: Record<Tags, true>;
};
