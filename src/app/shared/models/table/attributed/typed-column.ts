import { CellType } from '@shared/models/table/attributed';
import { ColumnCfg } from '@shared/models/table/common/column';

export type TypedColumn<T extends CellType> = {
  readonly kind: 'attributed';
  readonly cellType: T;
  readonly attributeId: number;
  readonly alias: string;
} & ColumnCfg;
