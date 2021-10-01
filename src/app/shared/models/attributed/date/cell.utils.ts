import { Row } from '@shared/models/row';

export const getDateValue = (row: Row, attributeId: number) => {
  return row.attributed.date[attributeId]?.value;
};
