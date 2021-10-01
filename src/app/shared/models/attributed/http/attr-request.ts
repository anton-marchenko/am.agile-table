import {
  ExistItemHead,
  NewItemHead,
} from '@shared/models/attributed/http/headers';

type CellData = {
  RowId: number;
  AttributeId: number;
};

type CreateReq<T> = CellData & T;

type Method<T extends 'patch' | 'post' | 'delete'> = { method: T };
type Body<T> = { body: T };
type Identity = { id: string; url: string; atomicityGroup: string };

export type AttrRequest<T> =
  | (Method<'post'> & NewItemHead & Identity & Body<CreateReq<T>>)
  | (Method<'patch'> & ExistItemHead & Identity & Body<T>)
  | (Method<'delete'> & ExistItemHead & Identity);
