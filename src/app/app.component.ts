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
import { RowDTO } from '@shared/models/table/common/row-dto';
import { RowBackendService } from '@core/http/fake-backend/row-backend.service';

// FIXME duplicate
type State<T> = ResponseState<ReadonlyArray<T>> | null;

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly showEditForm$ = new BehaviorSubject<boolean>(false);
  readonly columns$ = new BehaviorSubject<State<GridColumn>>({
    kind: 'ok',
    data: [],
  });

  readonly rows$ = new BehaviorSubject<State<Row>>({
    kind: 'ok',
    data: [],
  });

  title = 'agile-table';
  row: Row | null = null;

  constructor(
    private readonly fakeBackend: FakeBackendService,
    private readonly rowBackend: RowBackendService,
  ) {}

  ngOnInit() {
    this.fakeBackend.getColumnsW().subscribe(
      (res) => this.columns$.next(res),
      (err) => this.columns$.next({ kind: 'error', error: 'Oooops' }),
    );

    this.rowBackend.getRows().subscribe(
      (res) => this.rows$.next(res),
      (err) => this.rows$.next({ kind: 'error', error: 'Oooops' }),
    );
  }

  onCloseRowForm() {
    this.showEditForm$.next(false);
    this.row = null;
  }

  // TODO - how to refactor?
  onEditRow(event: { row: Row }) {
    this.row = event.row;

    this.showEditForm$.next(true);
  }

  onCreateNewRow() {
    this.showEditForm$.next(true);
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

  onSaveRow({ row, processing$ }: { row: RowDTO; processing$: ProcessSubj }) {
    if (row.rowId === null) {
      this.rowBackend.createRow(row).subscribe((state) => {
        processing$.next(responseStateToProc(state));

        console.log(state);

        if (state.kind === 'ok') {
          this.rows$.next(state);
        }
      });
    } else {
      this.rowBackend.updateRow(row.rowId, row);
    }
  }
}
