import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnFormComponent } from './column-form/column-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ColumnFormComponent],
  exports: [ColumnFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ColumnFormModule {}
