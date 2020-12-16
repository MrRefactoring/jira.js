export interface GetAllBoards {
  /** The starting index of the returned boards. Base index: 0. See the 'Pagination' section at the top of this page for more details. */
  startAt?: number;
  /** The maximum number of boards to return per page. See the 'Pagination' section at the top of this page for more details. */
  maxResults?: number;
  /** Filters results to boards of the specified types. Valid values: scrum, kanban, simple. */
  type?: string;
  /** Filters results to boards that match or partially match the specified name. */
  name?: string;
  /** Filters results to boards that are relevant to a project. Relevance means that the jql filter defined in board contains a reference to a project. */
  projectKeyOrId?: string;
  accountIdLocation?: string;
  projectLocation?: string;
  /** Appends private boards to the end of the list. The name and type fields are excluded for security reasons. */
  includePrivate?: boolean;
  /** If set to true, negate filters used for querying by location. By default false. */
  negateLocationFiltering?: boolean;
  /** Ordering of the results by a given field. If not provided, values will not be sorted. Valid values: name. */
  orderBy?: string;
  /** List of fields to expand for each board. Valid values: admins, permissions. */
  expand?: string;
  /** Filters results to boards that are relevant to a filter. Not supported for next-gen boards. */
  filterId?: number;
}
