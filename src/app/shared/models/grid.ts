import { CellType } from '@shared/models/cell';
import { DateVal, MultiListVal, TextVal } from '@shared/models/cell-value';

export type SortDirection = 'asc' | 'desc' | null;

export type SortFn = (
  field: string,
  dir: Exclude<SortDirection, null>,
) => string;

type SortColumn = {
  sortable?: boolean;
  sortFn?: SortFn;
};

type EditColumn<I, O> = {
  formValueFn: (value: I) => O;
};

type DateColEdit = EditColumn<DateVal, string>;
type MultiColEdit = EditColumn<MultiListVal[], number[]>;
type TxtColEdit = EditColumn<TextVal, string>;

type TypedColumn<T extends CellType> = {
  name: string;
  type: 'attributed';
  cellType: T;
  attributeId: number;
};

export type TextColumn = TypedColumn<'text'> & TxtColEdit;
export type DateColumn = TypedColumn<'date'> & DateColEdit;
export type MultiListColumn = TypedColumn<'multiList'> & MultiColEdit;

export type GridColumn =
  | ({ name: string; type: 'explicit'; alias: string } & SortColumn)
  | (TextColumn & SortColumn)
  | (DateColumn & SortColumn)
  | (MultiListColumn & SortColumn);

// | ({
//     name: string;
//     type: 'attributed';
//     cellType: CellType;
//     attributeId: number;
//   } & SortColumn);
