import { TypedColumn } from '@shared/models/table/attributed';
import { TextRequest } from '@shared/models/table/attributed/type/text/http';
import { ColumnCfg } from '@shared/models/table/common/column';
import { FormValue } from '@shared/models/table/common/form-value.type';
import { MakeRequest } from '@shared/models/table/common/make-request.type';

type TxtColEdit = FormValue<string>;

export type TextColumn = TypedColumn<'text'> &
  TxtColEdit &
  MakeRequest<string, TextRequest>;

export type NewTextColumnDS = ColumnCfg & Pick<TextColumn, 'cellType' | 'kind'>;

export type TextColumnDS = NewTextColumnDS & Pick<TextColumn, 'attributeId'>;