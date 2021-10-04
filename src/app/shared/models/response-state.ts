export type ResponseState<T> =
  | { kind: 'error'; error?: string }
  | { kind: 'loading' }
  | { kind: 'ok'; data: T };
