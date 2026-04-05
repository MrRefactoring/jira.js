import { z } from 'zod';

export const GetIssueTypeSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
});

export type GetIssueType = z.input<typeof GetIssueTypeSchema>;
