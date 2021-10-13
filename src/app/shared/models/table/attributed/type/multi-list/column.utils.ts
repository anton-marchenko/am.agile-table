import { GridColumn } from '@shared/models/table';
import { MultiListColumnDS } from '@shared/models/table/attributed/type/multi-list/column';
import { formMultiListValueFn } from '@shared/models/table/attributed/type/multi-list/form.utils';
import { getMultiListRequests } from '@shared/models/table/attributed/type/multi-list/http.utils';
import { ColumnDictionary } from '@shared/models/table/common/column-dictionary';
import { SortFn } from '@shared/models/table/common/sort-column.type';

type AttrDictionary = ColumnDictionary<number>['dictionary$'];

export const sortAttrList: SortFn = (field, dir) =>
  `${field}/ListItem/Item ${dir}`;

/** FIXME - partial duplicate with Text */
export const resolveMultiListColumnDS = (
  column: MultiListColumnDS,
): MultiListColumnDS =>
  ({
    name: column.name,
    cellType: column.cellType,
    kind: column.kind,
    attributeId: column.attributeId,
    sortable: column.sortable,
    width: column.width,
    listId: column.listId,
  } as const);

export const resolveMultiListColumn =
  (dictionary$: AttrDictionary) =>
  (ds: MultiListColumnDS): GridColumn => ({
    ...ds,
    cellType: 'multiList',
    kind: 'attributed',
    alias: 'multiList' + ds.attributeId,
    sortFn: sortAttrList,
    resolveFormValue: formMultiListValueFn(ds.attributeId),
    makeRequest: getMultiListRequests(ds.attributeId),
    dictionary$,
  });
