export interface Cell<T> {
  // featureId: number;
  // attributeId: number;
  value: T;
}

type txtVal = {
  etag?: string;
  id?: number; //IS_NEW
  value: string;
};

interface TextCell extends Cell<txtVal> {
  // value: string
}

type dtVal = {
  etag?: string;
  id?: number; //IS_NEW
  value: Date;
};

interface DateCell extends Cell<dtVal> {
  // value: Date
}

type mlVal = {
  etag?: string;
  id?: number; //IS_NEW
  listItemId: number;
};

interface MultiListCell extends Cell<mlVal[]> {
  // value: Date
}

type Cells<T> = {
  [key: string]: T;
};

export type AttributedCells = {
  text: Cells<TextCell>;
  date: Cells<DateCell>;
  multiList: Cells<MultiListCell>;
};

export type CellType = keyof AttributedCells;
