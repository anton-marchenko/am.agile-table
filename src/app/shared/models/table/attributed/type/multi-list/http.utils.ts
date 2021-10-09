import { headers } from '@shared/models/table/attributed/http/http-header.utils';
import { MultiListRequest } from '@shared/models/table/attributed/type/multi-list/http';
import { Row } from '@shared/models/table';

export const getMultiListRequests =
  (attributeId: number) =>
  (
    row: Row,
    newValue: ReadonlyArray<number>,
  ): ReadonlyArray<MultiListRequest> => {
    const oldValue = row.attributed.multiList[attributeId]?.value;
    const isNew = !oldValue || !oldValue.length;

    return newValue.map((id) => ({
      id: 'gen_uniq_id',
      method: 'post',
      url: 'https://localhost:5001/odata/coe/MultiList',
      atomicityGroup: 'string',
      headers: {
        ...headers,
      },
      body: {
        AttributeId: attributeId,
        RowId: row.rowId,
        ListItemId: id,
      },
    }));
  };
