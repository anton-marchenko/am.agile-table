import { Injectable } from '@angular/core';
import { mockColumns } from '@core/mock/columns';
import { rows } from '@core/mock/rows';
import { ResponseState } from '@shared/models/response-state';
import { GridColumn, Row } from '@shared/models/table';
import { concat, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

type State<T> = ResponseState<ReadonlyArray<T>> | null;

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {
  constructor() {}

  getRows() {
    return of(rows).pipe(delay(800));
  }

  getColumns() {
    return of(mockColumns).pipe(delay(500));
  }

  getColumnsW(): Observable<State<GridColumn>> {
    const init = { kind: 'loading' } as const;

    const dd = concat(
      of(init),
      this.getColumns().pipe(map((data) => ({ kind: 'ok', data } as const))),
    );

    return dd;
  }

  getRowsW(): Observable<State<Row>> {
    const init = { kind: 'loading' } as const;

    const dd = concat(
      of(init),
      this.getRows().pipe(map((data) => ({ kind: 'ok', data } as const))),
    );

    return dd;
  }
}
