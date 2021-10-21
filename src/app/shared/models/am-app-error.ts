export class AmAppError extends Error {
  readonly name: string = 'am.AppicationError';

  constructor(
    message: string,
    public readonly data?: { [key: string]: string },
  ) {
    super(message);
  }
}
