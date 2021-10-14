import { Injectable } from '@angular/core';
import { ColumnAdapterService } from '@core/http/column-adapter/column-adapter.service';
import { mockColumnsDB } from '@core/mock/columns';
import { rows } from '@core/mock/rows';
import { EditColHandler } from '@shared/models/edit-col-handler';
import { ResponseState } from '@shared/models/response-state';
import {
  GridColumn,
  GridColumnDS,
  NewAttrColumn,
  Row,
} from '@shared/models/table';
import { concat, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

type State<T> = ResponseState<ReadonlyArray<T>> | null;

const withLoading = <T>(req: Observable<T>) => {
  const init = { kind: 'loading' } as const;

  const req$ = req.pipe(
    map((data) => ({ kind: 'ok', data } as const)),
    catchError((err) => of({ kind: 'error' } as const)),
  );

  return concat(of(init), req$);
};

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {
  private rows = rows;
  private columnsDB = mockColumnsDB;

  constructor(private readonly columnAdapter: ColumnAdapterService) {}

  getRows() {
    return of(this.rows).pipe(delay(800));
  }

  getColumns() {
    return of(this.columns).pipe(delay(500));
  }

  getColumnsW(): Observable<State<GridColumn>> {
    return withLoading(this.getColumns());
  }

  getRowsW(): Observable<State<Row>> {
    return withLoading(this.getRows());
  }

  /** It would be http post/patch request in a real app */
  editColumn(data: EditColHandler) {
    const accum: ReadonlyArray<GridColumnDS> = [];

    const updColumns: ReadonlyArray<GridColumnDS> = this.columns.reduce(
      (acc, curr) => {
        const updCol =
          curr.alias === data.alias ? { ...curr, ...data.body } : curr;

        return [...acc, updCol];
      },
      accum,
    );

    this.columns = updColumns;

    const req = of(this.columns).pipe(delay(500));

    return withLoading(req);
  }

  createColumn(column: NewAttrColumn) {
    const id = new Date().getTime();
    const newCol = this.columnAdapter.resolveColumnDS({
      ...column,
      attributeId: id,
    });

    this.columns = [...this.columns, newCol];

    const req = of(this.columns).pipe(delay(500));

    return withLoading(req);
  }

  removeColumn(attributeId: number) {
    const accum: ReadonlyArray<GridColumnDS> = [];

    const updColumns: ReadonlyArray<GridColumnDS> = this.columns.reduce(
      (acc, curr) => {
        return curr.kind === 'attributed' && curr.attributeId === attributeId
          ? [...acc]
          : [...acc, curr];
      },
      accum,
    );

    this.columns = updColumns;

    const req = of(this.columns).pipe(delay(500));
    // const req = of(this.columns);

    return withLoading(req);
  }

  /** Resolve JSON from DB to GridColumn objects */
  private get columns(): ReadonlyArray<GridColumn> {
    return this.columnsDB.map((col) => this.columnAdapter.resolveColumn(col));
  }

  private set columns(columns: ReadonlyArray<GridColumnDS>) {
    this.columnsDB = columns.map((col) =>
      this.columnAdapter.resolveColumnDS(col),
    );
  }
}