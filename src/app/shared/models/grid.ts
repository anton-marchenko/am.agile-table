import { CellType } from '@shared/models/cell';

export type SortDirection = 'asc' | 'desc' | null;

type SortFn = (field: string, dir: Exclude<SortDirection, null>) => string;

// FIXME - restrict types by CellType
const typeToSort = {
  text: 'TextValue',
  date: 'DateValue',
  multiList: 'MultiListValue',
};

type SortColumn = {
  sortable?: boolean;
  sortFn?: SortFn;
};

export type GridColumn =
  | ({ name: string; type: 'explicit'; alias: string } & SortColumn)
  | ({
      name: string;
      type: 'attributed';
      cellType: CellType;
      attributeId: number;
    } & SortColumn);
