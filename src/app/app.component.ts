import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GridColumn, NewAttrColumn } from '@shared/models/table';
import { ResponseState } from '@shared/models/response-state';
import { Row } from '@shared/models/table';
import { BehaviorSubject } from 'rxjs';
import { FakeBackendService } from '@core/http/fake-backend/fake-backend.service';
import { ProcessSubj } from '@shared/models/processing-state';
import { responseStateToProc } from '@shared/utils/processing-state.utils';
import { EditColHandler } from '@shared/models/edit-col-handler';

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
  }

  // TODO - how to refactor?
  onEditRow(event: { row: Row; columns: ReadonlyArray<GridColumn> }) {
    this.form = this.createForm(event.row, event.columns);
    this.row = event.row;
    this.columns = event.columns;
  }

  onCreateColumn({
    column,
    processing$,
  }: {
    column: NewAttrColumn;
    processing$: ProcessSubj;
  }) {
    this.fakeBackend.createColumn(column).subscribe((state) => {
      processing$.next(responseStateToProc(state));

      if (state.kind === 'ok') {
        this.columns$.next(state);
      }
    });
  }

  onEditColumn({
    processing$,
    data,
  }: {
    processing$: ProcessSubj;
    data: EditColHandler;
  }) {
    this.fakeBackend.editColumn(data).subscribe((state) => {
      processing$.next(responseStateToProc(state));

      if (state.kind === 'ok') {
        this.columns$.next(state);
      }
    });
  }

  onRemoveColumn({
    attributeId,
    processing$,
  }: {
    attributeId: number;
    processing$: ProcessSubj;
  }) {
    this.fakeBackend.removeColumn(attributeId).subscribe((state) => {
      processing$.next(responseStateToProc(state));

      if (state.kind === 'ok') {
        this.columns$.next(state);
      }
    });
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
