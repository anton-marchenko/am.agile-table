import { Injectable } from '@angular/core';
import { DictionaryBackendService } from '@core/http/fake-backend/dictionary-backend.service';
import { RowAdapterService } from '@core/http/row-adapter/row-adapter.service';
import { mockRowsDB } from '@core/mock/rows';
import { ResponseState } from '@shared/models/response-state';
import { RowDS } from '@shared/models/table/common/row';
import { RowDTO } from '@shared/models/table/common/row-dto';
import { concat, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

type State<T> = ResponseState<ReadonlyArray<T>> | null;

const genFakeId = () => new Date().getTime();

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
  private rows = mockRowsDB;

  constructor(
    private readonly rowAdapter: RowAdapterService,
    private readonly dictionaryBackend: DictionaryBackendService,
  ) {}

  getRows() {
    const rows = this.rows.map((rowDS) => this.rowAdapter.resolveRow(rowDS));

    const rows$ = of(rows).pipe(delay(800));

    return withLoading(rows$);
  }

  createRow(row: RowDTO) {
    const rowData = this.rowAdapter.resolveNewRow(row);

    /** Let's pretend that backend makes its job here */
    const newRow: RowDS = {
      rowId: genFakeId(),
      explicit: {
        rating: rowData.explicit.rating,
        author: rowData.explicit.author
          ? this.dictionaryBackend.getUser(rowData.explicit.author)
          : null,
      },
      attributed: {
        text: rowData.attributed.text.map((val) => ({
          ...val,
          id: genFakeId(),
          etag: 'etag',
        })),
        date: rowData.attributed.date.map((val) => ({
          ...val,
          id: genFakeId(),
          etag: 'etag',
        })),
        multiList: rowData.attributed.multiList.map((val) => ({
          ...val,
          id: genFakeId(),
          etag: 'etag',
        })),
      },
    };

    this.rows = [...this.rows, newRow];

    const req = of(
      this.rows.map((rowDS) => this.rowAdapter.resolveRow(rowDS)),
    ).pipe(delay(500));

    return withLoading(req);
  }

  updateRow(rowId: number, row: RowDTO) {
    // const newRow = this.rowAdapter.resolveRow(row);
    console.log('row: RowDTO', row);
  }
}
