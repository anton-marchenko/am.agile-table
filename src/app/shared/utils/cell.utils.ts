import { Row } from '@shared/models/row';

export const getTextValue = (feature: Row, attributeId: number) => {
  return feature.attributed.text[attributeId]?.value;
};

export const getDateValue = (feature: Row, attributeId: number) => {
  return feature.attributed.date[attributeId]?.value;
};

export const getMultiListValue = (feature: Row, attributeId: number) => {
  return feature.attributed.multiList[attributeId]?.value;
};
