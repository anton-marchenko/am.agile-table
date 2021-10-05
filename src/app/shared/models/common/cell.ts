export interface Cell<T> {
  // rowId: number;
  // attributeId: number;
  readonly value: T;
}

export type Cells<T> = {
  readonly [key: string]: T | undefined;
};
