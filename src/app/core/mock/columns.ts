import { PredefinedAttr } from '@shared/models/predefined-attr';
import { GridColumn, SortFn } from '@shared/models/grid';
import { DateVal, MultiListVal, TextVal } from '@shared/models/cell-value';

const sortOwner: SortFn = (field, dir: 'asc' | 'desc') =>
  `Owner/DisplayName ${dir}`;

const sortId: SortFn = (field, dir: 'asc' | 'desc') => `Id ${dir}`;

const sortAttrText: SortFn = (field, dir: 'asc' | 'desc') =>
  `${field}/Value ${dir}`;

const sortAttrList: SortFn = (field, dir: 'asc' | 'desc') =>
  `${field}/ListItem/Item ${dir}`;

export const mockColumns: GridColumn[] = [
  {
    type: 'explicit',
    alias: 'id',
    name: 'ID',
    sortable: true,
    sortFn: sortId,
  },
  {
    type: 'explicit',
    alias: 'owner',
    name: 'Owner',
    sortable: true,
    sortFn: sortOwner,
  },
  {
    type: 'attributed',
    cellType: 'text',
    attributeId: PredefinedAttr.Name,
    name: 'Name',
    sortable: true,
    sortFn: sortAttrText,
    formValueFn: (v?: TextVal) => '',
  },
  {
    type: 'attributed',
    cellType: 'text',
    attributeId: PredefinedAttr.Description,
    name: 'Descr',
    formValueFn: (v?: TextVal) => '',
  },
  {
    type: 'attributed',
    cellType: 'date',
    attributeId: 3,
    name: 'Date',
    formValueFn: (v?: DateVal) => 'ddd',
  },
  {
    type: 'attributed',
    cellType: 'multiList',
    attributeId: 4,
    name: 'Tags',
    sortable: true,
    sortFn: sortAttrList,
    formValueFn: (values?: MultiListVal[]) =>
      values ? values.map((el) => el.listItemId) : [],
  },
];
