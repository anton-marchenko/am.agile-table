import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { createForm } from '@shared-modules/row-edit-form/row-edit-form/create-form.utils';
import { ProcessingState, ProcessSubj } from '@shared/models/processing-state';
import { State } from '@shared/models/response-state';
import { GridColumn } from '@shared/models/table';
import { Row } from '@shared/models/table';
import { RowDTO } from '@shared/models/table/common/row-dto';
import { resolveStateWithWarn } from '@shared/utils';
import { trackByFn } from '@shared/utils/track-by.utils';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'am-row-edit-form',
    templateUrl: './row-edit-form.component.html',
    styleUrls: ['./row-edit-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RowEditFormComponent implements OnInit {
  @Input() set columnsState(colState: State<GridColumn>) {
    this._columnsState$.next(colState);

    if (colState?.kind === 'ok') {
      const row = this.row$.getValue();

      this.updateForm(row, colState.data);
    } else {
      this.data$.next({ form: null });
    }
  }

  @Input() set row(row: Row | null) {
    this.row$.next(row);

    const colState = this._columnsState$.getValue();

    if (colState?.kind === 'ok') {
      const row = this.row$.getValue();

      this.updateForm(row, colState.data);
    } else {
      this.data$.next({ form: null });
    }
  }

  readonly trackByFn = trackByFn;

  readonly data$ = new BehaviorSubject<{ form: UntypedFormGroup | null }>({
    form: null,
  });

  private readonly row$ = new BehaviorSubject<Row | null>(null);

  private readonly _columnsState$ = new BehaviorSubject<State<GridColumn>>({
    kind: 'ok',
    data: [],
  });
  readonly columnsState$ = this._columnsState$
    .asObservable()
    .pipe(map(resolveStateWithWarn('No columns data')));

  readonly savingState$ = new BehaviorSubject<ProcessingState>(null);

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{
    row: RowDTO;
    processing$: ProcessSubj;
  }>();

  constructor() {}

  ngOnInit(): void {}

  getControl(form: UntypedFormGroup, fieldName: string) {
    // FIXME
    // https://stackoverflow.com/questions/59284894/type-abstractcontrol-is-missing-the-following-properties-from-type-formgroup
    return unwrapNullable(form.get(fieldName)) as UntypedFormControl;
  }

  onClose() {
    this.close.emit();
  }

  onSave(form: UntypedFormGroup) {
    // TODO ################################
    // some validators in particular status
    // some - in all status (picture size)
    // IO-TS
    const rowData: RowDTO = form.value;

    const colS = this._columnsState$.getValue();

    if (colS?.kind === 'ok') {
      this.save.emit({ row: rowData, processing$: this.savingState$ });
    }
  }

  private updateForm(row: Row | null, columns: ReadonlyArray<GridColumn>) {
    const form = createForm(row, columns);

    this.data$.next({ form });
  }
}
