import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Nullish } from '@shared/models/nullish';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { State } from '@shared/models/response-state';
import { Dictionary } from '@shared/models/dictionary';

import {
  Row,
  SortDirection,
  SortFn,
  GridColumn,
  PredefinedAttr,
  resAttrSortField,
  getMultiListValue,
  getDateValue,
  getTextValue,
} from '@shared/models/table';
import { trackByFn } from '@shared/utils/track-by.utils';
import { resolveStateWithWarn } from '@shared/utils';

type ColState = State<GridColumn>;
type RowState = State<Row>;

@Component({
  selector: 'am-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonTableComponent implements OnInit {
  @Input() set columnsState(state: ColState) {
    this._columnsState$.next(state);
  }

  @Input() set rowsState(state: RowState) {
    this._rowsState$.next(state);
  }

  private readonly _columnsState$ = new BehaviorSubject<ColState>({
    kind: 'ok',
    data: [],
  });
  readonly columnsState$ = this._columnsState$
    .asObservable()
    .pipe(map(resolveStateWithWarn('No columns data')));

  private readonly _rowsState$ = new BehaviorSubject<RowState>({
    kind: 'ok',
    data: [],
  });
  readonly rowsState$ = this._rowsState$
    .asObservable()
    .pipe(map(resolveStateWithWarn('No rows data')));

  // FIXME - use WeakMap
  readonly sortDescriptor = new Map<string, string>();
  readonly PredefinedAttr = PredefinedAttr;
  readonly getTextValue = getTextValue;
  readonly getDateValue = getDateValue;
  readonly getMultiListValue = getMultiListValue;
  readonly resAttrSortField = resAttrSortField;
  readonly trackByFn = trackByFn;

  @Output() editRow = new EventEmitter<{ row: Row }>();
  @Output() sort = new EventEmitter<{ descriptors: ReadonlyArray<string> }>();

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

    this.sort.emit({
      descriptors: Array.from(this.sortDescriptor).map(([k, v]) => v),
    });
  }

  onEditRow(row: Row) {
    this.editRow.emit({ row });
  }

  editCell(col: GridColumn, row: Row) {
    console.log('edit cell', col.resolveFormValue(row));
  }

  resolveDictionary(dict: Dictionary<number>, id: Nullish<number>) {
    return dict.find((el) => el.id === id);
  }

  getColumnsQty(columns: ReadonlyArray<GridColumn>) {
    const staticColumnsQty = 1; // Action column

    return columns.length + staticColumnsQty;
  }
}
