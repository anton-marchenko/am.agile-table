import { TypedColumnDS, BaseTypedColumnDS } from '@shared/models/table';
import { TypedColumn } from '@shared/models/table/attributed';
import { TextRequest } from '@shared/models/table/attributed/type/text/http';
import { FormValue } from '@shared/models/table/common/form-value.type';
import { MakeRequest } from '@shared/models/table/common/make-request.type';

type TxtColEdit = FormValue<string>;

export type NewTextColumnDS = BaseTypedColumnDS<'text'>;

export type TextColumnDS = TypedColumnDS<'text'>;

export type TextColumn = TypedColumn<'text'> &
  TxtColEdit &
  MakeRequest<string, TextRequest>;


