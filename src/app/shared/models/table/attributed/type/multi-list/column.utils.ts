import { SortFn } from '@shared/models/table/common/sort-column.type';

export const sortAttrList: SortFn = (field, dir) =>
  `${field}/ListItem/Item ${dir}`;
