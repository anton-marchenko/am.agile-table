import { GridColumn, Row, sortAuthor, sortId } from '@shared/models/table';
import { ColumnDictionary } from '@shared/models/table/common/column-dictionary';
import {
  ExplColumnDS,
  TypedExplColDS,
} from '@shared/models/table/explicit/expl-column';

type UsersDictionary = ColumnDictionary<string>['dictionary$'];

export const resolveExplColAuthor =
  (dictionary$: UsersDictionary) =>
  (ds: TypedExplColDS<'author'>): GridColumn => ({
    ...ds,
    kind: 'explicit',
    alias: 'author',
    sortFn: sortAuthor,
    resolveFormValue: (r: Row) => r.explicit.author.id || null,
    dictionary$,
  });

export const resolveExplColRaiting = (
  ds: TypedExplColDS<'rating'>,
): GridColumn => ({
  ...ds,
  kind: 'explicit',
  alias: 'rating',
  sortFn: sortId,
  resolveFormValue: (r: Row) => r.explicit.rating || null,
});

export const resolveExplColDS = (column: ExplColumnDS): ExplColumnDS => ({
  kind: 'explicit',
  alias: column.alias,
  name: column.name,
  sortable: column.sortable,
  width: column.width,
});
