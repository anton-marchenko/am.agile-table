import { AttrColumn } from '@shared/models/attributed';
import { ExplColumn } from '@shared/models/explicit/expl-column';
import { SortColumn } from '@shared/models/common/sort-column.type';

export type GridColumn = (ExplColumn | AttrColumn) & SortColumn;
