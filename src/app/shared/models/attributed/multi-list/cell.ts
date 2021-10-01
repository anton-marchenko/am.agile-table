import { CellValue } from '@shared/models/common/cell-value';
import { Cell } from '@shared/models/common/cell';

export type MultiListVal = CellValue & { listItemId: number };

export type MultiListCell = Cell<MultiListVal[]>;
