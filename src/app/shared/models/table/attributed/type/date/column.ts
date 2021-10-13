import { TypedColumn } from '@shared/models/table/attributed';
import { DateRequest } from '@shared/models/table/attributed/type/date/http';
import { ColumnCfg } from '@shared/models/table/common/column';
import { FormValue } from '@shared/models/table/common/form-value.type';
import { MakeRequest } from '@shared/models/table/common/make-request.type';

type DateColEdit = FormValue<string | null>;

export type DateColumn = TypedColumn<'date'> &
  DateColEdit &
  MakeRequest<string, DateRequest>;

export type NewDateColumnDS = ColumnCfg & Pick<DateColumn, 'cellType' | 'kind'>;

export type DateColumnDS = NewDateColumnDS & Pick<DateColumn, 'attributeId'>;
