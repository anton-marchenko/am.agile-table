import { BaseHead } from '@shared/models/attributed/http/headers';

export const headers: BaseHead = {
  'content-type':
    'application/json; odata.metadata=minimal; odata.streaming=true',
  'odata-version': '4.0',
  Prefer: 'return=representation',
};
