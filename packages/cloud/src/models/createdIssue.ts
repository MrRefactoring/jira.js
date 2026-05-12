import { z } from 'zod';
import { NestedResponseSchema } from '#/models/nestedResponse';

/** Details about a created issue or subtask. */
export const CreatedIssueSchema = z.object({
  /** The ID of the created issue or subtask. */
  id: z.string(),
  /** The key of the created issue or subtask. */
  key: z.string(),
  /** The URL of the created issue or subtask. */
  self: z.string(),
  transition: NestedResponseSchema.optional(),
  watchers: NestedResponseSchema.optional(),
});

export type CreatedIssue = z.infer<typeof CreatedIssueSchema>;
