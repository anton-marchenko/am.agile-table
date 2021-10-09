import { CellValue } from '@shared/models/table/common/cell-value';
import { Cell } from '@shared/models/table/common/cell';

type DateVal = CellValue & { readonly value: Date };

export type DateCell = Cell<DateVal>;
