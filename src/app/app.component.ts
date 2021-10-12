import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GridColumn } from '@shared/models/table';
import { ResponseState } from '@shared/models/response-state';
import { Row } from '@shared/models/table';
import { BehaviorSubject, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { FakeBackendService } from '@core/http/fake-backend/fake-backend.service';

// FIXME duplicate
type ColumnsChangeEvent = {
  columns: ReadonlyArray<GridColumn>;
};

// FIXME duplicate
type State<T> = ResponseState<ReadonlyArray<T>> | null;

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly columns$ = new BehaviorSubject<State<GridColumn>>({
    kind: 'ok',
    data: [],
  });

  readonly rows$ = new BehaviorSubject<State<Row>>({
    kind: 'ok',
    data: [],
  });

  title = 'agile-table';
  form: FormGroup | null = null;
  row: Row | null = null;
  columns: ReadonlyArray<GridColumn> | null = null;

  constructor(private readonly fakeBackend: FakeBackendService) {}

  ngOnInit() {
    this.fakeBackend.getColumnsW().subscribe(
      (res) => this.columns$.next(res),
      (err) => this.columns$.next({ kind: 'error', error: 'Oooops' }),
    );

    this.fakeBackend.getRowsW().subscribe(
      (res) => this.rows$.next(res),
      (err) => this.rows$.next({ kind: 'error', error: 'Oooops' }),
    );

    // of(mockColumns)
    //   .pipe(
    //     tap(() => this.columns$.next({ kind: 'loading' })),
    //     delay(500),
    //     take(1),
    //   )
    //   .subscribe(
    //     (res) => this.columns$.next({ kind: 'ok', data: res }),
    //     (err) => this.columns$.next({ kind: 'error', error: 'Oooops' }),
    //   );

    // of(rows)
    //   .pipe(
    //     tap(() => this.rows$.next({ kind: 'loading' })),
    //     delay(900),
    //     take(1),
    //   )
    //   .subscribe(
    //     (res) => this.rows$.next({ kind: 'ok', data: res }),
    //     (err) => this.rows$.next({ kind: 'error', error: 'Oooops' }),
    //   );
  }

  // TODO - how to refactor?
  onEditRow(event: { row: Row; columns: ReadonlyArray<GridColumn> }) {
    this.form = this.createForm(event.row, event.columns);
    this.row = event.row;
    this.columns = event.columns;
  }

  onColumnsChange({ columns }: ColumnsChangeEvent) {
    this.columns$.next({ kind: 'ok', data: columns });
  }

  private createForm(row: Row, columns: ReadonlyArray<GridColumn>) {
    const cfg = columns.reduce(
      (acc, col) => {
        return {
          ...acc,
          [col.alias]: new FormControl(col.resolveFormValue(row)),
        };
      },
      { rowId: new FormControl(row.rowId) },
    );

    return new FormGroup(cfg);
  }
}
