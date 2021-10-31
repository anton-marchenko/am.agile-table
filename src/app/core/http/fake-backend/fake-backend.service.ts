import { Injectable } from '@angular/core';
import { ColumnAdapterService } from '@core/http/fake-backend/column-adapter/column-adapter.service';
import { mockColumnsDB } from '@core/http/fake-backend/mock/columns';
import { EditColHandler } from '@shared/models/edit-col-handler';
import { State } from '@shared/models/response-state';
import {
  GridColumn,
  GridColumnDS,
  NewAttrColumn,
} from '@shared/models/table';
import { withLoading } from '@shared/utils';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {
  private columnsDB = mockColumnsDB;

  constructor(private readonly columnAdapter: ColumnAdapterService) {}

  getColumns() {
    return of(this.columns).pipe(delay(500));
  }

  getColumnsW(): Observable<State<GridColumn>> {
    return withLoading(this.getColumns());
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
