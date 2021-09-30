import { Row } from '@shared/models/row';

export const rows: Row[] = [
  {
    explicit: {
      id: 1,
      owner: { id: '1', name: 'Ant' },
    },
    attributed: {
      text: {
        '1': { value: { id: 100, value: 'joe' } },
        '2': { value: { id: 101, value: 'pass' } },
      },
      date: {
        '3': { value: { id: 200, value: new Date() } },
      },
      multiList: {
        '4': {
          value: [
            { id: 200, listItemId: 1 },
            { id: 200, listItemId: 2 },
          ],
        },
      },
    },
  },
  {
    explicit: {
      id: 2,
      owner: { id: '2', name: 'Lex' },
    },
    attributed: {
      text: {
        '1': { value: { id: 110, value: 'joe22' } },
        '2': { value: { id: 111, value: 'pass2' } },
      },
      date: {
        '3': { value: { id: 210, value: new Date() } },
      },
      multiList: {},
    },
  },
];
