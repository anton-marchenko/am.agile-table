import { TypedColumn } from '@shared/models/attributed';
import { TextRequest } from '@shared/models/attributed/text/http';
import { FormValue } from '@shared/models/common/form-value.type';
import { MakeRequest } from '@shared/models/common/make-request.type';

type TxtColEdit = FormValue<string>;

export type TextColumn = TypedColumn<'text'> &
  TxtColEdit &
  MakeRequest<string, TextRequest>;
