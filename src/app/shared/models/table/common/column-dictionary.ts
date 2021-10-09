import { Dictionary } from '@shared/models/dictionary';
import { ResponseState } from '@shared/models/response-state';
import { Observable } from 'rxjs';

export type ColumnDictionary<T> = {
  readonly dictionary$: Observable<ResponseState<Dictionary<T>>>;
};
