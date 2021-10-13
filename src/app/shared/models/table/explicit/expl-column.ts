import { ExplicitCells } from '@shared/models/table/explicit/expl-cell';
import { FormValue } from '@shared/models/table/common/form-value.type';
import { ColumnDictionary } from '@shared/models/table/common/column-dictionary';
import { ColumnCfg } from '@shared/models/table/common/column';

type ExplicitKind = {
  readonly kind: 'explicit';
};

type Alias<T> = {
  readonly alias: T;
};

type TypedExplCol<A extends keyof ExplicitCells> = ColumnCfg &
  ExplicitKind &
  Alias<A>;

export type TypedExplColDS<A extends keyof ExplicitCells> = ColumnCfg &
  ExplicitKind &
  Alias<A>;

type Author = TypedExplCol<'author'> &
  FormValue<string | null> &
  ColumnDictionary<string>;

type Raiting = TypedExplCol<'rating'> & FormValue<number | null>;

export type ExplColumn = Author | Raiting;

export type ExplColumnDS = TypedExplColDS<'author'> | TypedExplColDS<'rating'>;
