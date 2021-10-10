import { Nullish } from '@shared/models/nullish';

export type SortDirection = 'asc' | 'desc' | null;

export type SortFn = (field: string, dir: NonNullable<SortDirection>) => string;

export type SortColumn = {
  readonly sortable?: Nullish<boolean>;
  readonly sortFn?: SortFn;
};
