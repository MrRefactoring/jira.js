export interface GetProjectComponentsPaginated {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string | number;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#ordering) the results by a field:
   *
   * - `description` Sorts by the component description.
   * - `issueCount` Sorts by the count of issues associated with the component.
   * - `lead` Sorts by the user key of the component's project lead.
   * - `name` Sorts by component name.
   */
  orderBy?:
    | 'description'
    | '-description'
    | '+description'
    | 'issueCount'
    | '-issueCount'
    | '+issueCount'
    | 'lead'
    | '-lead'
    | '+lead'
    | 'name'
    | '-name'
    | '+name'
    | string;
  /**
   * Filter the results using a literal string. Components with a matching `name` or `description` are returned (case
   * insensitive).
   */
  query?: string;
  /**
   * The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the
   * API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira
   * components. Defaults to `jira`.
   *
   * @default jira
   */
  componentSource?: 'jira' | 'compass' | 'auto' | string;
}
