import { DateVal, MultiListVal, TextVal } from '@shared/models/cell-value';

export interface Cell<T> {
  // rowId: number;
  // attributeId: number;
  value: T;
}

interface TextCell extends Cell<TextVal> {
  // value: string
}

interface DateCell extends Cell<DateVal> {
  // value: Date
}

interface MultiListCell extends Cell<MultiListVal[]> {
  // value: Multilist
}



type Cells<T> = {
  [key: string]: T | undefined;
};

export type AttributedCells = {
  text: Cells<TextCell>;
  date: Cells<DateCell>;
  multiList: Cells<MultiListCell>;
};

export type CellType = keyof AttributedCells;
