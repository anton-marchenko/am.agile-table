import { RowDS } from '@shared/models/table/common/row';

export const mockRowsDB: ReadonlyArray<RowDS> = [
  {
    rowId: 1,
    explicit: {
      rating: 4,
      author: { id: '1x', name: 'Ant' },
    },
    attributed: {
      text: [
        { id: 100, attributeId: 1, value: 'joe', etag: 'etagXXX' },
        { id: 101, attributeId: 2, value: 'pass', etag: 'etagXXX' },
      ],
      date: [
        {
          id: 200,
          attributeId: 3,
          value: '2021-10-16T21:56:38',
          etag: 'etagXXX',
        },
      ],
      multiList: [
        { id: 200, attributeId: 4, listItemId: 1, etag: 'etagXXX' },
        { id: 200, attributeId: 4, listItemId: 2, etag: 'etagXXX' },
      ],
    },
  },
  {
    rowId: 2,
    explicit: {
      rating: 5,
      author: { id: '2x', name: 'Lex' },
    },
    attributed: {
      text: [
        { id: 100, attributeId: 1, value: 'joe2', etag: 'etagXXX' },
        { id: 101, attributeId: 2, value: 'pass3', etag: 'etagXXX' },
      ],
      date: [
        {
          id: 200,
          attributeId: 3,
          value: '2021-10-10T00:00:00',
          etag: 'etagXXX',
        },
      ],
      multiList: [{ id: 200, attributeId: 4, listItemId: 1, etag: 'etagXXX' }],
    },
  },
  {
    rowId: 3,
    explicit: {
      rating: null,
      author: null,
    },
    attributed: {
      text: [],
      date: [],
      multiList: [],
    },
  },
];
