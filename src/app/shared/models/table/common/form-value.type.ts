import { Row } from '@shared/models/table';

export type FormValue<F> = {
  readonly resolveFormValue: (row: Row) => F;
};
