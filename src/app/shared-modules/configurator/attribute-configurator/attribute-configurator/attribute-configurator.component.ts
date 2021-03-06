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
import { State } from '@shared/models/response-state';
import {
  GridColumn,
  AttrColumn,
  isPredefinedAttr,
  NewAttrColumn,
} from '@shared/models/table';
import { resolveStateWithWarn } from '@shared/utils';
import { trackByFn } from '@shared/utils/track-by.utils';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

type ColState = State<GridColumn>;

/** FIXME duplicate with col-form */
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
  /** FIXME AttrConfigBroadcastService */
  @Output() removeColumn = new EventEmitter<RemoveCol>();
  /** FIXME AttrConfigBroadcastService */
  @Output() editColumn = new EventEmitter<Proc & EditColData>();

  readonly trackByFn = trackByFn;

  readonly creatingState$ = new BehaviorSubject<ProcessingState>(null);

  private readonly _columnsState$ = new BehaviorSubject<ColState>({
    kind: 'ok',
    data: [],
  });
  readonly columnsState$ = this._columnsState$
    .asObservable()
    .pipe(map(resolveStateWithWarn('No columns data')));

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
