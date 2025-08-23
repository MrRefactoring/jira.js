import { z } from 'zod';
import { StatusDetailsSchema } from './statusDetails';

/** Status details for an issue type. */
export const IssueTypeWithStatusSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
  /** The name of the issue type. */
  name: z.string(),
  /** The URL of the issue type's status details. */
  self: z.string(),
  /** List of status details for the issue type. */
  statuses: z.array(StatusDetailsSchema),
  /** Whether this issue type represents subtasks. */
  subtask: z.boolean(),
});

export type IssueTypeWithStatus = z.infer<typeof IssueTypeWithStatusSchema>;
