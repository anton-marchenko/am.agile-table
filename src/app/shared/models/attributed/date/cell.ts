import { CellValue } from '@shared/models/common/cell-value';
import { Cell } from '@shared/models/common/cell';

type DateVal = CellValue & { readonly value: Date };

export type DateCell = Cell<DateVal>;
