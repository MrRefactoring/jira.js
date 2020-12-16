export interface GetProjects {
  /** The ID of the board that contains returned projects. */
  boardId: number;
  /** The starting index of the returned projects. Base index: 0. See the 'Pagination' section at the top of this page for more details. */
  startAt?: number;
  /** The maximum number of projects to return per page. See the 'Pagination' section at the top of this page for more details. */
  maxResults?: number;
}
