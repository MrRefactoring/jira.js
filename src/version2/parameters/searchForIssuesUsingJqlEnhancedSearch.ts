export interface SearchForIssuesUsingJqlEnhancedSearch {
  /**
   * The [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a
   * bounded query. A bounded query is a query with a search restriction.
   *
   * - Example of an unbounded query: `order by key desc`.
   * - Example of a bounded query: `assignee = currentUser() order by key`.
   *
   * Additionally, `orderBy` clause can contain a maximum of 7 fields.
   */
  jql: string;
  /**
   * The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the
   * `nextPageToken` to fetch the next page of issues.
   */
  nextPageToken?: string;
  /**
   * The maximum number of items to return per page. To manage page size, API may return fewer items per page where a
   * large number of fields are requested. The greatest number of items returned per page is achieved when requesting
   * `id` or `key` only.
   *
   * It returns max 5000 issues.
   *
   * Default: `50`
   *
   * Format: `int32`
   */
  maxResults?: number;
  /**
   * A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * - `*all` Returns all fields.
   * - `*navigable` Returns navigable fields.
   * - `id` Returns only issue IDs.
   * - Any issue field, prefixed with a minus to exclude.
   *
   * The default is `id`.
   *
   * Examples:
   *
   * - `summary,comment` Returns only the summary and comments fields.
   * - `-description` Returns all navigable (default) fields except description.
   * - `*all,-comment` Returns all fields except comments.
   *
   * Multiple `fields` parameters can be included in a request.
   *
   * Note: By default, this resource returns IDs only. This differs from [GET
   * issue](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-issue-issueidorkey-get)
   * where the default is all fields.
   */
  fields?: string[];
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about issues in the response. Note that, unlike the majority of instances where `expand` is specified,
   * `expand` is defined as a comma-delimited string of values. The expand options are:
   *
   * - `renderedFields` Returns field values rendered in HTML format.
   * - `names` Returns the display name of each field.
   * - `schema` Returns the schema describing a field type.
   * - `transitions` Returns all possible transitions for the issue.
   * - `operations` Returns all possible operations for the issue.
   * - `editmeta` Returns information about how each field can be edited.
   * - `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.
   * - `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each
   *   version of a field's value, with the highest numbered item representing the most recent version.
   *
   * Examples: `names,changelog` Returns the display name of each field as well as a list of recent updates to an issue.
   */
  expand?: string;
  /** A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list. */
  properties?: string[];
  /** Reference fields by their key (rather than ID). The default is `false`. */
  fieldsByKeys?: boolean;
  /** Fail this request early if we can't retrieve all field data. The default is `false`. */
  failFast?: boolean;
  /** Strong consistency issue ids to be reconciled with search results. Accepts max 50 ids. All issues must exist. */
  reconcileIssues?: number[];
}
