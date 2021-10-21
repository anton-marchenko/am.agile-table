import { AmAppError } from '@shared/models/am-app-error';

export const unwrapNullable = <T>(val: T | null | undefined) => {
  if (val !== null && val !== undefined) {
    return val;
  }

  throw new AmAppError('Runtime error: Value is null or undefined.');
};
