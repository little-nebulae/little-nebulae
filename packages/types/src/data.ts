export type PrimitiveValue = string | number | boolean | null | undefined | bigint | symbol;

export type ShallowObject = Record<string, PrimitiveValue>;
