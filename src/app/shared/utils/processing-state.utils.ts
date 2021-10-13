import { ProcessingState } from '@shared/models/processing-state';
import { ResponseState } from '@shared/models/response-state';

export const responseStateToProc = <T>(
  state: ResponseState<T>,
): ProcessingState => {
  if (state.kind === 'loading') {
    return 'processing';
  }

  if (state.kind === 'ok') {
    return 'complete';
  }

  return 'reject';
};
