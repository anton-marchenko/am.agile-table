import { AttrRequest } from '@shared/models/attributed/http/attr-request';

type TextReqBase = { readonly Value: string };

export type TextRequest = AttrRequest<TextReqBase>;
