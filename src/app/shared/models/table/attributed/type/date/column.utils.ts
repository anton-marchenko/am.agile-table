import { GridColumn, SortFn } from '@shared/models/table';
import {
  formDateValueFn,
  getDateRequests,
} from '@shared/models/table/attributed/type/date';
import { DateColumnDS } from '@shared/models/table/attributed/type/date/column';

export const sortAttrDate: SortFn = (field, dir) => `${field}/Value ${dir}`;

/** FIXME - duplicate with Text */
export const resolveDateColumnDS = (column: DateColumnDS): DateColumnDS => ({
  name: column.name,
  cellType: column.cellType,
  kind: column.kind,
  attributeId: column.attributeId,
  sortable: column.sortable,
  width: column.width,
} as const);

export const resolveDateColumn = (ds: DateColumnDS): GridColumn => ({
  ...ds,
  cellType: 'date',
  kind: 'attributed',
  alias: 'date' + ds.attributeId,
  sortFn: sortAttrDate,
  resolveFormValue: formDateValueFn(ds.attributeId),
  makeRequest: getDateRequests(ds.attributeId),
});
