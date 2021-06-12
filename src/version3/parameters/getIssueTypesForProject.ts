export interface GetIssueTypesForProject {
  /** The ID of the project. */
  projectId: number;
  /**
   * The level of the issue type to filter by. Use:
   *
   * `-1` for Subtask. `0` for Base. `1` for Epic.
   */
  level?: number;
}
