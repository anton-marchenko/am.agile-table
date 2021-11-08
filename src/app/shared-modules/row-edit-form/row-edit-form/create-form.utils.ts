import { FormControl, FormGroup } from '@angular/forms';
import { GridColumn, Row } from '@shared/models/table';

export const createForm = (
  row: Row | null,
  columns: ReadonlyArray<GridColumn>,
) => {
  const acc: {
    explicit: { [key: string]: FormControl };
    attributed: {
      // FIXME - key is only string
      // FIXME - use text: ReadonlyArray<T> instead
      // Then text[index] will work
      text: { [key: number]: FormControl };
      date: { [key: number]: FormControl };
      multiList: { [key: number]: FormControl };
    };
  } = {
    explicit: {},
    attributed: { text: {}, date: {}, multiList: {} },
  } as const;
  const cfg = columns.reduce((acc, col) => {
    if (col.kind === 'explicit') {
      return {
        ...acc,
        explicit: {
          ...acc.explicit,
          [col.alias]: new FormControl(row ? col.resolveFormValue(row) : null),
        },
      };
    } else {
      switch (col.cellType) {
        case 'text': {
          return {
            ...acc,
            attributed: {
              ...acc.attributed,
              text: {
                ...acc.attributed.text,
                [col.attributeId]: new FormControl(
                  row ? col.resolveFormValue(row) : null,
                ),
              },
            },
          };
        }
        case 'date': {
          return {
            ...acc,
            attributed: {
              ...acc.attributed,
              date: {
                ...acc.attributed.date,
                [col.attributeId]: new FormControl(
                  row ? col.resolveFormValue(row) : null,
                ),
              },
            },
          };
        }
        case 'multiList': {
          return {
            ...acc,
            attributed: {
              ...acc.attributed,
              multiList: {
                ...acc.attributed.multiList,
                [col.attributeId]: new FormControl(
                  row ? col.resolveFormValue(row) : null,
                ),
              },
            },
          };
        }
      }
    }
  }, acc);

  const form = new FormGroup({
    rowId: new FormControl(row?.rowId ?? null),
    explicit: new FormGroup(cfg.explicit),
    attributed: new FormGroup({
      text: new FormGroup(cfg.attributed.text),
      date: new FormGroup(cfg.attributed.date),
      multiList: new FormGroup(cfg.attributed.multiList),
    }),
  });

  return form;
};
