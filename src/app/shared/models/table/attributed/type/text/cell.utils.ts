import { Row } from '@shared/models/table';

export const getTextValue = (row: Row, attributeId: number) => {
  return row.attributed.text[attributeId]?.value;
};
