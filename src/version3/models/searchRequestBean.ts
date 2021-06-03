export interface SearchRequestBean {
  /** A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. */
  jql?: string;
  /** The index of the first item to return in the page of results (page offset). The base index is `0`. */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * `*all` Returns all fields. `*navigable` Returns navigable fields. Any issue field, prefixed with a minus to exclude.
   *
   * The default is `*navigable`.
   *
   * Examples:
   *
   * `summary,comment` Returns the summary and comments fields only. `-description` Returns all navigable (default)
   * fields except description. `*all,-comment` Returns all fields except comments.
   *
   * Multiple `fields` parameters can be included in a request.
   *
   * Note: All navigable fields are returned by default. This differs from [GET
   * issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.
   */
  fields?: string[];
  /**
   * Determines how to validate the JQL query and treat the validation results. Supported values:
   *
   * `strict` Returns a 400 response code if any errors are found, along with a list of all errors (and warnings).
   * `warn` Returns all errors as warnings. `none` No validation is performed. `true` *Deprecated* A legacy synonym for
   * `strict`. `false` *Deprecated* A legacy synonym for `warn`.
   *
   * The default is `strict`.
   *
   * Note: If the JQL is not correctly formed a 400 response code is returned, regardless of the `validateQuery` value.
   */
  validateQuery?: string;
  /**
   * Use [expand](em>#expansion) to include additional information about issues in the response. Note that, unlike the
   * majority of instances where `expand` is specified, `expand` is defined as a list of values. The expand options are:
   *
   * `renderedFields` Returns field values rendered in HTML format. `names` Returns the display name of each field.
   * `schema` Returns the schema describing a field type. `transitions` Returns all possible transitions for the issue.
   * `operations` Returns all possible operations for the issue. `editmeta` Returns information about how each field can
   * be edited. `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.
   * `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each
   * version of a field's value, with the highest numbered item representing the most recent version.
   */
  expand?: string[];
  /** A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list. */
  properties?: string[];
  /** Reference fields by their key (rather than ID). The default is `false`. */
  fieldsByKeys?: boolean;
}
