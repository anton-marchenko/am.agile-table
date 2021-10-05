import { ExplicitCells } from '@shared/models/explicit/expl-cell';
import { FormValue } from '@shared/models/common/form-value.type';
import { ColumnDictionary } from '@shared/models/column-dictionary';

// FIXME duplicate with src\app\shared\models\http.utils.ts
type TypedExplCol<A extends keyof ExplicitCells> = {
  readonly name: string;
  readonly kind: 'explicit';
  readonly alias: A;
};

export type ExplColumn =
  | (TypedExplCol<'owner'> &
      FormValue<string | null> &
      ColumnDictionary<string>)
  | (TypedExplCol<'rating'> & FormValue<number | null>);
