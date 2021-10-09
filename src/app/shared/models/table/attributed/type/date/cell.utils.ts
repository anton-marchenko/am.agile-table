import { Row } from '@shared/models/table';

export const getDateValue = (row: Row, attributeId: number) => {
  return row.attributed.date[attributeId]?.value;
};
