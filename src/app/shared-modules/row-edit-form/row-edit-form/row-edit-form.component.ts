import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { mockColumns } from '@core/mock/columns';
import { isAttributedCol, isExplicitCol } from '@shared/models/column.utils';
import { ExplColumn } from '@shared/models/grid';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-row-edit-form',
  templateUrl: './row-edit-form.component.html',
  styleUrls: ['./row-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowEditFormComponent implements OnInit {
  readonly mockColumns = mockColumns;

  @Input() set form(form: FormGroup | null) {
    this.data$.next({ form });
  }

  readonly data$ = new BehaviorSubject<{ form: FormGroup | null }>({
    form: null,
  });

  constructor() {}

  ngOnInit(): void {
    console.log(this.form);
  }

  getControl(form: FormGroup, fieldName: string) {
    // FIXME
    // https://stackoverflow.com/questions/59284894/type-abstractcontrol-is-missing-the-following-properties-from-type-formgroup
    return unwrapNullable(form.get(fieldName)) as FormControl;
  }

  onSave(form: FormGroup) {
    const result = form.getRawValue();

    const rrr = this.mockColumns
      .filter(isExplicitCol)
      .reduce((acc, col) => {
        return {
          ...acc,
          [col.alias]: col,
        };
      }, {});


    this.mockColumns
    .filter(isAttributedCol)
    .map((col) => {
      // FIXME - FP-TS
      const newValue = result[col.alias];

      // col.getRequests(row, newValue);
    });
  }
}
