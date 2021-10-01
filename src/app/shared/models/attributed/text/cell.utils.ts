import { Row } from '@shared/models/row';

export const getTextValue = (row: Row, attributeId: number) => {
  return row.attributed.text[attributeId]?.value;
};
