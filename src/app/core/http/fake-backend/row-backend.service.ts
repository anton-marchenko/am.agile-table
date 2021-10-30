import { Injectable } from '@angular/core';
import { DictionaryBackendService } from '@core/http/fake-backend/dictionary-backend.service';
import { RowAdapterService } from '@core/http/fake-backend/row-adapter/row-adapter.service';
import { mockRowsDB } from '@core/http/fake-backend/mock/rows';
import { MultiListValDS } from '@shared/models/table/attributed/type/multi-list/cell';
import { RowDS } from '@shared/models/table/common/row';
import { RowDTO } from '@shared/models/table/common/row-dto';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';
import { concat, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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

const createVal = <T>(val: T) => ({
  ...val,
  id: genFakeId(),
  etag: 'etag',
});

const updateVal = <T extends AttrId>(
  items: ReadonlyArray<T>,
  valueItems: ReadonlyArray<AttrId & { value: string | null }>,
) =>
  items.reduce((acc, curr) => {
    const updItem = valueItems.find(
      (itm) => itm.attributeId === curr.attributeId,
    );
    if (!updItem) {
      return [...acc, curr];
    }

    if (updItem.value === '' || updItem.value === null) {
      // DELETE
      return [...acc];
    }

    return [
      ...acc,
      {
        ...curr,
        value: updItem.value,
      },
    ];
  }, [] as T[]);

type AttrId = { readonly attributeId: number };

const excludeExist =
  <I extends ReadonlyArray<AttrId>, V extends AttrId>(items: I) =>
  (val: V) =>
    !items.some((v) => v.attributeId === val.attributeId);

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

  onSort({ descriptors }: { descriptors: ReadonlyArray<string> }) {
    const sortQuery = descriptors.join(' AND ');
    const url = `https://some.fake.backend?$sort=${sortQuery}`;

    throw new HttpErrorResponse({
      url,
      status: 500,
      statusText: `It's just sorting demo error :)`,
    });
  }

  createRow(row: RowDTO) {
    const { explicit, attributed } = this.rowAdapter.resolveRowData(row);

    /** Let's pretend that backend makes its job here */
    const newRow: RowDS = {
      rowId: genFakeId(),
      explicit: {
        rating: explicit.rating,
        author: explicit.author
          ? this.dictionaryBackend.getUser(explicit.author)
          : null,
      },
      attributed: {
        text: attributed.text.map(createVal),
        date: attributed.date.map(createVal),
        multiList: attributed.multiList.map(createVal),
      },
    };

    this.rows = [...this.rows, newRow];

    const req = of(
      this.rows.map((rowDS) => this.rowAdapter.resolveRow(rowDS)),
    ).pipe(delay(500));

    return withLoading(req);
  }

  // TODO - needs refactor!
  updateRow(rowId: number, row: RowDTO) {
    const oldRow = unwrapNullable(this.rows.find((r) => r.rowId === rowId));
    const updatedRow: RowDS = this.updateRowDS(rowId, row, oldRow);
    const acc: ReadonlyArray<RowDS> = [];

    this.rows = this.rows.reduce((acc, curr) => {
      return curr.rowId === rowId ? [...acc, updatedRow] : [...acc, curr];
    }, acc);

    const req = of(
      this.rows.map((rowDS) => this.rowAdapter.resolveRow(rowDS)),
    ).pipe(delay(500));

    return withLoading(req);
  }

  /** Let's pretend that backend makes its job here */
  private updateRowDS(rowId: number, row: RowDTO, oldRow: RowDS): RowDS {
    const rowData = this.rowAdapter.resolveRowData(row);

    const patchText = () =>
      updateVal(oldRow.attributed.text, rowData.attributed.text);

    const patchDate = () =>
      updateVal(oldRow.attributed.date, rowData.attributed.date);

    const patchMultiList = () => {
      const attrIds = new Set<number>();
      const newItems: MultiListValDS[] = rowData.attributed.multiList.map(
        (item) => {
          attrIds.add(item.attributeId);

          return createVal(item);
        },
      );

      const existItems = oldRow.attributed.multiList.filter(
        (item) => !Array.from(attrIds).includes(item.attributeId),
      );

      return [...existItems, ...newItems];
    };

    const postText = () =>
      rowData.attributed.text
        .filter(excludeExist(oldRow.attributed.text))
        .map(createVal);

    const postDate = () =>
      rowData.attributed.date
        .filter(excludeExist(oldRow.attributed.date))
        .map(createVal);

    /** Let's pretend that backend makes its job here */
    return {
      rowId,
      explicit: {
        rating: rowData.explicit.rating,
        author: rowData.explicit.author
          ? this.dictionaryBackend.getUser(rowData.explicit.author)
          : null,
      },
      attributed: {
        text: [...postText(), ...patchText()],
        date: [...postDate(), ...patchDate()],
        multiList: [...patchMultiList()],
      },
    };
  }
}
