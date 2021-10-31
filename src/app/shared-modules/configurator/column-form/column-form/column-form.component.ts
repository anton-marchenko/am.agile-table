import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditColHandler } from '@shared/models/edit-col-handler';
import { ProcessingState, ProcessSubj } from '@shared/models/processing-state';
import { GridColumn } from '@shared/models/table';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { BehaviorSubject, Subject } from 'rxjs';

type EditColData = {
  data: EditColHandler;
};

/** FIXME duplicate */
type Proc = { processing$: ProcessSubj };

@Component({
  selector: 'am-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnFormComponent implements OnInit, OnDestroy {
  @Input() set canRemove(canRemove: boolean) {
    this.canRemove$.next(canRemove);
  }

  @Input() set column(column: GridColumn | null) {
    // this.form.disable();
    this.form.patchValue({
      alias: column?.alias,
      name: column?.name,
      width: column?.width,
      sortable: column?.sortable,
    });
  }

  @Output() removeColumn = new EventEmitter<Proc>();
  @Output() editColumn = new EventEmitter<Proc & EditColData>();

  readonly form = new FormGroup({
    alias: new FormControl(null),
    name: new FormControl(null),
    width: new FormControl(null),
    sortable: new FormControl(null),
  });

  readonly canRemove$ = new BehaviorSubject<boolean>(false);
  readonly deletingState$ = new BehaviorSubject<ProcessingState>(null);
  readonly savingState$ = new BehaviorSubject<ProcessingState>(null);

  private readonly ngUnsubscribe$ = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onRemove(event: Event) {
    event.preventDefault();

    this.removeColumn.emit({ processing$: this.deletingState$ });
  }

  onSubmit() {
    const fields = ['name', 'width', 'sortable'] as const;
    const value = this.form.getRawValue();
    const data: EditColHandler = {
      alias: unwrapNullable(value.alias),
      body: fields.reduce((acc, curr) => {
        return value[curr] === undefined
          ? { ...acc }
          : { ...acc, [curr]: value[curr] };
      }, {} as const),
    };

    this.editColumn.emit({
      processing$: this.savingState$,
      data,
    });
  }
}
