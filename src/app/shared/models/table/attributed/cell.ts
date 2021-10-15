import { DateCell } from '@shared/models/table/attributed/type/date';
import { DateValDS } from '@shared/models/table/attributed/type/date/cell';
import {
  MultiListCell,
  MultiListValDS,
} from '@shared/models/table/attributed/type/multi-list/cell';
import {
  TextCell,
  TextValDS,
} from '@shared/models/table/attributed/type/text/cell';
import { Cells } from '@shared/models/table/common/cell';

export type AttributedCells = {
  readonly text: Cells<TextCell>;
  readonly date: Cells<DateCell>;
  readonly multiList: Cells<MultiListCell>;
};

export type AttributedCellsDS = {
  readonly text: ReadonlyArray<TextValDS>;
  readonly date: ReadonlyArray<DateValDS>;
  readonly multiList: ReadonlyArray<MultiListValDS>;
};

export type CellType = keyof AttributedCells;
