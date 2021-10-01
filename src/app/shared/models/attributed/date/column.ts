import { TypedColumn } from '@shared/models/attributed';
import { DateRequest } from '@shared/models/attributed/date/http';
import { FormValue } from '@shared/models/common/form-value.type';
import { MakeRequest } from '@shared/models/common/make-request.type';

type DateColEdit = FormValue<string>;

export type DateColumn = TypedColumn<'date'> &
  DateColEdit &
  MakeRequest<string, DateRequest>;
