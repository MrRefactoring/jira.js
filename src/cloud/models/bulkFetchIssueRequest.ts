import { z } from 'zod';
import { apiObject } from '#/core';

export const BulkFetchIssueRequestSchema = apiObject({
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information about issues in the response. Note that, unlike the majority of instances where `expand` is specified,
   * `expand` is defined as a list of values. The expand options are:
   *
   * - `renderedFields` Returns field values rendered in HTML format.
   * - `names` Returns the display name of each field.
   * - `schema` Returns the schema describing a field type.
   * - `transitions` Returns all possible transitions for the issue.
   * - `operations` Returns all possible operations for the issue.
   * - `editmeta` Returns information about how each field can be edited.
   * - `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent. This
   *   returns a maximum of 40 changelogs. If you require more, please refer to [Bulk fetch
   *   changelogs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-changelog/#api-rest-api-3-changelog-bulkfetch-post).
   * - `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each
   *   version of a field's value, with the highest numbered item representing the most recent version.
   *
   * To request up to 1000 issues in a single call, do not include `changelog`, `editmeta`, `operations`,
   * `renderedFields`, `transitions`, or `versionedRepresentations` in `expand`. Requests that include any of these can
   * include at most 100 issues; larger requests are rejected with a 400 error.
   */
  expand: z.array(z.string()).optional(),
  /**
   * A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * - `*all` Returns all fields.
   * - `*navigable` Returns navigable fields.
   * - Any issue field, prefixed with a minus to exclude.
   *
   * The default is `*navigable`.
   *
   * Examples:
   *
   * - `summary,comment` Returns the summary and comments fields only.
   * - `-description` Returns all navigable (default) fields except description.
   * - `*all,-comment` Returns all fields except comments.
   *
   * Multiple `fields` parameters can be included in a request.
   *
   * Note: All navigable fields are returned by default. This differs from [GET
   * issue](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueIdOrKey-get)
   * where the default is all fields.
   *
   * To request up to 1000 issues in a single call, explicitly list the fields you need: at least one field must be a
   * positive include (a request containing only exclusions is not eligible), the `*all` and `*navigable` wildcards and
   * the default navigable field set are not eligible for the higher limit, no more than 100 fields may be listed, and
   * none of the included fields returns multiple values (for example `comment`, `worklog`, or `attachment`). Requests
   * that do not meet these conditions can include at most 100 issues; larger requests are rejected with a 400 error.
   */
  fields: z.array(z.string()).optional(),
  /** Reference fields by their key (rather than ID). The default is `false`. */
  fieldsByKeys: z.boolean().optional(),
  /**
   * An array of issue IDs or issue keys to fetch. You can mix issue IDs and keys in the same query. You can request up
   * to 100 issues per call. Requests can include up to 1000 issues per call when they meet all of the conditions
   * described for the `fields` and `expand` parameters. Requests that exceed the applicable limit are rejected with a
   * 400 error.
   */
  issueIdsOrKeys: z.array(z.string()),
  /**
   * A list of issue property keys of issue properties to be included in the results. A maximum of 5 issue property keys
   * can be specified.
   */
  properties: z.array(z.string()).optional(),
});

export type BulkFetchIssueRequest = z.infer<typeof BulkFetchIssueRequestSchema>;
