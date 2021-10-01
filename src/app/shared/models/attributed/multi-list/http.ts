import { AttrRequest } from '@shared/models/attributed/http/attr-request';

type MultiListReqBase = { ListItemId: number };

export type MultiListRequest = AttrRequest<MultiListReqBase>;
