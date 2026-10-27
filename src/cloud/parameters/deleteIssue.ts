import { z } from 'zod';

export const DeleteIssueSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** Whether the issue's subtasks are deleted when the issue is deleted. */
  deleteSubtasks: z.boolean().optional(),
});

export type DeleteIssue = z.input<typeof DeleteIssueSchema>;
