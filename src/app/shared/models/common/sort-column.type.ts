export type SortDirection = 'asc' | 'desc' | null;

export type SortFn = (
  field: string,
  dir: NonNullable<SortDirection>,
) => string;

export type SortColumn = {
  sortable?: boolean;
  sortFn?: SortFn;
};
