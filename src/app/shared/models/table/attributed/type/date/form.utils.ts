import { getDateValue } from '@shared/models/table/attributed/type/date';
import { Row } from '@shared/models/table';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

const padZero = (numericValue: number) => {
  if (numericValue < 10) return '0' + numericValue.toString();

  return numericValue.toString();
};

/**
 * @link https://stackoverflow.com/a/64665004/13496764
 */
const createDateString = (date: Date) => {
  //  Take a Date value, and turn it into a "2005-05-26T11:37:42" string
  return (
    date.getFullYear() +
    '-' +
    padZero(date.getMonth() + 1) +
    '-' +
    padZero(date.getDate()) +
    'T' +
    padZero(date.getHours()) +
    ':' +
    padZero(date.getMinutes()) +
    ':' +
    padZero(date.getSeconds())
  );
};

export const formDateValueFn = (attributeId: number) => (row: Row) => {
  const dateValue = getDateValue(unwrapNullable(row), attributeId);

  return dateValue?.value ? createDateString(unwrapNullable(dateValue.value)) : null;
};
