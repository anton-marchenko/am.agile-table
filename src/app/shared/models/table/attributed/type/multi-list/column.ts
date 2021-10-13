import { TypedColumn } from '@shared/models/table/attributed';
import { MultiListRequest } from '@shared/models/table/attributed/type/multi-list/http';
import { ColumnCfg } from '@shared/models/table/common/column';
import { ColumnDictionary } from '@shared/models/table/common/column-dictionary';
import { FormValue } from '@shared/models/table/common/form-value.type';
import { MakeRequest } from '@shared/models/table/common/make-request.type';

type MultiColEdit = FormValue<ReadonlyArray<number>>;

// ID of Dictionary in DB
type List = { listId: number };

export type MultiListColumn = TypedColumn<'multiList'> &
  MultiColEdit &
  MakeRequest<ReadonlyArray<number>, MultiListRequest> &
  ColumnDictionary<number> &
  List;

export type NewMultiListColumnDS = ColumnCfg &
  Pick<MultiListColumn, 'cellType' | 'listId' | 'kind'>;

export type MultiListColumnDS = NewMultiListColumnDS &
  Pick<MultiListColumn, 'attributeId'>;
