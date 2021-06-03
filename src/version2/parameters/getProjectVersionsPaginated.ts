export interface GetProjectVersionsPaginated {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * [Order](#ordering) the results by a field:
   *
   * `description` Sorts by version description. `name` Sorts by version name. `releaseDate` Sorts by release date,
   * starting with the oldest date. Versions with no release date are listed last. `sequence` Sorts by the order of
   * appearance in the user interface. `startDate` Sorts by start date, starting with the oldest date. Versions with no
   * start date are listed last.
   */
  orderBy?: string;
  /** Filter the results using a literal string. Versions with matching `name` or `description` are returned (case insensitive). */
  query?: string;
  /**
   * A list of status values used to filter the results by version status. This parameter accepts a comma-separated
   * list. The status values are `released`, `unreleased`, and `archived`.
   */
  status?: string;
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * `issuesstatus` Returns the number of issues in each status category for each version. `operations` Returns actions
   * that can be performed on the specified version.
   */
  expand?: string;
}
