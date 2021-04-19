export type Paginated<T> = {
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: T[];
};
