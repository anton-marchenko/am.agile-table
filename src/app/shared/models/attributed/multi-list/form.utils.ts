import { getMultiListValue } from '@shared/models/attributed/multi-list/cell.utils';
import { Row } from '@shared/models/row';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

export const formMultiListValueFn = (attributeId: number) => (row: Row) => {
  const values = getMultiListValue(unwrapNullable(row), attributeId);
  return values ? values.map((el) => el.listItemId) : [];
};
