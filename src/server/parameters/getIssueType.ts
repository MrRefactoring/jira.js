import { z } from 'zod';

export const GetIssueTypeSchema = z.object({
  /** The issue type id. */
  id: z.string(),
});

export type GetIssueType = z.input<typeof GetIssueTypeSchema>;
