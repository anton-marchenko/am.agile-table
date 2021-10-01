import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowEditFormComponent } from './row-edit-form/row-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RowEditFormComponent],
  exports: [RowEditFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RowEditFormModule {}
