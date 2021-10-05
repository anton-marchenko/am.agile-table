export type DictionaryItem<T> = {
  readonly id: T;
  readonly name: string;
};

export type Dictionary<T> = ReadonlyArray<DictionaryItem<T>>;
