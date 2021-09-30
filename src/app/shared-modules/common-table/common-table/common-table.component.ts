import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PredefinedAttr } from '@shared/models/predefined-attr';
import { mockColumns } from '@core/mock/columns';
import { rows } from '@core/mock/rows';
import {
  GridColumn,
  MultiListColumn,
  SortDirection,
  SortFn,
} from '@shared/models/grid';
import { Nullish } from '@shared/models/nullish';
import { Row } from '@shared/models/row';
import {
  getDateValue,
  getMultiListValue,
  getTextValue,
} from '@shared/models/cell.utils';
import { resAttrSortField } from '@shared/utils/sort.utils';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { BehaviorSubject } from 'rxjs';
import { MultiListVal } from '@shared/models/cell-value';

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

  constructor() {}

  ngOnInit(): void {}

  getMForm(col: MultiListColumn, row: Row) {
    const res = row.attributed.multiList[col.attributeId];

    return res ? col.formValueFn(res.value) : null;
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

  edit(row: Row) {

    console.log('edit row', row);
  }

  editCell() {
    console.log('edit cell');
  }

  resolveDictionary(dict: { id: number; name: string }[], id: Nullish<number>) {
    return dict.find((el) => el.id === id);
  }
}
