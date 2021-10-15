import { Dictionary } from '@shared/models/dictionary';
import { ResponseState } from '@shared/models/response-state';
import { concat, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

const tags$: Observable<ResponseState<Dictionary<number>>> = concat(q1, q2);

export const attrDictionaries = [tags$, tags$, tags$] as const;

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

export const users$: Observable<ResponseState<Dictionary<string>>> = concat(
  u1,
  u2,
);
