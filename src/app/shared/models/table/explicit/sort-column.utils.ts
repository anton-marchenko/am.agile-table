import { SortFn } from '@shared/models/table/common/sort-column.type';

export const sortAuthor: SortFn = (field, dir) => `Author/DisplayName ${dir}`;

export const sortId: SortFn = (field, dir) => `Id ${dir}`;
