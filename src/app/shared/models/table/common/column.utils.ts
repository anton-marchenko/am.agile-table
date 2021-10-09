import { AttrColumn } from '@shared/models/table/attributed';
import { ExplColumn } from '@shared/models/table/explicit/expl-column';

export const isExplicitCol = (
  col: ExplColumn | AttrColumn,
): col is ExplColumn => col.kind === 'explicit';

export const isAttributedCol = (
  col: ExplColumn | AttrColumn,
): col is AttrColumn => col.kind === 'attributed';
