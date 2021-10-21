import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from '@core/errors/global-error-handler';

/**
 * The core module is a module that is only imported once.
 * The reason behind this is that we want everything that’s inside the core module to be a Singleton.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          // processes all errors
          provide: ErrorHandler,
          useClass: GlobalErrorHandler,
        }
      ]
    };
  }
}
