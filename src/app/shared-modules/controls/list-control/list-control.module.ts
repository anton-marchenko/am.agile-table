import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListControlComponent } from './list-control/list-control.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListControlComponent],

  exports: [ListControlComponent],
  imports: [CommonModule, FormsModule],
})
export class ListControlModule {}
