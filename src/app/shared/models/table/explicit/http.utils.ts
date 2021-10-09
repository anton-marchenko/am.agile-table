import { ExplColumn } from '@shared/models/table/explicit/expl-column';


export const getQuerySelect = (columns: ReadonlyArray<ExplColumn>) =>
  columns.map((col) => col.name).join(',');
