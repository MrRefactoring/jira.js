import { z } from 'zod';

export const GetIssuePropertyKeysSchema = z.object({
  /** The key or ID of the issue. */
  issueIdOrKey: z.string(),
});

export type GetIssuePropertyKeys = z.input<typeof GetIssuePropertyKeysSchema>;
