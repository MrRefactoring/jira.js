export interface GetProjectVersionsPaginated {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string | number;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `description` Sorts by version description.
   * - `name` Sorts by version name.
   * - `releaseDate` Sorts by release date, starting with the oldest date. Versions with no release date are listed last.
   * - `sequence` Sorts by the order of appearance in the user interface.
   * - `startDate` Sorts by start date, starting with the oldest date. Versions with no start date are listed last.
   */
  orderBy?:
    | 'description'
    | '-description'
    | '+description'
    | 'name'
    | '-name'
    | '+name'
    | 'releaseDate'
    | '-releaseDate'
    | '+releaseDate'
    | 'sequence'
    | '-sequence'
    | '+sequence'
    | 'startDate'
    | '-startDate'
    | '+startDate'
    | string;
  /**
   * Filter the results using a literal string. Versions with matching `name` or `description` are returned (case
   * insensitive).
   */
  query?: string;
  /**
   * A list of status values used to filter the results by version status. This parameter accepts a comma-separated
   * list. The status values are `released`, `unreleased`, and `archived`.
   */
  status?: 'released' | 'unreleased' | 'archived' | string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `issuesstatus` Returns the number of issues in each status category for each version.
   * - `operations` Returns actions that can be performed on the specified version.
   * - `driver` Returns the Atlassian account ID of the version driver.
   * - `approvers` Returns a list containing the approvers for this version.
   */
  expand?:
    | 'issuesstatus'
    | 'operations'
    | 'driver'
    | 'approvers'
    | ('issuesstatus' | 'operations' | 'driver' | 'approvers')[]
    | string
    | string[];
}
