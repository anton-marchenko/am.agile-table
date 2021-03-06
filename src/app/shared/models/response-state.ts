export type ResponseState<T> =
  | { readonly kind: 'error'; readonly error?: string }
  | { readonly kind: 'loading' }
  | { readonly kind: 'ok'; readonly data: T };

/**
 * TODO: Make me a good name!
 * (naming things is too hard :( )
 */
export type State<T> = ResponseState<ReadonlyArray<T>> | null;

export type StateWithWarn<T> =
  | { readonly kind: 'warning'; readonly message: string }
  | { readonly kind: 'ok'; readonly data: ReadonlyArray<T> };
