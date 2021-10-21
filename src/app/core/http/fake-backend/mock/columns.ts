import { PredefinedAttr } from '@shared/models/table/attributed';
import { GridColumnDS } from '@shared/models/table/common/column';

export const mockColumnsDB: ReadonlyArray<GridColumnDS> = [
  {
    kind: 'explicit',
    alias: 'rating',
    name: 'Rating',
    sortable: true,
  },
  {
    kind: 'explicit',
    alias: 'author',
    name: 'Author',
    width: 100,
    sortable: true,
  },
  {
    kind: 'attributed',
    cellType: 'text',
    attributeId: PredefinedAttr.Name,
    name: 'Name',
    sortable: true,
  },
  {
    kind: 'attributed',
    cellType: 'text',
    attributeId: PredefinedAttr.Description,
    name: 'Descr',
  },
  {
    kind: 'attributed',
    cellType: 'date',
    attributeId: 3,
    name: 'Date',
  },
  {
    kind: 'attributed',
    cellType: 'multiList',
    attributeId: 4,
    listId: 2,
    name: 'Tags',
    sortable: true,
  },
];
