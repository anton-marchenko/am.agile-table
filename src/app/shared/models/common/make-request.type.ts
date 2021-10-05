import { Row } from '@shared/models/row';

export type MakeRequest<I, O> = {
  readonly makeRequest: (row: Row, newValue: I) => ReadonlyArray<O>;
}
