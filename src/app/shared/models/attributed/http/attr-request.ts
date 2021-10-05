import {
  ExistItemHead,
  NewItemHead,
} from '@shared/models/attributed/http/headers';

type CellData = {
  readonly RowId: number;
  readonly AttributeId: number;
};

type CreateReq<T> = CellData & T;

type Method<T extends 'patch' | 'post' | 'delete'> = { readonly method: T };
type Body<T> = { readonly body: T };
type Identity = {
  readonly id: string;
  readonly url: string;
  readonly atomicityGroup: string;
};

export type AttrRequest<T> =
  | (Method<'post'> & NewItemHead & Identity & Body<CreateReq<T>>)
  | (Method<'patch'> & ExistItemHead & Identity & Body<T>)
  | (Method<'delete'> & ExistItemHead & Identity);
