import { Row } from '@shared/models/table';

export type MakeRequest<I, O> = {
  readonly makeRequest: (row: Row, newValue: I) => ReadonlyArray<O>;
};
