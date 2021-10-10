import { Row } from '@shared/models/table';
import { GridColumn } from '@shared/models/table';
import { PredefinedAttr } from '@shared/models/table/attributed';
import { sortId, sortAuthor } from '@shared/models/table';
import { getTextRequests } from '@shared/models/table/attributed/type/text/http.utils';
import { formTextValueFn } from '@shared/models/table/attributed/type/text/form.utils';
import {
  formDateValueFn,
  getDateRequests,
} from '@shared/models/table/attributed/type/date';
import { formMultiListValueFn } from '@shared/models/table/attributed/type/multi-list/form.utils';
import { getMultiListRequests } from '@shared/models/table/attributed/type/multi-list/http.utils';
import { sortAttrText } from '@shared/models/table/attributed/type/text/column.utils';
import { sortAttrList } from '@shared/models/table/attributed/type/multi-list/column.utils';
import { concat, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ResponseState } from '@shared/models/response-state';
import { Dictionary } from '@shared/models/dictionary';

const q1: Observable<ResponseState<Dictionary<number>>> = of({
  kind: 'loading',
});
const q2: Observable<ResponseState<Dictionary<number>>> = of({
  kind: 'ok',
  data: [
    { id: 1, name: 'tag1' },
    { id: 2, name: 'tag2' },
    { id: 3, name: 'tag3' },
    { id: 4, name: 'tag4' },
  ],
} as ResponseState<Dictionary<number>>).pipe(delay(1_000));

const u1: Observable<ResponseState<Dictionary<string>>> = of({
  kind: 'loading',
});
const u2: Observable<ResponseState<Dictionary<string>>> = of({
  kind: 'ok',
  data: [
    { id: '1x', name: 'Ant' },
    { id: '2x', name: 'Lex' },
    { id: '3x', name: 'User3' },
  ],
} as ResponseState<Dictionary<string>>).pipe(delay(1_000));

const tags$: Observable<ResponseState<Dictionary<number>>> = concat(q1, q2);

const users$: Observable<ResponseState<Dictionary<string>>> = concat(u1, u2);

// export const mockColumns: ReadonlyArray<GridColumn> = [];
export const mockColumns: ReadonlyArray<GridColumn> = [
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
    alias: 'author',
    name: 'Author',
    width: 100,
    sortable: true,
    sortFn: sortAuthor,
    resolveFormValue: (r: Row) => r.explicit.author.id || null,
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
