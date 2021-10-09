import { getMultiListValue } from '@shared/models/table/attributed/type/multi-list/cell.utils';
import { Row } from '@shared/models/table';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

export const formMultiListValueFn = (attributeId: number) => (row: Row) => {
  const values = getMultiListValue(unwrapNullable(row), attributeId);
  return values ? values.map((el) => el.listItemId) : [];
};
