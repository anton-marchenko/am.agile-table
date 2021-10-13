import { GridColumn } from '@shared/models/table';
import { TextColumnDS } from '@shared/models/table/attributed/type/text/column';
import { formTextValueFn } from '@shared/models/table/attributed/type/text/form.utils';
import { getTextRequests } from '@shared/models/table/attributed/type/text/http.utils';
import { SortFn } from '@shared/models/table/common/sort-column.type';

export const sortAttrText: SortFn = (field, dir) => `${field}/Value ${dir}`;

/** FIXME - duplicate with DATE */
export const resolveTextColumnDS = (column: TextColumnDS): TextColumnDS =>
  ({
    name: column.name,
    cellType: column.cellType,
    kind: column.kind,
    attributeId: column.attributeId,
    sortable: column.sortable,
    width: column.width,
  } as const);

export const resolveTextColumn = (ds: TextColumnDS): GridColumn => ({
  ...ds,
  cellType: 'text',
  kind: 'attributed',
  alias: 'text' + ds.attributeId,
  sortFn: sortAttrText,
  resolveFormValue: formTextValueFn(ds.attributeId),
  makeRequest: getTextRequests(ds.attributeId),
});
