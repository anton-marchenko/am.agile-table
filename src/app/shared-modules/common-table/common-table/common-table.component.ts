import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { PredefinedAttr, resAttrSortField } from '@shared/models/attributed';
import { mockColumns } from '@core/mock/columns';
import { rows } from '@core/mock/rows';
import { Nullish } from '@shared/models/common/nullish';
import { Row } from '@shared/models/row';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { BehaviorSubject, of } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { SortDirection, SortFn } from '@shared/models/common/sort-column.type';
import { GridColumn, isExplicitCol } from '@shared/models/column';
import { isAttributedCol } from '@shared/models/column/column.utils';
import { getTextValue } from '@shared/models/attributed/text/cell.utils';
import { getDateValue } from '@shared/models/attributed/date/cell.utils';
import { getMultiListValue } from '@shared/models/attributed/multi-list/cell.utils';
import { getQueryExpand } from '@shared/models/http.utils';

type Dictionary = {
  id: number;
  name: string;
};

export type ResponseState<T> =
  | { kind: 'error'; error?: string }
  | { kind: 'loading' }
  | { kind: 'ok'; data: T };

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonTableComponent implements OnInit {
  readonly mockColumns = mockColumns;
  readonly rows = rows;
  readonly sortDescriptor = new Map<string, string>();
  readonly PredefinedAttr = PredefinedAttr;
  readonly getTextValue = getTextValue;
  readonly getDateValue = getDateValue;
  readonly getMultiListValue = getMultiListValue;
  readonly resAttrSortField = resAttrSortField;
  readonly tags$ = new BehaviorSubject<ResponseState<Dictionary[]>>({
    kind: 'loading',
  });

  @Output() editRow = new EventEmitter<{ row: Row, columns: GridColumn[] }>();

  constructor() {}

  ngOnInit(): void {
    console.log(
      '$expand=',
      getQueryExpand(this.mockColumns.filter(isAttributedCol)),
    );

    of([
      { id: 1, name: 'tag1' },
      { id: 2, name: 'tag2' },
    ])
      .pipe(
        tap(() => this.tags$.next({ kind: 'loading' })),
        delay(1_000),
        take(1),
      )
      .subscribe(
        (res) => this.tags$.next({ kind: 'ok', data: res }),
        (err) => this.tags$.next({ kind: 'error', error: 'Oooops' }),
      );
  }

  onSortChanges(
    event: { dir: SortDirection },
    field: string,
    sortFn: Nullish<SortFn>,
  ) {
    if (event.dir !== null) {
      const fn = unwrapNullable(sortFn);

      this.sortDescriptor.set(field, fn(field, event.dir));
    } else {
      this.sortDescriptor.delete(field);
    }

    console.log(
      '!!!sort ',
      Array.from(this.sortDescriptor)
        .map(([k, v]) => v)
        .join(' AND '),
    );
  }

  onEditRow(row: Row) {
    this.editRow.emit({ row, columns: mockColumns });
  }

  editCell(col: GridColumn, row: Row) {
    console.log('edit cell', col.resolveFormValue(row));
  }

  resolveDictionary(dict: { id: number; name: string }[], id: Nullish<number>) {
    return dict.find((el) => el.id === id);
  }
}
