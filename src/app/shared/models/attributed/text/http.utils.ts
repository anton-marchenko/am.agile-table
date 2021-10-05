import { headers } from '@shared/models/attributed/http/http-header.utils';
import { TextRequest } from '@shared/models/attributed/text/http';
import { Row } from '@shared/models/row';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

export const getTextRequests =
  (attributeId: number) =>
  (row: Row, newValue: string): ReadonlyArray<TextRequest> => {
    const oldValue = row.attributed.text[attributeId]?.value;
    const isNew = !oldValue;

    if (isNew) {
      return [
        {
          id: 'gen_uniq_id',
          method: 'post',
          url: 'https://localhost:5001/odata/coe/TextValue',
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
      const prevValue = unwrapNullable(oldValue);

      return [
        {
          id: 'gen_uniq_id',
          method: 'patch',
          url: `https://localhost:5001/odata/coe/TextValue(${prevValue.id})`,
          atomicityGroup: 'string',
          headers: {
            ...headers,
            'If-Match': prevValue.etag,
          },
          body: {
            Value: newValue,
          },
        },
      ];
    }
  };
