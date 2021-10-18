import { DictionaryItem } from '@shared/models/dictionary';

export type ExplicitCells = {
  readonly rating: number | null;
  readonly author: DictionaryItem<string> | null;
};
