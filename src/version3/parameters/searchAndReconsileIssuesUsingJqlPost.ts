export interface SearchAndReconsileIssuesUsingJqlPost {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information about issues in the response. Note that, unlike the majority of instances where `expand` is specified,
   * `expand` is defined as a list of values. The expand options are:
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
   */
  expand?:
    | 'renderedFields'
    | 'names'
    | 'schema'
    | 'transitions'
    | 'operations'
    | 'editmeta'
    | 'changelog'
    | 'versionedRepresentations'
    | string
    | (
    | 'renderedFields'
    | 'names'
    | 'schema'
    | 'transitions'
    | 'operations'
    | 'editmeta'
    | 'changelog'
    | 'versionedRepresentations'
    | string
    )[];
  /**
   * A list of fields to return for each issue. Use it to retrieve a subset of fields. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * - `*all` Returns all fields.
   * - `*navigable` Returns navigable fields.
   * - `id` Returns only issue IDs.
   * - Any issue field, prefixed with a dash to exclude.
   *
   *   The default is `id`.
   *
   *   Examples:
   * - `summary,comment` Returns the summary and comments fields only.
   * - `*all,-comment` Returns all fields except comments.
   *
   *   Multiple `fields` parameters can be included in a request.
   *
   *   Note: By default, this resource returns IDs only. This differs from [GET
   *   issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.
   */
  fields?:
    | '*all'
    | '*navigable'
    | 'id'
    | `-${string}`
    | string
    | ('*all' | '*navigable' | 'id' | `-${string}` | string)[];
  /** Reference fields by their key (rather than ID). The default is `false`. */
  fieldsByKeys?: boolean;
  /**
   * A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this field requires a
   * bounded query. A bounded query is a query with a search restriction.
   *
   * Example of an unbounded query: `order by key desc`. Example of a bounded query: `assignee = currentUser() order by
   * key`.
   */
  jql?: string;
  /**
   * The maximum number of items to return. Depending on search criteria, real number of items returned may be smaller.
   * It returns max 5000 issues
   */
  maxResults?: number;
  /**
   * The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the
   * `nextPageToken` to fetch the next page of issues.
   */
  nextPageToken?: string;
  /** A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list. */
  properties?: string[];
  /** Strong consistency issue ids to be reconciled with search results. Accepts max 50 ids. All issues must exist. */
  reconcileIssues?: number[];
}
