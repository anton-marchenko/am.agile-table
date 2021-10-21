import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AmAppError } from '@shared/models/am-app-error';

const formatErrorMessage = (error?: { name?: string; message?: string }) =>
  [
    'Global error handler [DEMO]',
    '',
    'This error was intentionally created for demonstration of global application error handler',
    '',
    'Error type: ' + error?.name || 'Unknown error type',
    'Error message: ' + error?.message || 'Unknown error message',
  ].join('\n');

/**
 * Global Error Handling
 * @link https://pkief.medium.com/global-error-handling-in-angular-ea395ce174b1
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone) {}

  handleError(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      this.showMessage(error);

      return;
    }

    if (error instanceof AmAppError) {
      this.showMessage(error);

      return;
    }

    if (error instanceof Error) {
      this.showMessage(error);

      return;
    }

    this.showMessage();
  }

  private showMessage(error?: { name?: string; message?: string }) {
    this.zone.run(() => alert(formatErrorMessage(error)));

    console.error('Error from global error handler', error);
  }
}
