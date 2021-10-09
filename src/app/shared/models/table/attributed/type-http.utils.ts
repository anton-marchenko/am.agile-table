import { CellType } from '@shared/models/table/attributed';

const typeToValue: Readonly<Record<CellType, string>> = {
  text: 'TextValue',
  date: 'DateValue',
  multiList: 'MultiListValue',
};

const typeToValues: Readonly<Record<CellType, string>> = {
  text: 'TextValues',
  date: 'DateValues',
  multiList: 'MultiListValues',
};

export const resolveHttpTypeValues = (type: CellType) => `${typeToValues[type]}`;
export const resolveHttpTypeValue = (type: CellType) => `${typeToValue[type]}`;
