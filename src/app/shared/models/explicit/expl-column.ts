import { ExplicitCells } from '@shared/models/explicit/expl-cell';
import { FormValue } from '@shared/models/common/form-value.type';

// common?
type TypedExplCol<A extends keyof ExplicitCells> = {
  name: string;
  kind: 'explicit';
  alias: A;
};

export type ExplColumn =
  | (TypedExplCol<'owner'> & FormValue<string | null>)
  | (TypedExplCol<'rating'> & FormValue<number | null>);
