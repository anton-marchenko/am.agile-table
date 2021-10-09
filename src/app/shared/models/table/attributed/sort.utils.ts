import { CellType } from '@shared/models/table/attributed';
import { resolveHttpTypeValue } from '@shared/models/table/attributed/type-http.utils';

export const resAttrSortField = (type: CellType, attributeId: number) =>
  `${resolveHttpTypeValue(type)}${attributeId}`;
