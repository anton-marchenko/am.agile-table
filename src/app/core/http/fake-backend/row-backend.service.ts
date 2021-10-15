import { Injectable } from '@angular/core';
import { RowAdapterService } from '@core/http/row-adapter/row-adapter.service';
import { mockRowsDB } from '@core/mock/rows';
import { ResponseState } from '@shared/models/response-state';
import { RowDTO } from '@shared/models/table/common/row-dto';
import { concat, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

type State<T> = ResponseState<ReadonlyArray<T>> | null;

// FIXME duplicate
const withLoading = <T>(req: Observable<T>) => {
  const init = { kind: 'loading' } as const;

  const req$ = req.pipe(
    map((data) => ({ kind: 'ok', data } as const)),
    catchError((err) => of({ kind: 'error' } as const)),
  );

  return concat(of(init), req$);
};

@Injectable({
  providedIn: 'root',
})
export class RowBackendService {
  constructor(private readonly rowAdapter: RowAdapterService) {}

  getRows() {
    const rows = mockRowsDB.map((rowDS) => this.rowAdapter.resolveRow(rowDS));

    const rows$ = of(rows).pipe(delay(800));

    return withLoading(rows$);
  }

  createRow(row: RowDTO) {
    console.log(row);
  }

  updateRow(row: RowDTO) {
    const newRow = this.rowAdapter.resolveNewRow(row);
    console.log(newRow);
  }
}
