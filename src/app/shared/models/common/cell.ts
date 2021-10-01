export interface Cell<T> {
  // rowId: number;
  // attributeId: number;
  value: T;
}

export type Cells<T> = {
  [key: string]: T | undefined;
};
