export interface GetAllQuickFilters {
  /** The ID of the board that contains the requested quick filters. */
  boardId: number;
  /** The starting index of the returned quick filters. Base index: 0. See the 'Pagination' section at the top of this page for more details. */
  startAt?: number;
  /** The maximum number of sprints to return per page. See the 'Pagination' section at the top of this page for more details. */
  maxResults?: number;
}
