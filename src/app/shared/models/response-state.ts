export type ResponseState<T> =
  | { readonly kind: 'error'; readonly error?: string }
  | { readonly kind: 'loading' }
  | { readonly kind: 'ok'; readonly data: T };
