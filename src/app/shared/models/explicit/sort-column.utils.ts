import { SortFn } from '@shared/models/common/sort-column.type';

export const sortOwner: SortFn = (field, dir) => `Owner/DisplayName ${dir}`;

export const sortId: SortFn = (field, dir) => `Id ${dir}`;
