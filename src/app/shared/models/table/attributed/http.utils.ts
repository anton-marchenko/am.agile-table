import { AttrColumn } from '@shared/models/table';
import { resolveHttpTypeValues } from '@shared/models/table/attributed/type-http.utils';

export const getQueryExpand = (columns: ReadonlyArray<AttrColumn>) => {
  const accR: { [key: string]: ReadonlyArray<number> } = {};

  const attrSelect = columns.reduce((acc, col) => {
    const name = resolveHttpTypeValues(col.cellType);
    const accArr = Array.isArray(acc[name]) ? acc[name] : [];
    const typeArr = [...accArr, col.attributeId];

    return {
      ...acc,
      [name]: typeArr,
    };
  }, accR);

  const resolveFilter = (value: ReadonlyArray<number>) =>
    value.length === 1
      ? `AttributeId eq ${value[0]}`
      : `AttributeId in (${value.join()})`;

  const res = Object.entries(attrSelect).map(
    ([attrType, ids]) => `${attrType}($filter=${resolveFilter(ids)})`,
  );

  return '$expand=' + res.join(',');
};
