export type RowDTO = {
  rowId: number | null;
  explicit: { rating: number; author: string };
  attributed: {
    text: { [key: number]: string };
    date: { [key: number]: string };
    multiList: { [key: number]: ReadonlyArray<number> };
  };
};
