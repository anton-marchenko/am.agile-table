export interface Cell<T> {
  // rowId: number;
  // attributeId: number;
  readonly value: T;
}

export type Cells<T> = {
  // FIXME - key is only string
  // FIXME - use text: ReadonlyArray<T> instead
  // Then text[index] will work with index: number (index = attrId)
  readonly [key: number]: T | undefined;
};
