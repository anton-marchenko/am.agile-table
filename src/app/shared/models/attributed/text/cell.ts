import { CellValue } from '@shared/models/common/cell-value';
import { Cell } from '@shared/models/common/cell';

export type TextVal = CellValue & { readonly value: string };

export type TextCell = Cell<TextVal>;
