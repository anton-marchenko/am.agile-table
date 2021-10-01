import { AttrRequest } from '@shared/models/attributed/http/attr-request';

type TextReqBase = { Value: string };

export type TextRequest = AttrRequest<TextReqBase>;
