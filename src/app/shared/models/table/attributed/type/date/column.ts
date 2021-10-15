import { BaseTypedColumnDS, TypedColumnDS } from '@shared/models/table';
import { TypedColumn } from '@shared/models/table/attributed';
import { DateRequest } from '@shared/models/table/attributed/type/date/http';
import { FormValue } from '@shared/models/table/common/form-value.type';
import { MakeRequest } from '@shared/models/table/common/make-request.type';

type DateColEdit = FormValue<string | null>;

export type NewDateColumnDS = BaseTypedColumnDS<'date'>;

export type DateColumnDS = TypedColumnDS<'date'>;

export type DateColumn = TypedColumn<'date'> &
  DateColEdit &
  MakeRequest<string, DateRequest>;
