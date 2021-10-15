// DEPENDENCY INVERSION?
import { AttributedCells } from '@shared/models/table/attributed';
import { AttributedCellsDS } from '@shared/models/table/attributed/cell';
import { ExplicitCells } from '@shared/models/table/explicit/expl-cell';

export interface Row {
  readonly rowId: number;
  readonly explicit: ExplicitCells;
  readonly attributed: AttributedCells;
}

export interface RowDS {
  readonly rowId: number;
  readonly explicit: ExplicitCells;
  readonly attributed: AttributedCellsDS;
}
