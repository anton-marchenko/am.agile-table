import { Injectable } from '@angular/core';
import { attrDictionaries, users$ } from '@core/mock/dictionaries';
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
          const dict = attrDictionaries[ds.listId];

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

  /**
   * TODO - refactor
   * use col structure:
   * {
   *  data: {
   *    alias,
   *    width,
   *    ...
   *  },
   *  makeRequest: fn,
   *  resolver1: fn1,
   *  resolver2: fn2,
   * }
   */
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
