import { AttrColumn, CellType } from '@shared/models/attributed';
import { ExplColumn } from '@shared/models/explicit/expl-column';

const typeToCategory: Record<CellType, string> = {
  text: 'TextValues',
  date: 'DateValues',
  multiList: 'MultiListValues',
};

export const resAttrTypeTest = (type: CellType) =>
`${typeToCategory[type]}`;

export const getQuerySelect = (columns: ExplColumn[]) =>
  columns.map((col) => col.name).join(',');

export const getQueryExpand = (columns: AttrColumn[]) => {
  const accR: { [key: string]: number[] } = {};

  const attrSelect = columns.reduce((acc, col) => {
    const name = resAttrTypeTest(col.cellType);
    const accArr = Array.isArray(acc[name]) ? acc[name] : [];
    const typeArr = [...accArr, col.attributeId];

    return {
      ...acc,
      [name]: typeArr,
    };
  }, accR);

  const resolveFilter = (value: number[]) => value.length === 1
  ? `AttributeId eq ${value[0]}`
  : `AttributeId in (${value.join()})`;

  const res = Object.entries(attrSelect).map(
    ([attrType, ids]) =>
      `${attrType}($filter=${resolveFilter(ids)})`,
  );

  return '$expand=' + res.join(',');
};
