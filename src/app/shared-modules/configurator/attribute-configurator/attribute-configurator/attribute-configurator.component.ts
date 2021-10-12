import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Nullish } from '@shared/models/nullish';
import { ResponseState } from '@shared/models/response-state';
import {
  GridColumn,
  createTextColumn,
  createDateColumn,
  AttrColumn,
  isPredefinedAttr,
} from '@shared/models/table';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

type ColChangeEvent = {
  columns: ReadonlyArray<GridColumn>;
};

// FIXME Duplicate with ColumnFormComponent
type Out = {
  // sender: ColumnFormComponent;
  data: {
    alias: Nullish<string>;
    title: Nullish<string>;
    width: Nullish<number>;
    sortable: Nullish<boolean>;
  };
};
type Out2 = Pick<GridColumn, 'width' | 'name' | 'sortable'>;

const normalizeOut = (data: Out['data']): Out2 => ({
  name: data.title || '',
  width: data.width,
  sortable: data.sortable,
});

type State<T> = ResponseState<ReadonlyArray<T>> | null;
type ColState = State<GridColumn>;

type StateWithWarn<T> =
  | { readonly kind: 'warning'; readonly message: string }
  | { readonly kind: 'ok'; readonly data: ReadonlyArray<T> };

// FIXME - duplicate with src\app\shared-modules\common-table\common-table\common-table.component.ts
const resStateWithWarn =
  (noDataMsg: string = 'No data') =>
  <T>(state: State<T>): StateWithWarn<T> => {
    const getMsg = (message: string): StateWithWarn<T> => ({
      kind: 'warning',
      message,
    });

    if (!state) {
      return getMsg(noDataMsg);
    }

    if (state.kind === 'error') {
      return getMsg('Error');
    }

    if (state.kind === 'loading') {
      return getMsg('Loading...');
    }

    if (state.kind === 'ok' && state.data.length === 0) {
      return getMsg(noDataMsg);
    }

    return state;
  };

@Component({
  selector: 'am-attribute-configurator',
  templateUrl: './attribute-configurator.component.html',
  styleUrls: ['./attribute-configurator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributeConfiguratorComponent implements OnInit {
  @Input() set columnsState(state: ColState) {
    this._columnsState$.next(state);
  }

  @Output() columnsChange = new EventEmitter<ColChangeEvent>();

  private readonly _columnsState$ = new BehaviorSubject<ColState>({
    kind: 'ok',
    data: [],
  });
  readonly columnsState$ = this._columnsState$
    .asObservable()
    .pipe(map(resStateWithWarn('No columns data')));

  constructor() {}

  ngOnInit(): void {}

  onAddTextColumn(oldColumns: ReadonlyArray<GridColumn>) {
    this.columnsChange.emit({
      columns: this.createColumn(createTextColumn, oldColumns),
    });
  }

  onAddDateColumn(oldColumns: ReadonlyArray<GridColumn>) {
    this.columnsChange.emit({
      columns: this.createColumn(createDateColumn, oldColumns),
    });
  }

  onValueChanges({ data }: Out, oldColumns: ReadonlyArray<GridColumn>) {
    const accum: ReadonlyArray<GridColumn> = [];

    const columns: ReadonlyArray<GridColumn> = oldColumns.reduce(
      (acc, curr) => {
        const current =
          curr.alias === data.alias ? { ...curr, ...normalizeOut(data) } : curr;

        return [...acc, current];
      },
      accum,
    );

    this.columnsChange.emit({ columns });
  }

  onRemoveColumn(
    { alias }: { alias: string },
    oldColumns: ReadonlyArray<GridColumn>,
  ) {
    const accum: ReadonlyArray<GridColumn> = [];

    const columns: ReadonlyArray<GridColumn> = oldColumns.reduce(
      (acc, curr) => {
        return curr.alias === alias ? [...acc] : [...acc, curr];
      },
      accum,
    );

    // FIXME - fix warning related to form debounceTime(300)
    setTimeout(() => {
      this.columnsChange.emit({ columns });
    }, 0);
  }

  canRemove(col: AttrColumn) {
    return !isPredefinedAttr(col.attributeId);
  }

  // TODO: Move it to service
  private createColumn(
    createFn: (id: number) => GridColumn,
    oldColumns: ReadonlyArray<GridColumn>,
  ) {
    const newCol: GridColumn = createFn(new Date().getTime());
    const columns = [...oldColumns, newCol];

    return columns;
  }
}
