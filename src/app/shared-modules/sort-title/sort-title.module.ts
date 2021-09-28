import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortTitleComponent } from '@shared-modules/sort-title/sort-title/sort-title.component';

@NgModule({
  declarations: [SortTitleComponent],
  exports: [SortTitleComponent],
  imports: [CommonModule],
})
export class SortTitleModule {}
