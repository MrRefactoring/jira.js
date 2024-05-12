export interface GetBoardByFilterId {
  isLast: boolean;
  maxResults: number;
  startAt: number;
  total: number;
  values: {
    id?: number;
    name?: string;
    self?: string;
  }[];
}
