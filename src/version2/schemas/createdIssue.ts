import { z } from 'zod';

/** Details about a created issue or subtask. */
export const CreatedIssueSchema = z.object({
  /** The ID of the created issue or subtask. */
  id: z.string().optional(),
  /** The key of the created issue or subtask. */
  key: z.string().optional(),
  /** The URL of the created issue or subtask. */
  self: z.string().optional(),
  /** The response code and messages related to any requested transition. */
  transition: z.unknown().optional(),
  /** The response code and messages related to any requested watchers. */
  watchers: z.unknown().optional(),
});

export type CreatedIssue = z.infer<typeof CreatedIssueSchema>;
