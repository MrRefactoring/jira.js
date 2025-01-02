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
}
