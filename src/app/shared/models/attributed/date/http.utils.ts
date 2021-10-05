import { DateRequest } from '@shared/models/attributed/date/http';
import { headers } from '@shared/models/attributed/http/http-header.utils';
import { Row } from '@shared/models/row';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

export const getDateRequests =
  (attributeId: number) =>
  (row: Row, newValue: string): ReadonlyArray<DateRequest> => {
    const oldValue = row.attributed.date[attributeId]?.value;
    const isNew = !oldValue;

    if (isNew) {
      return [
        {
          id: 'gen_uniq_id',
          method: 'post',
          url: 'https://localhost:5001/odata/coe/DateTimeValue',
          atomicityGroup: 'string',
          headers: {
            ...headers,
          },
          body: {
            RowId: row.rowId,
            AttributeId: attributeId,
            Value: newValue,
          },
        },
      ];
    } else {
      return [
        {
          id: 'gen_uniq_id',
          method: 'patch',
          url: `https://localhost:5001/odata/coe/DateTimeValue(${attributeId})`,
          atomicityGroup: 'string',
          headers: {
            ...headers,
            'If-Match': unwrapNullable(oldValue?.etag),
          },
          body: {
            Value: newValue,
          },
        },
      ];
    }
  };
