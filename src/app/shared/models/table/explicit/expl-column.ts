import { ExplicitCells } from '@shared/models/table/explicit/expl-cell';
import { FormValue } from '@shared/models/table/common/form-value.type';
import { ColumnDictionary } from '@shared/models/table/common/column-dictionary';
import { ColumnCfg } from '@shared/models/table/common/column';

type ExplicitKind = {
  readonly kind: 'explicit';
};

type ExplicitAlias<T> = {
  readonly alias: T;
};

export type TypedExplColDS<A extends keyof ExplicitCells> = ExplicitAlias<A> &
  ExplicitKind &
  ColumnCfg;

type Author = TypedExplColDS<'author'> &
  FormValue<string | null> &
  ColumnDictionary<string>;

type Raiting = TypedExplColDS<'rating'> & FormValue<number | null>;

export type ExplColumn = Author | Raiting;

export type ExplColumnDS = TypedExplColDS<'author'> | TypedExplColDS<'rating'>;
