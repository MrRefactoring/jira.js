export interface DeleteIssue {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** Whether the issue's subtasks are deleted when the issue is deleted. */
  deleteSubtasks?: string;
}
