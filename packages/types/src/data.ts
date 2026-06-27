export type PrimitiveValue = string | number | boolean | null | undefined | bigint | symbol;

export type ShallowObject<T extends Record<string, PrimitiveValue>> = T;
