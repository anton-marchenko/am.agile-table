import { TypedColumn } from '@shared/models/attributed';
import { MultiListRequest } from '@shared/models/attributed/multi-list/http';
import { ColumnDictionary } from '@shared/models/column-dictionary';
import { FormValue } from '@shared/models/common/form-value.type';
import { MakeRequest } from '@shared/models/common/make-request.type';

type MultiColEdit = FormValue<number[]>;

export type MultiListColumn = TypedColumn<'multiList'> &
  MultiColEdit &
  MakeRequest<number[], MultiListRequest> &
  ColumnDictionary<number>;
