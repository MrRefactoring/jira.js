export interface GetAllQuickFilters {
  isLast: boolean;
  maxResults: number;
  startAt: number;
  total: number;
  values: {
    boardId?: number;
    description?: string;
    id?: number;
    jql?: string;
    name?: string;
    position?: number;
  }[];
}
