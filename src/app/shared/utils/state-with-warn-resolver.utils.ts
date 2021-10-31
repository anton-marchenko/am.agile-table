import { State, StateWithWarn } from '@shared/models/response-state';

const getMsg = <T>(message: string): StateWithWarn<T> => ({
  kind: 'warning',
  message,
});

export const resolveStateWithWarn =
  (noDataMsg: string = 'No data') =>
  <T>(state: State<T>): StateWithWarn<T> => {
    if (!state) {
      return getMsg(noDataMsg);
    }

    if (state.kind === 'error') {
      return getMsg('Error');
    }

    if (state.kind === 'loading') {
      return getMsg('Loading...');
    }

    if (state.kind === 'ok' && state.data.length === 0) {
      return getMsg(noDataMsg);
    }

    return state;
  };
