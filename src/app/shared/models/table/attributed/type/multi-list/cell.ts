import { CellValue } from '@shared/models/table/common/cell-value';
import { Cell } from '@shared/models/table/common/cell';

export type MultiListVal = CellValue & { readonly listItemId: number };
export type MultiListValDS = MultiListVal & { readonly attributeId: number };

export type MultiListCell = Cell<ReadonlyArray<MultiListVal>>;
