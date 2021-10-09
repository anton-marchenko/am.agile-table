import { getTextValue } from '@shared/models/table/attributed/type/text/cell.utils';
import { Row } from '@shared/models/table';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

export const formTextValueFn = (attributeId: number) => (row: Row) => {
  const textValue = getTextValue(unwrapNullable(row), attributeId);

  return textValue?.value ?? '';
};
