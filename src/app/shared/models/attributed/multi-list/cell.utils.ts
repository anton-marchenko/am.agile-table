import { Row } from '@shared/models/row';

export const getMultiListValue = (row: Row, attributeId: number) => {
  return row.attributed.multiList[attributeId]?.value;
};
