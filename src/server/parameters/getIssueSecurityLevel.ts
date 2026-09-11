import { z } from 'zod';

export const GetIssueSecurityLevelSchema = z.object({
  /** An issue security level id */
  id: z.string(),
});

export type GetIssueSecurityLevel = z.input<typeof GetIssueSecurityLevelSchema>;
