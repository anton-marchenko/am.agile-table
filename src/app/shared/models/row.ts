// DEPENDENCY INC|VERSION?
import { AttributedCells } from '@shared/models/attributed';
import { ExplicitCells } from '@shared/models/explicit/expl-cell';

export interface Row {
  rowId: number;
  explicit: ExplicitCells;
  attributed: AttributedCells;
}
