import { Row } from '@shared/models/row';

export const rows: ReadonlyArray<Row> = [
  {
    rowId: 1,
    explicit: {
      rating: 1,
      owner: { id: '1x', name: 'Ant' },
    },
    attributed: {
      text: {
        '1': { value: { id: 100, value: 'joe', etag: 'etagXXX' } },
        '2': { value: { id: 101, value: 'pass', etag: 'etagXXX' } },
      },
      date: {
        '3': { value: { id: 200, value: new Date(), etag: 'etagXXX' } },
      },
      multiList: {
        '4': {
          value: [
            { id: 200, listItemId: 1, etag: 'etagXXX' },
            { id: 200, listItemId: 2, etag: 'etagXXX' },
          ],
        },
      },
    },
  },
  {
    rowId: 2,
    explicit: {
      rating: 5,
      owner: { id: '2x', name: 'Lex' },
    },
    attributed: {
      text: {
        '1': { value: { id: 110, value: 'joe22', etag: 'etagXXX' } },
        '2': { value: { id: 111, value: 'pass2', etag: 'etagXXX' } },
      },
      date: {
        '3': { value: { id: 210, value: new Date(), etag: 'etagXXX' } },
      },
      multiList: {},
    },
  },
];
