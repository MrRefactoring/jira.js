/** Project and issue type context for workflow queries made using issue types. */
export interface ProjectIssueTypeQueryContext {
  /** The set of issue type IDs. */
  issueTypes?: string[];
  /** The ID of the project. */
  project?: string;
}
