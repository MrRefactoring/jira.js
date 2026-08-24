import { z } from 'zod';

export const DeleteIssueSchema = z.object({
  /**
   * A String of true or false indicating that any subtasks should also be deleted. If the issue has no subtasks this
   * parameter is ignored. If the issue has subtasks and this parameter is missing or false, then the issue will not be
   * deleted and an error will be returned.
   */
  deleteSubtasks: z.string().optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type DeleteIssue = z.input<typeof DeleteIssueSchema>;
