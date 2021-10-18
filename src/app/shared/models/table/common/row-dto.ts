export type RowDTO = {
  rowId: number | null;
  explicit: { rating: number | null; author: string | null };
  attributed: {
    text: { [key: number]: string | null };
    date: { [key: number]: string | null };
    multiList: { [key: number]: ReadonlyArray<number> | null };
  };
};
