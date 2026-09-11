import { z } from 'zod';

export const GetIssuePropertyKeysSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetIssuePropertyKeys = z.input<typeof GetIssuePropertyKeysSchema>;
