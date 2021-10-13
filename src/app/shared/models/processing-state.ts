export type ProcessingState = 'processing' | 'complete' | 'reject' | null;

export type ProcessSubj = {
  next: (state: ProcessingState) => unknown;
}
