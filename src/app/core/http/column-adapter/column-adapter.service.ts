import { Injectable } from '@angular/core';
import { Dictionary } from '@shared/models/dictionary';
import { ResponseState } from '@shared/models/response-state';
import {
  GridColumn,
  GridColumnDS,
} from '@shared/models/table';
import {
  resolveDateColumn,
  resolveDateColumnDS,
} from '@shared/models/table/attributed/type/date/column.utils';
import {
  resolveMultiListColumn,
  resolveMultiListColumnDS,
} from '@shared/models/table/attributed/type/multi-list/column.utils';
import {
  resolveTextColumn,
  resolveTextColumnDS,
} from '@shared/models/table/attributed/type/text/column.utils';
import {
  resolveExplColAuthor,
  resolveExplColDS,
  resolveExplColRaiting,
} from '@shared/models/table/explicit/expl-column.utils';
import { concat, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const q1: Observable<ResponseState<Dictionary<number>>> = of({
  kind: 'loading',
});
const q2: Observable<ResponseState<Dictionary<number>>> = of({
  kind: 'ok',
  data: [
    { id: 1, name: 'tag1' },
    { id: 2, name: 'tag2' },
    { id: 3, name: 'tag3' },
    { id: 4, name: 'tag4' },
  ],
} as ResponseState<Dictionary<number>>).pipe(delay(1_000));

const tags$: Observable<ResponseState<Dictionary<number>>> = concat(q1, q2);

const dictionaries = [tags$, tags$, tags$] as const;

const u1: Observable<ResponseState<Dictionary<string>>> = of({
  kind: 'loading',
});
const u2: Observable<ResponseState<Dictionary<string>>> = of({
  kind: 'ok',
  data: [
    { id: '1x', name: 'Ant' },
    { id: '2x', name: 'Lex' },
    { id: '3x', name: 'User3' },
  ],
} as ResponseState<Dictionary<string>>).pipe(delay(1_000));

const users$: Observable<ResponseState<Dictionary<string>>> = concat(u1, u2);

@Injectable({
  providedIn: 'root',
})
export class ColumnAdapterService {
  constructor() {}

  resolveColumn(ds: GridColumnDS): GridColumn {
    if (ds.kind === 'attributed') {
      switch (ds.cellType) {
        case 'text':
          return resolveTextColumn(ds);
        case 'date':
          return resolveDateColumn(ds);
        case 'multiList': {
          const dict = dictionaries[ds.listId];

          return resolveMultiListColumn(dict)(ds);
        }
      }
    } else {
      switch (ds.alias) {
        case 'rating':
          return resolveExplColRaiting(ds);
        case 'author': {
          return resolveExplColAuthor(users$)(ds);
        }
      }
    }
  }

  resolveColumnDS(column: GridColumnDS): GridColumnDS {
    if (column.kind === 'attributed') {
      switch (column.cellType) {
        case 'text':
          return resolveTextColumnDS(column);
        case 'date':
          return resolveDateColumnDS(column);
        case 'multiList': {
          return resolveMultiListColumnDS(column);
        }
      }
    } else {
      return resolveExplColDS(column);
    }
  }
}
