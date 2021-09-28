import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortTitleModule } from '@shared-modules/sort-title/sort-title.module';
import { CommonTableComponent } from './common-table/common-table.component';

@NgModule({
  declarations: [CommonTableComponent],
  exports: [CommonTableComponent],
  imports: [CommonModule, SortTitleModule],
})
export class CommonTableModule {}
