import { DateColumn } from '@shared/models/table/attributed/type/date';
import { MultiListColumn } from '@shared/models/table/attributed/type/multi-list/column';

import {
  DateColumnDS,
  NewDateColumnDS,
} from '@shared/models/table/attributed/type/date/column';
import { MultiListColumnDS } from '@shared/models/table/attributed/type/multi-list/column';
import {
  TextColumn,
  NewTextColumnDS,
  TextColumnDS,
} from '@shared/models/table/attributed/type/text/column';

export {
  CellType,
  AttributedCells,
} from '@shared/models/table/attributed/cell';

export * from '@shared/models/table/attributed/typed-column';

export {
  PredefinedAttr,
  isPredefinedAttr,
} from '@shared/models/table/attributed/predefined-attr';
export { resAttrSortField } from '@shared/models/table/attributed/sort.utils';

export type AttrColumn = TextColumn | DateColumn | MultiListColumn;

export type NewAttrColumn = NewDateColumnDS | NewTextColumnDS;

/** For storing column data */
export type AttrColumnDS = TextColumnDS | DateColumnDS | MultiListColumnDS;

// TODO index.ts to type
export { getTextValue } from '@shared/models/table/attributed/type/text/cell.utils';
export { getDateValue } from '@shared/models/table/attributed/type/date';
export { getMultiListValue } from '@shared/models/table/attributed/type/multi-list/cell.utils';

export { getQueryExpand } from '@shared/models/table/attributed/http.utils';
