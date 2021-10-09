import { DateCell } from '@shared/models/table/attributed/type/date';
import { MultiListCell } from '@shared/models/table/attributed/type/multi-list/cell';
import { TextCell } from '@shared/models/table/attributed/type/text/cell';
import { Cells } from '@shared/models/table/common/cell';

export type AttributedCells = {
  readonly text: Cells<TextCell>;
  readonly date: Cells<DateCell>;
  readonly multiList: Cells<MultiListCell>;
};

export type CellType = keyof AttributedCells;
