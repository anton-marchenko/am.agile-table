import { Row } from '@shared/models/row';

export type MakeRequest<I, O> = {
  makeRequest: (row: Row, newValue: I) => O[];
}
