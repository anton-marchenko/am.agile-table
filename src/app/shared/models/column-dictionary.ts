import { DictionaryItem } from '@shared/models/dictionary';
import { ResponseState } from '@shared/models/response-state';
import { Observable } from 'rxjs';

export type ColumnDictionary<T> = {
  dictionary$: Observable<ResponseState<DictionaryItem<T>[]>>;
};
