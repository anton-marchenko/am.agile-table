import { CellType } from '@shared/models/attributed';

export type TypedColumn<T extends CellType> = {
  name: string;
  kind: 'attributed';
  cellType: T;
  attributeId: number;
  alias: string;
};
