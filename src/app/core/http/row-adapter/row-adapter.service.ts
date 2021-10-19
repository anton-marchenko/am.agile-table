import { Injectable } from '@angular/core';
import { DateCell, TextCell } from '@shared/models/table/attributed/type';
import { MultiListCell } from '@shared/models/table/attributed/type/multi-list/cell';
import { Cells } from '@shared/models/table/common/cell';
import { RowDS, Row } from '@shared/models/table/common/row';
import { RowDTO } from '@shared/models/table/common/row-dto';

const resolveSingleValue = <T>(entries: { [key: number]: T }) =>
  Object.entries(entries).map(([attributeId, value]) => ({
    attributeId: +attributeId,
    value,
  }));

@Injectable({
  providedIn: 'root',
})
export class RowAdapterService {
  constructor() {}

  resolveRow(rowDS: RowDS): Row {
    const txtAcc: Cells<TextCell> = {} as const;
    const dtAcc: Cells<DateCell> = {} as const;
    const mlAcc: Cells<MultiListCell> = {} as const;

    return {
      ...rowDS,
      attributed: {
        text: rowDS.attributed.text.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.attributeId]: { value: curr },
          };
        }, txtAcc),
        date: rowDS.attributed.date.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.attributeId]: {
              value: {
                ...curr,
                value: curr.value ? new Date(curr.value) : null,
              },
            },
          };
        }, dtAcc),
        multiList: rowDS.attributed.multiList.reduce((acc, curr) => {
          const cell = acc[curr.attributeId];
          const value =
            cell === undefined
              ? { value: [curr] }
              : { value: [...cell.value, curr] };

          return {
            ...acc,
            [curr.attributeId]: value,
          };
        }, mlAcc),
      },
    };
  }

  resolveNewRow(row: RowDTO) {
    //FIXME attr type string -> number
    const mlAcc: ReadonlyArray<{ attributeId: number; listItemId: number }> =
      [] as const;

    return {
      explicit: row.explicit,
      attributed: {
        text: resolveSingleValue(row.attributed.text),
        date: resolveSingleValue(row.attributed.date),
        multiList: Object.entries(row.attributed.multiList).reduce(
          (acc, [attributeId, values]) => {
            const listItems =
              values?.map((listItemId) => ({
                attributeId: +attributeId,
                listItemId,
              })) ?? [];
            return [...acc, ...listItems];
          },
          mlAcc,
        ),
      },
    };
  }
}
