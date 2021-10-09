import { Row } from '@shared/models/table';

export const getMultiListValue = (row: Row, attributeId: number) => {
  return row.attributed.multiList[attributeId]?.value;
};
