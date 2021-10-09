import { ExplicitCells } from '@shared/models/table/explicit/expl-cell';
import { FormValue } from '@shared/models/table/common/form-value.type';
import { ColumnDictionary } from '@shared/models/table/common/column-dictionary';

type TypedExplCol<A extends keyof ExplicitCells> = {
  readonly name: string;
  readonly kind: 'explicit';
  readonly alias: A;
};

export type ExplColumn =
  | (TypedExplCol<'author'> &
      FormValue<string | null> &
      ColumnDictionary<string>)
  | (TypedExplCol<'rating'> & FormValue<number | null>);
