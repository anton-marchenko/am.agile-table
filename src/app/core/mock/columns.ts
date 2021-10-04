import { PredefinedAttr } from '@shared/models/attributed';
import { Row } from '@shared/models/row';
import { GridColumn } from '@shared/models/column';
import { sortId, sortOwner } from '@shared/models/explicit/sort-column.utils';
import { getTextRequests } from '@shared/models/attributed/text/http.utils';
import { formTextValueFn } from '@shared/models/attributed/text/form.utils';
import { formDateValueFn } from '@shared/models/attributed/date/form.utils';
import { getDateRequests } from '@shared/models/attributed/date/http.utils';
import { formMultiListValueFn } from '@shared/models/attributed/multi-list/form.utils';
import { getMultiListRequests } from '@shared/models/attributed/multi-list/http.utils';
import { sortAttrText } from '@shared/models/attributed/text/column.utils';
import { sortAttrList } from '@shared/models/attributed/multi-list/column.utils';
import { concat, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResponseState } from '@shared/models/response-state';
import { DictionaryItem } from '@shared/models/dictionary';

const q1: Observable<ResponseState<DictionaryItem<number>[]>> = of({ kind: 'loading' });
const q2: Observable<ResponseState<DictionaryItem<number>[]>> = of({
  kind: 'ok',
  data: [
    { id: 1, name: 'tag1' },
    { id: 2, name: 'tag2' },
  ],
} as ResponseState<DictionaryItem<number>[]>).pipe(delay(1_000));

const u1: Observable<ResponseState<DictionaryItem<string>[]>> = of({ kind: 'loading' });
const u2: Observable<ResponseState<DictionaryItem<string>[]>> = of({
  kind: 'ok',
  data: [
    { id: '1xxx', name: 'User1' },
    { id: '2xxx', name: 'User2' },
  ],
} as ResponseState<DictionaryItem<string>[]>).pipe(delay(1_000));

const tags$: Observable<ResponseState<DictionaryItem<number>[]>> = concat(
  q1,
  q2,
);

const users$: Observable<ResponseState<DictionaryItem<string>[]>> = concat(
  u1,
  u2,
);

export const mockColumns: GridColumn[] = [
  {
    kind: 'explicit',
    alias: 'rating',
    name: 'Rating',
    sortable: true,
    sortFn: sortId,
    resolveFormValue: (r: Row) => r.explicit.rating || null,
  },
  {
    kind: 'explicit',
    alias: 'owner',
    name: 'Owner',
    sortable: true,
    sortFn: sortOwner,
    resolveFormValue: (r: Row) => r.explicit.owner.id || null,
    dictionary$: users$,
  },
  {
    kind: 'attributed',
    cellType: 'text',
    attributeId: PredefinedAttr.Name,
    alias: 'text' + PredefinedAttr.Name,
    name: 'Name',
    sortable: true,
    sortFn: sortAttrText,
    resolveFormValue: formTextValueFn(PredefinedAttr.Name),
    makeRequest: getTextRequests(PredefinedAttr.Name),
  },
  {
    kind: 'attributed',
    cellType: 'text',
    attributeId: PredefinedAttr.Description,
    alias: 'text' + PredefinedAttr.Description,
    name: 'Descr',
    resolveFormValue: formTextValueFn(PredefinedAttr.Description),
    makeRequest: getTextRequests(PredefinedAttr.Description),
  },
  {
    kind: 'attributed',
    cellType: 'date',
    attributeId: 3,
    alias: 'date' + 3,
    name: 'Date',
    resolveFormValue: formDateValueFn(3),
    makeRequest: getDateRequests(3),
  },
  {
    kind: 'attributed',
    cellType: 'multiList',
    attributeId: 4,
    alias: 'multiList' + 4,
    name: 'Tags',
    sortable: true,
    sortFn: sortAttrList,
    resolveFormValue: formMultiListValueFn(4),
    makeRequest: getMultiListRequests(4),
    dictionary$: tags$,
  },
];
