import { DateCell } from '@shared/models/attributed/date/cell';
import { MultiListCell } from '@shared/models/attributed/multi-list/cell';
import { TextCell } from '@shared/models/attributed/text/cell';
import { Cells } from '@shared/models/common/cell';

export type AttributedCells = {
  text: Cells<TextCell>;
  date: Cells<DateCell>;
  multiList: Cells<MultiListCell>;
};

export type CellType = keyof AttributedCells;
