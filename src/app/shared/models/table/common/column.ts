import { AttrColumn } from '@shared/models/table/attributed';
import { ExplColumn } from '@shared/models/table/explicit/expl-column';
import { SortColumn } from '@shared/models/table/common/sort-column.type';

export type GridColumn = (ExplColumn | AttrColumn) & SortColumn;
