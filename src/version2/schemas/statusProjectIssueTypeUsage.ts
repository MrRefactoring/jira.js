import { z } from 'zod';

/** The list of issue types. */
export const StatusProjectIssueTypeUsageSchema = z.object({
  /** The issue type ID. */
  id: z.string().optional(),
});

export type StatusProjectIssueTypeUsage = z.infer<typeof StatusProjectIssueTypeUsageSchema>;
