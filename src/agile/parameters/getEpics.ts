export interface GetEpics {
  /** The ID of the board that contains the requested epics. */
  boardId: number;
  /** The starting index of the returned epics. Base index: 0. See the 'Pagination' section at the top of this page for more details. */
  startAt?: number;
  /** The maximum number of epics to return per page. See the 'Pagination' section at the top of this page for more details. */
  maxResults?: number;
  /** Filters results to epics that are either done or not done. Valid values: true, false. */
  done?: string;
}
