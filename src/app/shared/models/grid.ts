import { CellType, ExplicitCells } from '@shared/models/cell';
import { Row } from '@shared/models/row';

export type SortDirection = 'asc' | 'desc' | null;

export type SortFn = (
  field: string,
  dir: Exclude<SortDirection, null>,
) => string;

type SortColumn = {
  sortable?: boolean;
  sortFn?: SortFn;
};

type FormValue<F> = {
  resolveFormValue: (row: Row) => F;
};

type DateColEdit = FormValue<string>;
type MultiColEdit = FormValue<number[]>;
type TxtColEdit = FormValue<string>;

type TypedAttrCol<T extends CellType> = {
  name: string;
  type: 'attributed';
  cellType: T;
  attributeId: number;
  alias: string;
};

export type TextColumn = TypedAttrCol<'text'> & TxtColEdit;
export type DateColumn = TypedAttrCol<'date'> & DateColEdit;
export type MultiListColumn = TypedAttrCol<'multiList'> & MultiColEdit;

export type AttrColumn = TextColumn | DateColumn | MultiListColumn;


type TypedExplCol<A extends keyof ExplicitCells> = {
  name: string;
  type: 'explicit';
  alias: A;
};

export type ExplColumn =
  | (TypedExplCol<'owner'> & FormValue<string | null>)
  | (TypedExplCol<'id'> & FormValue<number | null>);

export type GridColumn = (ExplColumn | AttrColumn) & SortColumn;

// | ({ name: string; type: 'explicit'; alias: string } & SortColumn)

// | ({
//     name: string;
//     type: 'attributed';
//     cellType: CellType;
//     attributeId: number;
//   } & SortColumn);
