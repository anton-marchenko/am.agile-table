import { AttrRequest } from '@shared/models/table/attributed/http/attr-request';

type DateReqBase = { readonly Value: string };

export type DateRequest = AttrRequest<DateReqBase>;
