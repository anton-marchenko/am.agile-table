import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { EditColHandler } from '@shared/models/edit-col-handler';
import { ProcessingState, ProcessSubj } from '@shared/models/processing-state';
import { ResponseState } from '@shared/models/response-state';
import {
  GridColumn,
  AttrColumn,
  isPredefinedAttr,
  NewAttrColumn,
} from '@shared/models/table';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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

/** duplicate with col-form */
type Proc = { processing$: ProcessSubj };
type CreateCol = Proc & { column: NewAttrColumn };
type RemoveCol = Proc & { attributeId: number };

type EditColData = {
  data: EditColHandler;
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

  @Output() createColumn = new EventEmitter<CreateCol>();
  @Output() removeColumn = new EventEmitter<RemoveCol>();
  @Output() editColumn = new EventEmitter<Proc & EditColData>();

  readonly creatingState$ = new BehaviorSubject<ProcessingState>(null);

  private readonly _columnsState$ = new BehaviorSubject<ColState>({
    kind: 'ok',
    data: [],
  });
  readonly columnsState$ = this._columnsState$
    .asObservable()
    .pipe(map(resStateWithWarn('No columns data')));

  constructor() {}

  ngOnInit(): void {}

  onAddTextColumn() {
    this.createColumn.emit({
      processing$: this.creatingState$,
      column: {
        name: 'New Column',
        cellType: 'text',
        kind: 'attributed',
      },
    });
  }

  onAddDateColumn() {
    this.createColumn.emit({
      processing$: this.creatingState$,
      column: {
        name: 'New Date Column',
        cellType: 'date',
        kind: 'attributed',
      },
    });
  }

  onEditColumn(event: { processing$: ProcessSubj; data: EditColHandler }) {
    this.editColumn.emit(event);
  }

  onRemoveColumn(
    {
      processing$,
    }: {
      processing$: ProcessSubj;
    },
    attributeId: number,
  ) {
    this.removeColumn.emit({ attributeId, processing$ });
  }

  canRemove(col: AttrColumn) {
    return !isPredefinedAttr(col.attributeId);
  }
}
