import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateControlComponent } from './date-control/date-control.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DateControlComponent],
  exports: [DateControlComponent],
  imports: [CommonModule, FormsModule],
})
export class DateControlModule {}
