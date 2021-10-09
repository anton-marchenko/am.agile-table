import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowEditFormComponent } from './row-edit-form/row-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListControlModule } from '@shared-modules/controls/list-control/list-control.module';
import { DateControlModule } from '@shared-modules/controls/date-control/date-control.module';

@NgModule({
  declarations: [RowEditFormComponent],
  exports: [RowEditFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListControlModule,
    DateControlModule,
  ],
})
export class RowEditFormModule {}
