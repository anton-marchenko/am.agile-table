import { CellValue } from '@shared/models/common/cell-value';
import { Cell } from '@shared/models/common/cell';

export type DateVal = CellValue & { value: Date };

export type DateCell = Cell<DateVal>;
