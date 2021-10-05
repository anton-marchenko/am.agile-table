import { Row } from '@shared/models/row';

export type FormValue<F> = {
  readonly resolveFormValue: (row: Row) => F;
};
