import { CellType } from '@shared/models/cell';


const typeToSort: Record<CellType, string> = {
  text: 'TextValue',
  date: 'DateValue',
  multiList: 'MultiListValue',
};

export const resAttrSortField = (type: CellType, attributeId: number) =>
  `${typeToSort[type]}${attributeId}`;
