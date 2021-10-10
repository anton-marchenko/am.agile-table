import { GridColumn, SortFn } from '@shared/models/table';
import {
  formDateValueFn,
  getDateRequests,
} from '@shared/models/table/attributed/type/date';

export const sortAttrDate: SortFn = (field, dir) => `${field}/Value ${dir}`;

export const createDateColumn = (attributeId: number): GridColumn => ({
  kind: 'attributed',
  cellType: 'date',
  attributeId,
  alias: 'text' + attributeId,
  name: 'Date Column',
  sortable: true,
  sortFn: sortAttrDate,
  resolveFormValue: formDateValueFn(attributeId),
  makeRequest: getDateRequests(attributeId),
});
