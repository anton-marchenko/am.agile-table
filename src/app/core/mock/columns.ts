import { PredefinedAttr } from '@shared/models/predefined-attr';
import { GridColumn, SortFn } from '@shared/models/grid';
import { Row } from '@shared/models/row';
import {
  getDateValue,
  getMultiListValue,
  getTextValue,
} from '@shared/models/cell.utils';
import { unwrapNullable } from '@shared/utils/unwrap-nullable';

const sortOwner: SortFn = (field, dir: 'asc' | 'desc') =>
  `Owner/DisplayName ${dir}`;

const sortId: SortFn = (field, dir: 'asc' | 'desc') => `Id ${dir}`;

const sortAttrText: SortFn = (field, dir: 'asc' | 'desc') =>
  `${field}/Value ${dir}`;

const sortAttrList: SortFn = (field, dir: 'asc' | 'desc') =>
  `${field}/ListItem/Item ${dir}`;

const formTextValueFn = (attributeId: number) => (row: Row) => {
  const textValue = getTextValue(unwrapNullable(row), attributeId);

  return textValue?.value ?? '';
};
const formDateValueFn = (attributeId: number) => (row: Row) => {
  const dateValue = getDateValue(unwrapNullable(row), attributeId);

  return dateValue ? dateValue.value.toISOString() : '';
};
const formMultiListValueFn = (attributeId: number) => (row: Row) => {
  const values = getMultiListValue(unwrapNullable(row), attributeId);
  return values ? values.map((el) => el.listItemId) : [];
};

export const mockColumns: GridColumn[] = [
  {
    type: 'explicit',
    alias: 'id',
    name: 'ID',
    sortable: true,
    sortFn: sortId,
    resolveFormValue: (r: Row) => r.explicit.id || null,
  },
  {
    type: 'explicit',
    alias: 'owner',
    name: 'Owner',
    sortable: true,
    sortFn: sortOwner,
    resolveFormValue: (r: Row) => r.explicit.owner.id || null,
  },
  {
    type: 'attributed',
    cellType: 'text',
    attributeId: PredefinedAttr.Name,
    alias: 'text' + PredefinedAttr.Name,
    name: 'Name',
    sortable: true,
    sortFn: sortAttrText,
    resolveFormValue: formTextValueFn(PredefinedAttr.Name),
  },
  {
    type: 'attributed',
    cellType: 'text',
    attributeId: PredefinedAttr.Description,
    alias: 'text' + PredefinedAttr.Description,
    name: 'Descr',
    resolveFormValue: formTextValueFn(PredefinedAttr.Description),
  },
  {
    type: 'attributed',
    cellType: 'date',
    attributeId: 3,
    alias: 'date' + 3,
    name: 'Date',
    resolveFormValue: formDateValueFn(3),
  },
  {
    type: 'attributed',
    cellType: 'multiList',
    attributeId: 4,
    alias: 'multiList' + 4,
    name: 'Tags',
    sortable: true,
    sortFn: sortAttrList,
    resolveFormValue: formMultiListValueFn(4),
  },
];
