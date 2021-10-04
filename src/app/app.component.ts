import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { mockColumns } from '@core/mock/columns';
import { rows } from '@core/mock/rows';
import { GridColumn } from '@shared/models/column';
import { ResponseState } from '@shared/models/response-state';
import { Row } from '@shared/models/row';
import { BehaviorSubject, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly columns$ = new BehaviorSubject<ResponseState<GridColumn[]>>(
    {
      kind: 'loading',
    },
  );

  readonly rows$ = new BehaviorSubject<ResponseState<Row[]>>(
    {
      kind: 'loading',
    },
  );

  title = 'agile-table';
  form: FormGroup | null = null;
  row: Row | null = null;

  ngOnInit() {
    of(mockColumns)
      .pipe(
        tap(() => this.columns$.next({ kind: 'loading' })),
        delay(1_000),
        take(1),
      )
      .subscribe(
        (res) => this.columns$.next({ kind: 'ok', data: res }),
        (err) => this.columns$.next({ kind: 'error', error: 'Oooops' }),
      );

      of(rows)
      .pipe(
        tap(() => this.rows$.next({ kind: 'loading' })),
        delay(2_000),
        take(1),
      )
      .subscribe(
        (res) => this.rows$.next({ kind: 'ok', data: res }),
        (err) => this.rows$.next({ kind: 'error', error: 'Oooops' }),
      );
  }

  // TODO - how to refactor?
  onEditRow(event: { row: Row; columns: GridColumn[] }) {
    this.form = this.createForm(event.row, event.columns);
    this.row = event.row;
  }

  private createForm(row: Row, columns: GridColumn[]) {
    const cfg = columns.reduce((acc, col) => {
      return {
        ...acc,
        [col.alias]: new FormControl(col.resolveFormValue(row)),
      };
    }, {});

    return new FormGroup(cfg);
  }
}
