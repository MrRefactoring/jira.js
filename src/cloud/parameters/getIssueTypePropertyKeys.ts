import { z } from 'zod';

export const GetIssueTypePropertyKeysSchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
});

export type GetIssueTypePropertyKeys = z.input<typeof GetIssueTypePropertyKeysSchema>;
