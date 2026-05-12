import { z } from 'zod';

/** Describes the error that occurred when retrieving data for a particular issue. */
export const IssueErrorSchema = z.object({
  /** The error that occurred when fetching this issue. */
  errorMessage: z.string().optional(),
  /** The ID of the issue. */
  id: z.string().optional(),
});

export type IssueError = z.infer<typeof IssueErrorSchema>;
