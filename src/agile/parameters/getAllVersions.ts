export interface GetAllVersions {
  /** The ID of the board that contains the requested versions. */
  boardId: number;
  /** The starting index of the returned versions. Base index: 0. See the 'Pagination' section at the top of this page for more details. */
  startAt?: number;
  /** The maximum number of versions to return per page. See the 'Pagination' section at the top of this page for more details. */
  maxResults?: number;
  /** Filters results to versions that are either released or unreleased. Valid values: true, false. */
  released?: string;
}
