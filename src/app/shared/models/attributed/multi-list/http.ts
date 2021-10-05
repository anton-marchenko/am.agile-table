import { AttrRequest } from '@shared/models/attributed/http/attr-request';

type MultiListReqBase = { readonly ListItemId: number };

export type MultiListRequest = AttrRequest<MultiListReqBase>;
