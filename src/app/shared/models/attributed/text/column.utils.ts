import { SortFn } from '@shared/models/common/sort-column.type';

export const sortAttrText: SortFn = (field, dir) => `${field}/Value ${dir}`;
