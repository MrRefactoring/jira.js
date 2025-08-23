import { z } from 'zod';

export const DeleteIssueParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** Whether the issue's subtasks are deleted when the issue is deleted. */
  deleteSubtasks: z.enum(['true', 'false']).optional(),
});

export type DeleteIssueParameters = z.infer<typeof DeleteIssueParametersSchema>;
