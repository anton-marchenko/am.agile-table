import { DateColumn } from '@shared/models/attributed/date';
import { MultiListColumn } from '@shared/models/attributed/multi-list/column';
import { TextColumn } from '@shared/models/attributed/text/column';

export { CellType, AttributedCells } from '@shared/models/attributed/cell';
export { TypedColumn } from '@shared/models/attributed/column';
export { PredefinedAttr } from '@shared/models/attributed/predefined-attr';
export { resAttrSortField } from '@shared/models/attributed/sort.utils';

export type AttrColumn = TextColumn | DateColumn | MultiListColumn;
