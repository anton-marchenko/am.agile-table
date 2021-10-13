import { ColumnCfg } from '@shared/models/table/common/column';

/** FIXME - alias: Pick<GridColumn, 'alias'> doesn't work */
type Alias = { alias: string };
type Body = { body: Partial<ColumnCfg> };

export type EditColHandler = Alias & Body;
