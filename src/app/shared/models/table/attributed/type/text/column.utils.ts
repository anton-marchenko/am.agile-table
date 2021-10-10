import { GridColumn } from '@shared/models/table';
import { formTextValueFn } from '@shared/models/table/attributed/type/text/form.utils';
import { getTextRequests } from '@shared/models/table/attributed/type/text/http.utils';
import { SortFn } from '@shared/models/table/common/sort-column.type';

export const sortAttrText: SortFn = (field, dir) => `${field}/Value ${dir}`;

export const createTextColumn = (attributeId: number): GridColumn => ({
  kind: 'attributed',
  cellType: 'text',
  attributeId,
  alias: 'text' + attributeId,
  name: 'New Column',
  sortable: true,
  sortFn: sortAttrText,
  resolveFormValue: formTextValueFn(attributeId),
  makeRequest: getTextRequests(attributeId),
});
