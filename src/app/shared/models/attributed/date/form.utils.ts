import { getDateValue } from '@shared/models/attributed/date/cell.utils';
import { Row } from '@shared/models/row';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

export const formDateValueFn = (attributeId: number) => (row: Row) => {
  const dateValue = getDateValue(unwrapNullable(row), attributeId);

  return dateValue ? dateValue.value.toISOString() : '';
};
