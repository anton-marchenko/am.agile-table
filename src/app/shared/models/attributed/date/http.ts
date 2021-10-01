import { AttrRequest } from '@shared/models/attributed/http/attr-request';

type DateReqBase = { Value: string };

export type DateRequest = AttrRequest<DateReqBase>;
