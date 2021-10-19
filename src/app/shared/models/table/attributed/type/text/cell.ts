import { CellValue } from '@shared/models/table/common/cell-value';
import { Cell } from '@shared/models/table/common/cell';

export type TextVal = CellValue & { readonly value: string | null };
export type TextValDS = TextVal & { readonly attributeId: number };

export type TextCell = Cell<TextVal>;
