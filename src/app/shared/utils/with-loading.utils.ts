import { concat, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const withLoading = <T>(req: Observable<T>) => {
  const init = { kind: 'loading' } as const;

  const req$ = req.pipe(
    map((data) => ({ kind: 'ok', data } as const)),
    catchError((err) => of({ kind: 'error' } as const)),
  );

  return concat(of(init), req$);
};
