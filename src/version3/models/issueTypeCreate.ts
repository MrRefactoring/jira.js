export interface IssueTypeCreate {
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name: string;
  /** The description of the issue type. */
  description?: string;
  /**
   * The hierarchy level of the issue type. Use:
   *
   * - `-1` for Subtask.
   * - `0` for Base.
   *
   * @default 0
   */
  hierarchyLevel?: number;
}
