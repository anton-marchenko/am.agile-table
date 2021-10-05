import { CellValue } from '@shared/models/common/cell-value';
import { Cell } from '@shared/models/common/cell';

export type MultiListVal = CellValue & { readonly listItemId: number };

export type MultiListCell = Cell<ReadonlyArray<MultiListVal>>;
