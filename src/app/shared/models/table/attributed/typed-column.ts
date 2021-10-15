import { CellType } from '@shared/models/table/attributed';
import { ColumnCfg } from '@shared/models/table/common/column';

type AttrCellType<T extends CellType> = {
  readonly cellType: T;
};

type AttrKind = {
  readonly kind: 'attributed';
};

type AttrId = {
  readonly attributeId: number;
};

type AttrAlias = {
  readonly alias: string;
};

/**
 * DS (data strucuture)
 * uses for stroring data in DB
 * and transfering data about columns throughout the appication
 * */
export type BaseTypedColumnDS<T extends CellType> = AttrCellType<T> &
  AttrKind &
  ColumnCfg;

export type TypedColumnDS<T extends CellType> = BaseTypedColumnDS<T> & AttrId;

export type TypedColumn<T extends CellType> = TypedColumnDS<T> & AttrAlias;
