import { AttributedCells } from '@shared/models/cell';

export interface Row {
  explicit: {
    id: number;
    owner: { id: string; name: string };
  };
  attributed: AttributedCells;
}
