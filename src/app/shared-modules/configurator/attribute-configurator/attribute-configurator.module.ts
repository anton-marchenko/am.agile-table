import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeConfiguratorComponent } from './attribute-configurator/attribute-configurator.component';
import { ColumnFormModule } from '@shared-modules/configurator/column-form/column-form.module';

@NgModule({
  declarations: [AttributeConfiguratorComponent],
  exports: [AttributeConfiguratorComponent],
  imports: [CommonModule, ColumnFormModule],
})
export class AttributeConfiguratorModule {}
