/** @deprecated Use {@link IssueTypeCreate} instead. */
export type IssueTypeCreateBean = IssueTypeCreate;

export interface IssueTypeCreate {
  /** The description of the issue type. */
  description?: string;
  /**
   * The hierarchy level of the issue type. Use:
   *
   * `-1` for Subtask. `0` for Base.
   *
   * Defaults to `0`.
   */
  hierarchyLevel?: number;
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name: string;
  /**
   * @deprecated Use `hierarchyLevel` instead. See the [deprecation
   *   notice](https://community.developer.atlassian.com/t/deprecation-of-the-epic-link-parent-link-and-other-related-fields-in-rest-apis-and-webhooks/54048)
   *   for details.
   *
   *       Whether the issue type is `subtype` or `standard`. Defaults to `standard`.
   */
  type?: string;
}
