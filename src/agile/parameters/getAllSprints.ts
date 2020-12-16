export interface GetAllSprints {
  /** The ID of the board that contains the requested sprints. */
  boardId: number;
  /** The starting index of the returned sprints. Base index: 0. See the 'Pagination' section at the top of this page for more details. */
  startAt?: number;
  /** The maximum number of sprints to return per page. See the 'Pagination' section at the top of this page for more details. */
  maxResults?: number;
  /** Filters results to sprints in specified states. Valid values: future, active, closed. You can define multiple states separated by commas, e.g. state=active,closed */
  state?: string;
}
