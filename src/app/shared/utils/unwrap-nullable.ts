export const unwrapNullable = <T>(val: T | null | undefined) => {
  if (val !== null && val !== undefined) { return val; }

  throw new Error('Runtime error: Value is null or undefined.');
};
