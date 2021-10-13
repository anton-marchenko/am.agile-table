import { AttrColumn, AttrColumnDS } from '@shared/models/table/attributed';
import {
  ExplColumn,
  ExplColumnDS,
} from '@shared/models/table/explicit/expl-column';
import { SortColumn } from '@shared/models/table/common/sort-column.type';
import { Nullish } from '@shared/models/nullish';

type Width = { readonly width?: Nullish<number> };
type Name = { readonly name: string };

export type ColumnCfg = SortColumn & Width & Name;

export type GridColumn = ExplColumn | AttrColumn;

export type GridColumnDS = ExplColumnDS | AttrColumnDS;
