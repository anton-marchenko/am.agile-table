type HttpHeaders<T> = { readonly headers: T };
export type BaseHead = {
  readonly 'content-type': string;
  readonly 'odata-version': string;
  readonly Prefer: string;
};
type ETagHead = { readonly 'If-Match': string };

export type NewItemHead = HttpHeaders<BaseHead>;
export type ExistItemHead = HttpHeaders<BaseHead & ETagHead>;
