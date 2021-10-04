import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { PredefinedAttr, resAttrSortField } from '@shared/models/attributed';
import { Nullish } from '@shared/models/common/nullish';
import { Row } from '@shared/models/row';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { BehaviorSubject} from 'rxjs';
import { SortDirection, SortFn } from '@shared/models/common/sort-column.type';
import { GridColumn } from '@shared/models/column';
import { getTextValue } from '@shared/models/attributed/text/cell.utils';
import { getDateValue } from '@shared/models/attributed/date/cell.utils';
import { getMultiListValue } from '@shared/models/attributed/multi-list/cell.utils';
import { ResponseState } from '@shared/models/response-state';
import { DictionaryItem } from '@shared/models/dictionary';

type ColState = ResponseState<GridColumn[]> | null;

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonTableComponent implements OnInit {
  @Input() set columnsState(state: ResponseState<GridColumn[]> | null) {
    this.columnsState$.next(state);
  }

  @Input() set rowsState(state: ResponseState<Row[]> | null) {
    this.rowsState$.next(state);
  }

  @Input() columnsState$ = new BehaviorSubject<ColState>({ kind: 'loading' });
  @Input() rowsState$ = new BehaviorSubject<ResponseState<Row[]> | null>({
    kind: 'loading',
  });

  // readonly rows = rows;
  readonly sortDescriptor = new Map<string, string>();
  readonly PredefinedAttr = PredefinedAttr;
  readonly getTextValue = getTextValue;
  readonly getDateValue = getDateValue;
  readonly getMultiListValue = getMultiListValue;
  readonly resAttrSortField = resAttrSortField;

  @Output() editRow = new EventEmitter<{ row: Row; columns: GridColumn[] }>();

  constructor() {}

  ngOnInit(): void {}

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

  onEditRow(row: Row, columns: GridColumn[]) {
    this.editRow.emit({ row, columns });
  }

  editCell(col: GridColumn, row: Row) {
    console.log('edit cell', col.resolveFormValue(row));
  }

  resolveDictionary(dict: DictionaryItem<number>[], id: Nullish<number>) {
    return dict.find((el) => el.id === id);
  }
}
