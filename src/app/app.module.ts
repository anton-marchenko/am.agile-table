import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AttributeConfiguratorModule } from '@shared-modules/configurator/attribute-configurator/attribute-configurator.module';
import { CommonTableModule } from '@shared-modules/common-table/common-table.module';
import { RowEditFormModule } from '@shared-modules/row-edit-form/row-edit-form.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonTableModule,
    RowEditFormModule,
    AttributeConfiguratorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
