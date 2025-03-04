export type Paginated<T> = {
  /** The maximum number of items that could be returned. */
  maxResults: number;
  /** The index of the first item returned. */
  startAt: number;
  /** The number of items returned. */
  total: number;
  /** Whether this is the last page. */
  isLast: boolean;
  /** The list of items. */
  values: T[];
};
