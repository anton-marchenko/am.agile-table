import { SortFn } from '@shared/models/common/sort-column.type';

export const sortAttrList: SortFn = (field, dir) =>
  `${field}/ListItem/Item ${dir}`;
