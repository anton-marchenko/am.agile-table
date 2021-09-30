import { Row } from '@shared/models/row';

export const getTextValue = (row: Row, attributeId: number) => {
  return row.attributed.text[attributeId]?.value;
};

export const getDateValue = (row: Row, attributeId: number) => {
  return row.attributed.date[attributeId]?.value;
};

export const getMultiListValue = (row: Row, attributeId: number) => {
  return row.attributed.multiList[attributeId]?.value;
};
