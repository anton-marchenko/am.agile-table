import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { GridColumn, Row } from '@shared/models/table';

export const createForm = (
  row: Row | null,
  columns: ReadonlyArray<GridColumn>,
) => {
  const acc: {
    explicit: { [key: string]: UntypedFormControl };
    attributed: {
      // FIXME - key is only string
      // FIXME - use text: ReadonlyArray<T> instead
      // Then text[index] will work
      text: { [key: number]: UntypedFormControl };
      date: { [key: number]: UntypedFormControl };
      multiList: { [key: number]: UntypedFormControl };
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
          [col.alias]: new UntypedFormControl(row ? col.resolveFormValue(row) : null),
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
                [col.attributeId]: new UntypedFormControl(
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
                [col.attributeId]: new UntypedFormControl(
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
                [col.attributeId]: new UntypedFormControl(
                  row ? col.resolveFormValue(row) : null,
                ),
              },
            },
          };
        }
      }
    }
  }, acc);

  const form = new UntypedFormGroup({
    rowId: new UntypedFormControl(row?.rowId ?? null),
    explicit: new UntypedFormGroup(cfg.explicit),
    attributed: new UntypedFormGroup({
      text: new UntypedFormGroup(cfg.attributed.text),
      date: new UntypedFormGroup(cfg.attributed.date),
      multiList: new UntypedFormGroup(cfg.attributed.multiList),
    }),
  });

  return form;
};
