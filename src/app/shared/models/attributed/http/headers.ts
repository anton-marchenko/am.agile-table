type HttpHeaders<T> = { headers: T };
type BaseHead = {
  'content-type': string;
  'odata-version': string;
  Prefer: string;
};
type ETagHead = { 'If-Match': string };

export type NewItemHead = HttpHeaders<BaseHead>;
export type ExistItemHead = HttpHeaders<BaseHead & ETagHead>;
