import { getTextValue } from '@shared/models/attributed/text/cell.utils';
import { Row } from '@shared/models/row';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

export const formTextValueFn = (attributeId: number) => (row: Row) => {
  const textValue = getTextValue(unwrapNullable(row), attributeId);

  return textValue?.value ?? '';
};
