type CellValue = {
  etag?: string;
  id?: number; // IS_NEW
  // isNew: boolean
};

export type TextVal = CellValue & { value: string };

export type DateVal = CellValue & { value: Date };

export type MultiListVal = CellValue & { listItemId: number };


