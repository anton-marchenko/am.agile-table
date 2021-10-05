import { DateCell } from '@shared/models/attributed/date';
import { MultiListCell } from '@shared/models/attributed/multi-list/cell';
import { TextCell } from '@shared/models/attributed/text/cell';
import { Cells } from '@shared/models/common/cell';

export type AttributedCells = {
  readonly text: Cells<TextCell>;
  readonly date: Cells<DateCell>;
  readonly multiList: Cells<MultiListCell>;
};

export type CellType = keyof AttributedCells;
