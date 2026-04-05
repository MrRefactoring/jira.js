import { z } from 'zod';

export const GetIssueSecurityLevelSchema = z.object({
  /** The ID of the issue security level. */
  id: z.string(),
});

export type GetIssueSecurityLevel = z.input<typeof GetIssueSecurityLevelSchema>;
