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
import { Nullish } from '@shared/models/nullish';
import { GridColumn } from '@shared/models/table';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

type ColumnChangeEvent = {
  // sender: ColumnFormComponent;
  data: {
    alias: Nullish<string>;
    title: Nullish<string>;
    width: Nullish<number>;
    sortable: Nullish<boolean>;
  };
};

@Component({
  selector: 'am-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnFormComponent implements OnInit, OnDestroy {
  @Input() set column(column: GridColumn | null) {
    this.form.patchValue({
      alias: column?.alias,
      title: column?.name,
      width: column?.width,
      sortable: column?.sortable,
    });
  }

  @Output() valueChanges = new EventEmitter<ColumnChangeEvent>();

  readonly form = new FormGroup({
    alias: new FormControl(null),
    title: new FormControl(null),
    width: new FormControl(null),
    sortable: new FormControl(null),
  });

  private readonly ngUnsubscribe$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => this.valueChanges.emit({ data }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
