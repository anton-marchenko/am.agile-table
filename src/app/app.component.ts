import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { mockColumns } from '@core/mock/columns';
import { GridColumn } from '@shared/models/column';
import { Row } from '@shared/models/row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'agile-table';
  form: FormGroup | null = null;
  row: Row | null = null;

  // TODO - how to refactor?
  onEditRow(event: { row: Row; columns: GridColumn[] }) {
    this.form = this.createForm(event.row, event.columns);
    this.row = event.row;
  }

  private createForm(row: Row, columns: GridColumn[]) {
    const cfg = columns.reduce((acc, col) => {
      return {
        ...acc,
        [col.alias]: new FormControl(col.resolveFormValue(row)),
      };
    }, {});

    return new FormGroup(cfg);
  }
}
