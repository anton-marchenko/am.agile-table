import { CellType } from '@shared/models/table/attributed';

export type TypedColumn<T extends CellType> = {
  readonly name: string;
  readonly kind: 'attributed';
  readonly cellType: T;
  readonly attributeId: number;
  readonly alias: string;
};
