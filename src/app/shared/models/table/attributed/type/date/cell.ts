import { CellValue } from '@shared/models/table/common/cell-value';
import { Cell } from '@shared/models/table/common/cell';

type DateVal = CellValue & { readonly value: Date | null };
export type DateValDS = CellValue & {
  readonly value: string | null;
  readonly attributeId: number;
};

export type DateCell = Cell<DateVal>;
