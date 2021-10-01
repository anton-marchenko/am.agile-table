import { Row } from '@shared/models/row';

export type FormValue<F> = {
  resolveFormValue: (row: Row) => F;
};
