import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GridColumn, isAttributedCol, isExplicitCol } from '@shared/models/table';
import { Row } from '@shared/models/table';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'am-row-edit-form',
  templateUrl: './row-edit-form.component.html',
  styleUrls: ['./row-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowEditFormComponent implements OnInit {
  @Input() set form(form: FormGroup | null) {
    this.data$.next({ form });
  }

  @Input() row: Row | null = null;
  @Input() columns: ReadonlyArray<GridColumn> | null = null;

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
    // TODO ################################
    // some validators in particular status
    // some - in all status (picture size)
    const result = form.getRawValue();
    console.log(result);

    const rrr = this.columns?.filter(isExplicitCol).reduce((acc, col) => {
      return {
        ...acc,
        [col.alias]: col,
      };
    }, {});

    this.columns?.filter(isAttributedCol).map((col) => {
      // FIXME - IO-TS
      // https://github.com/gcanti/io-ts/blob/master/index.md#the-idea
      // const newValue = result[col.alias];
      const newValue = result[col.alias];

      console.log(col.makeRequest(unwrapNullable(this.row), newValue));
    });
  }
}
