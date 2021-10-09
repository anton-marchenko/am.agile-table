import { SortFn } from '@shared/models/table/common/sort-column.type';

export const sortAttrText: SortFn = (field, dir) => `${field}/Value ${dir}`;
