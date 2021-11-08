export type RowDTO = {
  rowId: number | null;
  explicit: { rating: number | null; author: string | null };
  attributed: {
    // FIXME - key is only string
    // FIXME - use text: ReadonlyArray<T> instead
    // Then text[index] will work
    text: { [key: number]: string | null };
    date: { [key: number]: string | null };
    multiList: { [key: number]: ReadonlyArray<number> | null };
  };
};
