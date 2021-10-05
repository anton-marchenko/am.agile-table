// DEPENDENCY INVERSION?
import { AttributedCells } from '@shared/models/attributed';
import { ExplicitCells } from '@shared/models/explicit/expl-cell';

export interface Row {
  readonly rowId: number;
  readonly explicit: ExplicitCells;
  readonly attributed: AttributedCells;
}
