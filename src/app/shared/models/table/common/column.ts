import { AttrColumn } from '@shared/models/table/attributed';
import { ExplColumn } from '@shared/models/table/explicit/expl-column';
import { SortColumn } from '@shared/models/table/common/sort-column.type';
import { Nullish } from '@shared/models/nullish';

type Width = { width?: Nullish<number> };

export type GridColumn = (ExplColumn | AttrColumn) & SortColumn & Width;
